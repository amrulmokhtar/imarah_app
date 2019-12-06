/*****************************************************************************/
/* Newsfeed: Event Handlers and Helpersss .js*/
/*****************************************************************************/

Template.newsfeed.helpers({
    size1: function () {
        var width = window.innerWidth;
        return [width,27.5];
    },
    size2: function () {
        var width = window.innerWidth;
        return [width,320];
    },
    size4: function () {
      var width = window.innerWidth,
      height = window.innerHeight;
      return [width, height];
  }
});

Template.contentContainer.events({

});

getFavMosques = function(){
    return EJSON.parse(localStorage.getItem('my_mosques'));
}

getFavImams = function(){
    return EJSON.parse(localStorage.getItem('my_imams'));
}

postDescMap = {
    event:{
        en: " is hosting",
        my: " hostar"
    },
    post:{
        en: " posted",
        my: " postar"
    }
}

Session.setDefault('lang','en');

Template.placeholdercards.helpers({
    contents: function(){

        var contents = [];
     //   console.log(getFavMosques());
        contents_from_mosques = Posts.find({related_to:{$in:getFavMosques()}},{sort:{posted_date:-1, relevant_date:-1}});
        contents = contents.concat(contents_from_mosques.map(function(post){
            post.description = post.author_name || post.mosque_name;
            post.route = 'event';
            post.description += postDescMap[post.type||'post'][Session.get('lang')];
            if(post.type == 'event'){
                post.content1 = moment(post.relevant_date).fromNow() + ' @ ' + moment(post.time).format('h:m A');
                post.content2 = post.imam_names[0];
                post.imgID = 'icon_events';
                post.action = 'RSVP';
            }else{
                post.imgID = 'icon_mosque';
                post.description += ' @ ' + moment(post.posted_date).fromNow();
            }
            return post;
        }));

        /*
        TODO: have to figure out how to implement this sothat we can modify it with the different content
        contents_from_imams = Posts.find({_id:{$in:getFavImams()}});
        contents_from_imams.map(function(post){

        });

        */

        /*
        Manually collect news items from each relevant collection
        Might fall back to this, but currently just using one collection that aggregates all news
        mosques = Mosques.find();
        imams = Imams.find();
        checkins = Check_In.find();
        //FIXME Most probably not the most efficient code, doing this functional style
        //Should one loop to loop over mosques, and then modify their contents inside that loop,
        //instead of relying on _'s hidden loops for formatting

        function injectDetails(item){
            item.posts.map(function(post){
                post.poster = item.name;
                post.poster_id = item._id;
            })
        }
        var events_from_mosque = _.chain.map(Mosques,function(mosque){}).pluck('events').flatten().map(function(m_event){
            m_event.type = 'event';
            m_event.header = m_event.mosque_name + 'is holding an event';
            return m_event;
        });

        var posts_from_mosque = _.chain.pluck(Mosques,'posts').flatten();
        var events_from_imam = _.chain.pluck(Imams,'events').flatten();
        var posts_from_imam =  _.chain.pluck(Imams,'posts').flatten();
        contents.concat(events_from_mosque);
        contents.concat(posts_from_mosque);
        contents.concat(events_from_imam);
        contents.concat(posts_from_imam);

        */
       // console.log(contents);
        return contents;
    }
});

Template.newsfeedCardsContainer.helpers({
    nearestMosque: function(location){
        Meteor.subscribe('near_mosques', location, 5000);
        var nearmosque = Mosques.findOne();
        //console.log(location, nearmosque);
        return nearmosque;
    },
    clientPos: function() {
        return Geolocation.latLng() || { lat: 0, lng: 0 };
    }
});

Template.newsFeedHeader.events({
    'click #search': function(e, tmpl){
        Session.set('menuTransition2', 'slideWindow');
    },
    'touchstart #bars': function (evt) {
        globalmenuToggle();
        evt.preventDefault();
    },
    'click #bars': function(e, tmpl) {
        globalmenuToggle();

    }
});

Template.checkinSurface.helpers({
    checkinTranslate: function () {
        var width = window.innerWidth,
            height = window.innerHeight;

        return [width - 86, height - 510 , 1000];
    }
});

Template.rsvpModal.events({
    'click': function(e,t){
        AntiModals.dismissAll();
    },
    'click #no': function(e, t) {

        AntiModals.dismissAll();
        var id = RSVP.findOne({
            event_id: t.data.event._id,
            user_id: Meteor.userId() || 'unregistered'
        });
        RSVP.remove(id._id);
    },
    'click #yes': function(e, t) {

        AntiModals.dismissAll();
        var id = RSVP.insert({
            status: 'yes',
            event_id: t.data.event._id,
            user_id: Meteor.userId() || 'unregistered'
        });
    },
    'click #maybe': function(e, t) {
        AntiModals.dismissAll();

        var id = RSVP.insert({
            status: 'yes',
            event_id: t.data.event._id,
            user_id: Meteor.userId() || 'unregistered'
        });
    }
});

Template.rsvpModal.helpers({
    isgoing: function(id) {
        var uid = Meteor.userId() || 'unregistered';
        Meteor.subscribe('user_rsvps', uid);

        var rsvp = RSVP.findOne({event_id: id, status: 'yes'});
        return rsvp;
    },
    maybegoing: function(id) {
        var uid = Meteor.userId() || 'unregistered';
        Meteor.subscribe('user_rsvps', uid);

        var rsvp = RSVP.findOne({event_id: id, status: 'maybe'});
        return rsvp;
    }
});

Template.checkinSurface.events({
    'click #checkinMarker': function(e, tmpl) {
        Session.set('menuTransition2', 'slideWindow');
    }
});

Template.contentContainer.rendered = function() {
    var events = Events.find().fetch();
    loc = Session.get('geolocation') || {lat:0,lng:0};
    var mapdiv = this.find('#map'), //Map Rendering
            map = L.map(mapdiv).setView([loc.lat, loc.lng], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: events.length + ' events nearby'
    }).addTo(map);

    L.Icon.Default.imagePath = 'packages/leaflet/images';

    events.forEach(function(event) {
        coords = event.location.geometry.coordinates;
        var tmark = L.marker([coords[1],coords[0]]);
        tmark.bindPopup(event.name);
        tmark.addTo(map);
    });

    map._onResize();
};

Template.card.helpers({
    isMosque: function () {
        if(this.id == 'mosque') {
            return true;
        } else {
            return false;
        }
    }
});

 Template.rsvpSide.events({
        'click #rsvpContainer': function () {
           // Session.set('menuTransition2', 'slideWindow');
            //Session.set('esTemplate', 'cardView3');
            AntiModals.overlay('rsvpModal', { // Opening modal on RSVP Button click
                modal: true
            });
        }
});

prayerCardHelpers = {
    clientPos: function() {
        return Geolocation.latLng() || { lat: 0, lng: 0 };
    },
    'nextTime': function(location) {
        var alltimes = prayTimes.getTimes(new Date(),
            [location.lat, location.lng]);

        var smallestDelta;
        var smallestTime;
        var fromNow;
        for (time in alltimes) {
            var now = moment();
            var prayerTime = moment(alltimes[time], 'HH:mm');
            //Fix the offset sothat we're working on UTC
            //prayerTime.add(now.zone(), 'minutes');
            var delta = prayerTime - now;
            if (smallestDelta && smallestDelta > 0) {
                //Only update for prayer times in the future,
                //not ones that have passed
                if (smallestDelta > delta && delta > 0) {
                    fromNow = prayerTime.from(now);
                    smallestDelta = delta;
                    smallestTime = time;
                }
            } else {
                fromNow = prayerTime.from(now);
                smallestTime = time;
                smallestDelta = delta;
            }
        }

        return {fromNow: fromNow,
            time: alltimes[smallestTime], name: smallestTime.charAt(0).toUpperCase() + smallestTime.slice(1)};
    }
}

Template.latestPrayerCard.helpers(prayerCardHelpers)

/*****************************************************************************/
/* Newsfeed: Lifecycle Hooks */
/*****************************************************************************/

Template.newsfeed.created = function() {
};

Template.newsfeed.rendered = function() {

};

Template.newsfeed.destroyed = function () {
};
