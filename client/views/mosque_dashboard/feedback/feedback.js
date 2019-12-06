Template.Mosqufeedback.rendered=function(){
    $('.top_title').html('Feedback');
     $('#page_title').html('Feedback');
};

reduce_avg = function(p,c,i,a){return (p*(i)+c)/(i+1)};
function average_of(key, data){
    return _.chain(data).pluck(key).reduce(reduce_avg).value().toPrecision(3);
}

function match_for_month(month,date_key){
    var match = {};
    var s_month = new Date();
    s_month.setMonth(month);
    s_month.setDate(1);
    var e_month = new Date();
    //FIXME Possible bug on December
    e_month.setMonth(month+1);

    e_month.setDate(0);
    match[date_key] = {};
    match[date_key].$gt = s_month;
    match[date_key].$lt = e_month
    return match;
}

Template.feedbackhtml.helpers({
    month: function(){
        return moment().format('MMMM');
    },
    monthly_feedback:function(type){
        var filter = {for:type};
        filter = _.extend(filter,match_for_month(new Date().getMonth(),'date'));

        return Feedback.find(filter).fetch()
    },
    feedback: function(type, status){

        if(!type){
            return Feedback.find().fetch();
        }
        if(!status || status == 'all'){
            return Feedback.find({for:type}).fetch();
        }
        if(status=='unread'){
            return Feedback.find({status:{$ne:1},for:type});
        }
        return Feedback.find({for:type,status:status});
    },
    average_of: average_of,
    chartdata:function(filter){
        var feedback = Feedback.find({for:filter}).fetch();
        var keys = [];
        feedback = _.chain(feedback).groupBy('event_id').map(
            function(group,key){
                keys.push(group[0].date);
                return _.chain(group).pluck('rating').reduce(reduce_avg).value();
            }).value();

        if(keys.length>0){
            Session.set('feedbackData'+filter,[{
                key:'Rating',
                values:  _.zip(keys,feedback)
            }])
            return 'feedbackData'+filter;
        }else{
            return 'feedbackData'+filter;
        }
    }
});

Template.feedback_row.helpers({
    format_date : function(date){
        return moment(date).format('DD MMM');
    }

});



