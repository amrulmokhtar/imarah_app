/**
 * Created by ryan on 22/01/15.
 */

Template.JaisEvents.rendered = function(){
    $('.top_title').html('Events')
};

Template.jais_dashboard_content_events.events({
    'change #mosque_select': function(e,t){

        Session.set('jais_selected_mosque',parseID(e.target.value));
        $('.fc').fullCalendar( 'refetchEvents' );
        $('.fc').fullCalendar( 'render' );
    }
});
Template.jais_dashboard_content_events.helpers({
    mosque: function() {
        return Mosques.findOne({_id:Session.get('jais_selected_mosque')});
    },
    stats_for_month: function(mosque){

        if(mosque.event_stats){
            var query = {_id:{month:new Date().getMonth()+1,
                year:new Date().getFullYear()}};
            //console.log(query);
            //console.log(mosque.event_stats)
            var result = _.chain(mosque.event_stats)
                //.values()
                .filter(function(data){
                    return data._id.month==query._id.month && data._id.year == query._id.year
                }).value()[0];
            //console.log(result);
            _.extend(mosque,result);
        }
        return mosque;
    },
    caloptions: function () {
        var cal = $.calendars.instance('Islamic');

        $('.fc').fullCalendar( 'refetchEvents' );
        $('.fc').fullCalendar( 'render' );
        return {
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            defaultDate: new Date(),
            selectable: false,
            selectHelper: true,
            viewRender: function( view, element){
                var date =  cal.today().fromJSDate(view.calendar.getDate()._d);
                view.title = date.formatDate('MM yyyy') + '/' + view.title;
                view.dayGrid.dayEls.toArray().forEach(
                    function(el){
                        el.innerHTML=cal.fromJSDate(moment(el.dataset.date)._d).formatDate('dd MM');
                    });
            },
            /* TODO: make view function
            dayClick: function(date, jsEvent, view) {
                Router.go('mosque_dashboard.new_event_at', {date: date});
            },
            eventClick: function(event) {
                Router.go('mosque_dashboard.edit_events', {eventId: event._id});
            },*/
            select: function(start, end) {
                var title = prompt('Event Title:');
                var eventData;
                if (title) {
                    eventData = {
                        title: title,
                        start: start,
                        end: end
                    };
                    $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                }
                $('#calendar').fullCalendar('unselect');
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: getEventData
        }
    },
    upcomingEvents:function() {
        return Events.find({date:{$gt:new Date()}},{sort:{data:-1}});
    },
    pastEvents:function() {
        return Events.find({date:{$lt: new Date()}},{sort:{data:-1}});
    },
    events:function() {
        return Events.find();
    },
    chartdata: function() {
        Tracker.autorun(function(){
            Meteor.call('normEventCalc',[Session.get('jais_selected_mosque')],{},function(err,res){
                var events = res.map(function(mosque){
                    return [mosque.date,mosque.total];
                });
                var eventsdata = [
                    {
                        key: 'Number of Events',
                        values: fill_dates(events)
                    }
                ];
                Session.set('jaisEvents',eventsdata);
            });
        });
        return 'jaisEvents';
    },
    eventsForMonth: function(){
        var startmonth = moment(new Date().setDate(1))._d;
        var endmonth = moment(new Date().setDate(1)).add(1, 'month')._d;
        //console.log(startmonth, endmonth);
        var eventslist = Events.find({date: {
            $gt: startmonth,
            $lt: endmonth}});
        return eventslist;}
});


var getEventData = function(start, end, timezone, callback){
    //Tracker.autorun()

    var tmosque = Mosques.findOne({_id:Session.get('jais_selected_mosque')});
    Meteor.subscribe('mosque_events',tmosque._id);
    var events = Events.find({mosque_id: tmosque._id});
    var eventdata = events.fetch();//Events.find({mosque_id: tmosque._id}).fetch();
    //console.log(eventdata);
    var data = eventdata.length;
    var eventslist = [];
    for (var i = 0; i < data; i++) {
        var title1 = eventdata[i]['name'];
        var date = eventdata[i]['date'];
        if ((date != null) && (title1 != null)) {
            var time = eventdata[i]['time'];
            if(typeof(time)==typeof(new Date())){
                var dateformat = moment(date).add(time.getHours(), 'hours')
                    .add(time.getMinutes(), 'minutes').format('YYYY-MM-DD[T]HH:mm');
            } else {
                dateformat = moment(date).add(time,'seconds');
            }

            var edited = {
                "_id": eventdata[i]['_id'],
                title: title1,
                start: dateformat,
                seat: eventdata[i]['seats'],
                type: eventdata[i]['type']
            };
            eventslist.push(edited);
        }
    }
    callback(eventslist);
};