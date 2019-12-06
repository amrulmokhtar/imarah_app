var validateCity = function(docWithCity){
    //Check if the city field is an ID or a name
    if (!docWithCity.city_name ||
        0 == Cities.findOne({_id: docWithCity.city}).length) {
        //Not an ID, so see if the city is in the database
        var city_by_name = Cities.findOne({name: docWithCity.city});
        if (!city_by_name) {
            //Not in the database, needs a new tracking field
            //TODO: make some kind of flag to ensure that city gets details added

            city_id = Cities.insert({name: docWithCity.city,
                geometry: docWithCity.location.geometry});
            docWithCity.city_name = docWithCity.city;
            docWithCity.city = city_id;
        } else {
            //City already exists in database
            docWithCity.city_name = docWithCity.city;
            docWithCity.city = city_by_name._id;
        }
    }
    return docWithCity;
};

Meteor.methods(
{
    sendSMS: function(message,numbers){
        if(this.userId) {
            var mid = Meteor.users.findOne({_id: this.userId}).profile.managed_mosque_id
            if (mid) {
                var mosque = Mosques.findOne({_id: mid});
                if (mosque.sms_credits > numbers.length) {
                    console.log('sending SMS');
                    Mosques.update({_id: mosque._id}, {$inc: {sms_credits: -numbers.length}});
                    HTTP.call('POST', 'https://api.clickatell.com/rest/message', {
                        headers: {
                            Authorization: 'bearer Zy_.kN02FaKUK6YDCbk5dqAAcv3tt0q_MoikKuvnUKn1RAg9M.3CqBR_4udEwDJpYo988GQidx1GfrU',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'X-Version': '1'
                        },
                        data: {'text': message, 'to': numbers}
                    });
                } else {
                    console.log('insufficient credits');
                    return ({error: 'Insufficient credits'});
                }
            }
        }
    },
    validateCity: validateCity,
    denormalizeMosque: function(mosqueDoc) {

        //Have to track cities by IDs because names are not unique
        if (mosqueDoc.city) {
            validateCity(mosqueDoc)
        }

        //manual Aggregation implementation helper functions
        function makeMonth(year, trans){
            month =  year[''+trans.date.getMonth()] || {};
            return month;
        }

        //calculate total attendees per month
        //Cast to mongo object representation if id is Meteor's object representation
        if(mosqueDoc._id._str){
            var mosqueId = new MongoInternals.NpmModule.ObjectID(mosqueDoc._id._str);
        }else{
            var mosqueId = mosqueDoc._id;
        }

        mosqueDoc.event_stats = Events.aggregate([
            {
                $match:{"mosque_id": mosqueId}
            },
            {
                $group:
                {
                    _id: {month: {$month: '$date'},
                        year: {$year: '$date'}},
                    avg_friday_rating: {$avg: '$friday_rating'},
                    total_events: {$sum: 1},
                    total_rsvp: {$sum :'$totalRSVP'},
                    avg_rsvp: {$avg: '$totalRSVP'},
                    total_check_in: {$sum: '$totalCheckins'},
                    avg_check_in: {$avg: '$totalCheckins'},
                    avg_rating: {$avg: '$rating'}
                }
            }
        ]);

        //manual attendance aggregation

        var mosque_events = Events.find({mosque_id:mosqueDoc._id},{
            name:1, date:1, time:1, imam_names:1, imams: 1,
            totalRSVP: 1, totalCheckins: 1, rating: 1, type: 1}).fetch();
        //TODO: figure out if this is worthwhile
        //mosqueDoc.events = mosque_events;
        var attendance = {};

        function calcAttendance(month, trans, type){
            m_trans = month[type] || 0;
            m_trans += trans[type];
            return m_trans;
        };

        mosque_events.forEach(function(trans){
            attendance[''+trans.date.getYear()] = year = attendance[''+trans.date.getYear()] || {};
            month = year[''+trans.date.getMonth()] = makeMonth(year,trans);
            month['totalRSVP'] = calcAttendance(month,trans,'totalRSVP');
            month['totalCheckins'] = calcAttendance(month,trans,'totalCheckins');
        });

        //manual aggregate function, that groups by month
        var finances = {};
        var trans_for_mosque = MosqueFinances.find({mosque_id:mosqueDoc._id},{date:1,type:1,amount:1}).fetch();


        function makeTrans(month, trans){
            m_trans = month[trans.type] || 0;
            m_trans += trans.amount;
            return m_trans;
        };

        trans_for_mosque.forEach(function(trans){
            finances[''+trans.date.getYear()] = year = finances[''+trans.date.getYear()] || {};
            month = year[''+trans.date.getMonth()] = makeMonth(year,trans);
            m_trans = month[trans.type] = makeTrans(month,trans);
        });

        //TODO: can optimize to linear time by moving this function into the previous loop
        for(year in finances){
            for(month in finances[year]){
                var trans_set = finances[year][month];
                var exp =  trans_set['expense'] || 0;
                var income = trans_set['income'] || 0;
                trans_set['net'] = income - exp;
            }
        }

        mosqueDoc.finances = finances;

        //calculate monthly finances
        //FIXME: Work out the Meteor Mongo ObjectID $match doc bug, as it is potentially more robust and performant
        //TODO: make sure all amount values inserted are a number type
        /*
        var match = {
            $match:{"mosque": mosqueDoc._id.toString(), type: 'income'}
        };

        mosqueDoc.finances = MosqueFinances.aggregate([
            match,
            {
                $group:
                {
                    _id: {month: {$month: '$date'},
                          year: {$year: '$date'}},
                    total: {$sum: '$amount'}
                }
            }
        ]);

        */

        return mosqueDoc;
    },
    reIntegrifyPosts: function(){
        var toIntegrify = Posts.find().fetch();
        toIntegrify.forEach(function(post){

           if(post.type == 'event'){
               if(!Events.find({_id:post.link}).count){
                   console.log("didn't find event"+post.link);
                   Posts.remove({_id:post._id});
               }
           }
        });
    },
    denormalizeEvent: function(eventDoc) {
        //Because we can have multiple imams conducting an event
        if (typeof(eventDoc.imams) != typeof([])) {
            eventDoc.imams = [parseID(eventDoc.imams)];
        }

        //TODO: check that this returns in correct order.
        if (!eventDoc.imam_names) {
            eventDoc.imam_names = Imams.find({_id: {$in: eventDoc.imams}}).map(
            function(item) {return item.title + ' ' + item.first_name});
            if(eventDoc.imam_names.length == 0){
                eventDoc.imam_names = ['None'];
            }
        }

        if (!eventDoc.mosque_name) {
            eventDoc.mosque_name =
                Mosques.findOne({_id: parseID(eventDoc.mosque_id)}).name;
        }

        if (!eventDoc.geometry) {
            eventDoc.geometry =
                Mosques.findOne({_id: parseID(eventDoc.mosque_id)}).location.geometry;
        }

        if (!eventDoc.city_name) {
            Meteor.call('validateCity', eventDoc);
        }

        //TODO: decide if we have to calculate this only if it isn't present, or keep it consistent no matter what
        //if (!eventDoc.totalCheckins) {
            eventDoc.totalCheckins = Check_In.find({event_id: eventDoc._id}).fetch().length;
        //}

        //TODO: decide if we have to calculate this only if it isn't present, or keep it consistent no matter what
        //if (!eventDoc.totalRSVP) {
            eventDoc.totalRSVP = RSVP.find({eventId: eventDoc._id}).fetch().length;
        //}

        //If we decide to use a normalized Feedback system
        feedback = Feedback.find({event_id :eventDoc._id}).fetch();
        if(feedback.length > 0){
            feedback_ratings = _.pluck(feedback,'rating');
            eventDoc.rating = feedback_ratings.reduce(function(p,c,i,a){return (p+c)/2});
            if(eventDoc.type == 'Friday Sermon'){
                eventDoc.rating_friday = eventDoc.rating;
            }
        }else{
            //FIXME: figure out if this is going to cause issues
            //eventDoc.rating = 0
        }



        return eventDoc;
    },
    denormalizeImam: function(imamDoc) {
        imamDoc.events = Events.find({imams:imamDoc._id},{
            name:1, date:1, time:1, imam_names:1, imams: 1,
            totalRSVP: 1, totalCheckins: 1, rating: 1, type: 1});

        return imamDoc;
    },
    removeDenormPost: function(docQuery,matchQuery){

        var mdoc = Mosques.findOne(docQuery);
        Mosques.update(docQuery,{$set:{ posts: _.reject(mdoc.posts,function(doc){
            return(doc.post_id==matchQuery.posts.post_id)
        })}});

        //Should work, by doesn't
        //Mosques.update(docQuery,{$pull:matchQuery});
    },
    normFeedbackCalc: function(mosque_id,match){
        if(parseID(mosque_id)._str){
            mosque_id = new MongoInternals.NpmModule.ObjectID(mosque_id._str);
        }
        match = match || {};
        return Feedback.aggregate([
            {$match:_.extend(match,{mosque_id:mosque_id})},
            {$group:
            {
                _id: {
                    month: {$month: '$date'},
                    year: {$year: '$date'},
                    day: {$dayOfMonth: '$date'}
                },
                rating: {$avg: '$rating'},
                date: {$first:'$date'}
            }
            },
            {
                $sort: {date: -1}
            }
        ])
    },
    normEventCalc: function(mosque_ids,match){
        var mosque_ids = mosque_ids.map(function(mosqueId){
            if(mosqueId && parseID(mosqueId)._str){
                mosqueId = new MongoInternals.NpmModule.ObjectID(mosqueId._str);
            }
            return mosqueId;
        });

        return  Events.aggregate([
            {$match:_.extend(match,{mosque_id:{$in:mosque_ids}})},
            {$group:
            {
                _id: {
                    month: {$month: '$date'},
                    year: {$year: '$date'},
                    day: {$dayOfMonth: '$date'}
                },
                total: {$sum: 1},
                date: {$first:'$date'}
            }
            },
            {
                $sort: {date: -1}
            }
        ])
    },
    normFinanceCalc: function(mosqueId, match){

        //Cast to mongo object representation if id is Meteor's object representation
        if(parseID(mosqueId)._str){
            mosqueId = new MongoInternals.NpmModule.ObjectID(mosqueId._str);
        }

        return MosqueFinances.aggregate([
            {$match: {mosque_id:mosqueId}},
            {$group:
                {
                    _id: {
                        month: {$month: '$date'},
                        year: {$year: '$date'},
                        day: {$dayOfMonth: '$date'}
                    },
                    total: {$sum: '$amount'},
                    date: {$first:'$date'}
                }},
            {
                $sort: {date: -1}
            }
        ]);
    }
});

