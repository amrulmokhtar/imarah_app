/**
 * Created by ryan on 20/01/15.
 */


Session.setDefault('jaisEventData',[
        {
            key: 'Events',
            values: [[new Date(),1]]
        }
    ]
);

//Takes an array of arrays, with the first value being dates, and
//fills missing dates according to index
fill_dates = function(values){
    var start_date = moment(values[0][0]);
    var end_set = values.pop();
    values.push(end_set);
    var end_date = moment(end_set[0]);

    var x = Math.round(start_date.diff(end_date)*1.15741e-8);

    //have to re-initialize because diff seems to modify the original date
    //var start_date = moment(values[0][0]);
    var allDates = []
    for(var i = 0; i<x; i++){
        allDates.push(moment(end_date.add(1,'day')._d)._d);
    }

    allDates.reverse();
    var checkIndex = 0;
    allDates.forEach(function(date){
        var origlength = values.length;
        while(checkIndex<origlength){
            if(values[checkIndex][0] < date){
                values.splice(checkIndex,0,[date,0]);
                checkIndex++;
                break;
            }else if(values[checkIndex][0].getDay() == date.getDay()){
                checkIndex++;
                break;
            }else{
                checkIndex++;
            }
        }
    });

    return values;
}

Template.jais_dashboard_content.created = function(){
    Meteor.call('normEventCalc',_.pluck(this.data.mosques.fetch(),'_id'),{},function(er,res){
        var events = res.map(function(mosque){
            return [mosque.date,mosque.total];
        });
        events = fill_dates(events);
        var results = [
            {
                key: 'Events',
                values: events
            }
        ];
        Session.set('jaisEventData',results);
    });
};

Template.jais_dashboard_content.helpers({

    mosque_stats:function(){
        var stats = {};
        var query = {_id:{month:new Date().getMonth()+1,
            year:new Date().getFullYear()}};

        month_stats = _.chain(this.mosques.fetch()).pluck('event_stats')
            .filter(function(stats){if(stats && stats.length>0){return true}})
            .map(function(stat){
           return _.filter(stat, function(data){

               return data._id && data._id.month==query._id.month && data._id.year == query._id.year
           })[0];
        });

        stats.avg_event = month_stats.pluck('total_events').reduce(reduce_avg,0).value();
        stats.avg_check_in = month_stats.pluck('avg_check_in').reduce(reduce_avg,0).value();
        stats.total_event = month_stats.pluck('total_events').reduce(reduce_sum,0).value();

        return stats;
    },
    jaischartdata: function(){

        //console.log(Session.get('jaisEventData'));

        return 'jaisEventData';
    }
});

Template.filters_rows_list.helpers({
    districtMosques: function(district) {
        if(district=="Other"){
            return Mosques.find({$or:[{district:''},{district:undefined},{district:{$exists:0}}]});
        }
        return Mosques.find({district:district});
        //return _.findWhere(this.mosques,{district:district});
    }
});

reduce_sum = function(p,c){
    return p+c;
};

Template.jais_dashboard_content_events.helpers({

});

Template.jais_dashboard_content_feedback.helpers({

});

stats_for_month = function(mosque){
    if(mosque.event_stats){
        var query = {_id:{month:new Date().getMonth()+1,
            year:new Date().getFullYear()}};

        var result = _.chain(mosque.event_stats)
            .filter(function(data){
                return data._id.month==query._id.month && data._id.year == query._id.year
            }).value()[0];

        _.extend(mosque,result);
    }
    return mosque;
}

Template.mosqueDistrictListROW.helpers({
    stats_for_month: stats_for_month
});