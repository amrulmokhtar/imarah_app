/**
 * Created by ryan on 22/01/15.
 */

Template.JaisFeedback.rendered = function(){
    $('.top_title').html('Feedback');
};

Template.jais_dashboard_content_feedback.helpers({
    feedback: function(friday){
        if(friday){
            return Feedback.find({for:'event',friday_rating:{$exists:1}},{sort:{date:-1}});
        }
        return Feedback.find({for:'event'},{sort:{date:-1}});
    },
    mosque: function(){
        return Mosques.findOne({_id:Session.get('jais_selected_mosque')});
    },
    stats_for_month: function(mosque){
    //    var mosque = Mosques.findOne();
        if(mosque && mosque.event_stats){
            var query = {_id:{month:new Date().getMonth()+1,
                year:new Date().getFullYear()}};

            var result = _.chain(mosque.event_stats)
                .filter(function(data){
                    return data._id.month==query._id.month && data._id.year == query._id.year
                }).value()[0];
            result.all_time_avg = _.chain(mosque.event_stats).pluck('avg_rating').reduce(reduce_avg).value();
            result.all_time_friday_avg = _.chain(mosque.event_stats).pluck('avg_friday_rating').reduce(reduce_avg).value();

            result.num_feedback = Feedback.find({for:'event'}).count();
            result.num_friday_feedback = Feedback.find({for:'event',friday_rating:{$exists:true}}).count();
            console.log(result);
            _.extend(mosque,result);
        }
        console.log(mosque);
        return mosque;
    },
    chartdata:function(){
        return 'chartdata';
    },
    fridaychartdata:function(){
        return 'fridaychartdata';
    }
});

Template.jais_dashboard_content_feedback.events({
    'change #mosque_select': function(e,t){
        console.log('selecting mosque');
        Meteor.subscribe('feedback_for_mosque', parseID(e.target.value));
        Session.set('jais_selected_mosque',parseID(e.target.value));
        Meteor.call('normFeedbackCalc',parseID(e.target.value),{for:'event'},function(er,res){
            var events = res.map(function(mosque){
                return [mosque.date,mosque.rating];
            });
            var results = [
                {
                    key: 'Feedback',
                    values: events
                }
            ];
            Session.set('chartdata',results);
        });

        Meteor.call('normFeedbackCalc',parseID(e.target.value),
            {for:'event',friday_rating:{$exists:true}},function(er,res){
            var events = res.map(function(mosque){
                return [mosque.date,mosque.rating];
            });
            var results = [
                {
                    key: 'Feedback',
                    values: events
                }
            ];
            Session.set('fridaychartdata',results);
        });
    }
});