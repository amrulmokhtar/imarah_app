Template.Mosque_events.rendered = function() {

    var today = new Date();
    var mm = today.getMonth() + 1;
    var currentdate = today.getFullYear() + '-' + mm + '-' + today.getDate();
    $('.top_title').html('Events');
    $('#page_title').html('Events');

    $('#listviewbtn').click(function(){
        $('#event-schedule-listview').tab('show')
    });

    //$('#calendar').fullCalendar();

};

Template.linechart.rendered = function() {
    /*
    var currentEl = this.$('svg');
    var percentages = []
    while(currentEl.parent() && currentEl.width()<101){
        percentages.push(currentEl.width());
        currentEl = currentEl.parent();
    }
    width = currentEl.width();
    //console.log(width);
    //console.log(percentages);
    while(mod = percentages.pop()){
        width = width * (mod/100);
    }*/
    //console.log(width);
};

Template.linechart.created = function() {
    //console.log(this);
    //var width = 600;


    var chart = nv.models.lineChart()
        .x(function(d) { return d[0] })
        .y(function(d) { return d[1] / 1 })
        //FIXME: have to make it responsive
        .width($(document).width()*0.65)
        .color(d3.scale.category10().range())
        .useVoronoi(false);
    var self = this;
    nv.addGraph(function() {
        chart.xAxis
            .rotateLabels(-25)
            .tickFormat(function(d) {
                formatted = moment(d).format('YYYY/MM/DD');
                return formatted;
            });

        chart.yAxis
            .tickFormat(
            d3.format(',.2f'));

        Tracker.autorun(function(){
            d3.select('#'+self.data.id +' svg')
                .datum(Session.get(self.data.data_key)||[])
                //.datum(self.data.chartdata||[])
                .call(chart);
        });


        //TODO: Figure out a good way to do this automatically
        nv.utils.windowResize(chart.update);
        return chart;
    });
}

Template.eventpopup.rendered = function() {
    $('#time').timepicker();
    $('.input-group.date').each(function() {
        var format = $(this).find("input[type='text']").attr('data-format').toLowerCase() || 'mm/dd/yyyy';

        $(this).datepicker({
            autoclose: true,
            todayHighlight: true,
            todayBtn: true,
            forceParse: false,
            keyboardNavigation: false,
            format: format
        });
    });

    $('input[autofocus]').focus();
};

Template.Mosque_events.events({
    'click #edit': function() {
        Router.go('mosque_dashboard.edit_events', {eventId: this._id});
    },

    'submit': function(e, t) {
        e.preventDefault();

        var self = this;

        validateForm(
            $(e.target),
            function(fieldName, fieldValue) {
            },
            function(msg) {
            },
            function(values) {
                values.picture = [];
                var files = t.findAll('input[type="file"]');

                values.location = Location.get('geojson');
                values.longitude = undefined;
                values.latitude = undefined;
                var userrole = Meteor.user().roles;
                if (userrole == 'admin') {
                    manager = Meteor.userId();
                }
                else {

                    manager = Meteor.user().profile.manager;
                }
                values['manager'] = manager;


                var reader = new FileReader();
                reader.onload = function(e) {
                    // Add it to your model
                    values.picture.push(e.target.result);
                    if (values.picture.length == files.length) {
                        newId = Events.insert(values);
                        $('#cancel_event').click();
                        Router.go('mosque_dashboard.events', {});
                    }else {
                        reader.readAsDataURL(
                            files[values.picture.length].files[0]);
                    }
                };
                reader.readAsDataURL(files[0].files[0]);
            }
        );

        return true;
    }
});


//Takes events from a given month and inserts duplicates 5 weeks ahead
duplicateEvents= function(mosqueId,fromDateStart,fromDateEnd,toDateStart){
    var eventdata = Events.find({mosque_id: mosqueId,
        date:{$gt:fromDateStart,$lt:fromDateEnd}}).fetch();
    var weekdelta = moment(moment(toDateStart)- moment(fromDateStart)).weeks() - 1;

    eventdata.forEach(function(event){
        delete(event._id);
        event.date = moment(event.date).add(weekdelta,'weeks')._d;
        if(event.prayer_time){
            var times = prayTimes.getTimes(new Date(),
                [event.location.geometry.coordinates[1], event.location.geometry.coordinates[0]]);
            event.time = moment(times[event.prayer])._d;

            var time = event.prayer_time;

            var mcords = event.location.geometry.coordinates;
            var times = prayTimes.getTimes(moment(event.date)._d,
                [mcords[1],mcords[0]]);
            var ptime = moment(times[time],'HH:mm').format('hh:mm A');

            $('#time').val(ptime);
        }
        Events.insert(event);
    })
}

Template.Mosqu_eventhtml.events({
   'click #printbtn':function(e,t){
       function Popup(data,css)
       {
           var mywindow = window.open('', 'my div', '');
           mywindow.document.write('<html><head><title>Events</title>');
           mywindow.document.write('<style type="text/css" />'+css+'</style>');
           mywindow.document.write('</head><body >');
           mywindow.document.write(data);
           mywindow.document.write('</body></html>');

           mywindow.document.close(); // necessary for IE >= 10
           mywindow.focus(); // necessary for IE >= 10

           mywindow.print();
          mywindow.close();

           return true;
       }

       function getallcss() {
           var css = "", //variable to hold all the css that we extract
               styletags = document.getElementsByTagName("style");

           //loop over all the style tags
           for(var i = 0; i < styletags.length; i++)
           {
               css += styletags[i].innerHTML; //extract the css in the current style tag
           }

           var currentsheet = false;//initialise a variable to hold a reference to the stylesheet we are currently extracting from
           //loop over all the external stylesheets
           for(var i = 0; i < document.styleSheets.length; i++)
           {
               currentsheet = document.styleSheets[i];
               //loop over all the styling rules in this external stylesheet
               if(currentsheet.cssRules){
                   for(var e = 0; e < currentsheet.cssRules.length; e++)
                   {
                       css += currentsheet.cssRules[e].cssText; //extract all the styling rules
                   }
               }
           }

           return css;
       }

       Popup($('#event-schedule').html(),getallcss());
   },
    'click #confirm_duplicate_btn': function(e,t){
        //FIXME: have to see if there is a better way to provide global mosque ID
        var tmosque = Mosques.findOne();
        var firstDateOfMonth = moment($('#duplicate_from_month').val())._d;
        firstDateOfMonth.setDate(1);
        var lastDateOfMonth = new Date();
        lastDateOfMonth.setMonth(firstDateOfMonth
                .getMonth()+1);
        lastDateOfMonth.setDate(0);

        var targetMonth = moment($('#duplicate_to_month').val())._d;
        targetMonth.setDate(0);
        //check confirmation
        duplicateEvents(tmosque._id, firstDateOfMonth, lastDateOfMonth, targetMonth);
        $('#duplicateModal').modal('hide');
    }
});

var getEventData = function(start, end, timezone, callback){
    var tmosque = Mosques.findOne();
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
}

Template.Mosqu_eventhtml.helpers({
    eventsForMonth: function(){
        var startmonth = moment(new Date().setDate(0))._d;
        var endmonth = moment(new Date().setDate(1)).add(1, 'month')._d;
        //console.log(startmonth, endmonth);
        var eventslist = Events.find({date: {
            $gt: startmonth,
            $lt: endmonth}},{sort:{date:-1}});
       return eventslist;
    },
    chartoptions: function(){

        return {};
    },
    chartdata: function(){
        var events = Events.find({},{sort:{date:-1}}).fetch();

        events = events.map(function(ev){
            ev.totalCheckins = ev.totalCheckins || 0;
            ev.totalRSVP = ev.totalRSVP || 0;
            return ev;
            //ev.rating = ev.rating || 0;
        });
        //console.log(events);
        var dates = _.pluck(events,'date');
        var data = [
            {
                'key': 'attendees',
                values: _.zip(dates,_.pluck(events,'totalCheckins'))
            },
            {
                key: 'rsvp',
                values: _.zip(dates,_.pluck(events,'totalRSVP'))
            }
        ];
        Session.set('eventsData',data);
        return 'eventsData';
    },
    nearbymonth: function(start,end,center){
        var months = [];
        var three_months_back = moment().add(start,'months');
        months.push({name:three_months_back.format('MMM YYYY')});
        for(var i = 0; i < end; i++){
            three_months_back.add(1,'months');
            var formattedMonth = {
                name:three_months_back.format('MMM YYYY'),
                date:three_months_back.toISOString()
            };
            if(i==center){
                formattedMonth.selected = 'selected';
            }
            months.push(formattedMonth);
        }
        return months;
    },
    events: function(){
        var tmosque = Mosques.findOne();
        return Events.find({mosque_id: tmosque._id},{sort:{date:1}});
    },
    stats_for_month: function(){
        var mosque = Mosques.findOne();
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
    caloptions: function(events) {
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
            dayClick: function(date, jsEvent, view) {
                Router.go('mosque_dashboard.new_event_at', {date: date});
            },
            eventClick: function(event) {
                Router.go('mosque_dashboard.edit_events', {eventId: event._id});
            },
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
    upcommingevents: function() {
        //managerid = Meteor.user().profile.manager;
        //eventslist = Events.find({manager: managerid}).fetch();
        events = Events.find({date: {$gt: moment().add(-1,'days')._d}},{sort:{date:1}});
        return events;
    },
    postevents: function() {
        //mosque = Mosque
        //managerid = Meteor.user().profile.manager;
        eventslist = Events.find({date:{$lt:moment().add(-1,'days')._d}},{sort:{date:-1}});
        return eventslist
    },
    currentdate: function() {
        var date = new Date();
        month = date.getMonth();
        thismonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentmonth = thismonth[month];
        return currentmonth;
    },
    mosque_event_vister: function() {
        managerid = Meteor.user().profile.manager;
        eventslist = Events.find().fetch();

        var visitors = Check_In.find().fetch().length;
        /*
          var mosuqe_vister = 0;
          var currentdate = new Date();
          var currentday = currentdate.getMonth() + 1;
          for (i = 0; i < eventslist.length; i++) {
          var date = eventslist[i]['date'];
          var selectdate = date.getMonth() + 1;
          if (currentday == selectdate) {
          vister = eventslist[i]['checkin'];
          if (isNaN(parseInt(vister))) {vister = 0;}
          mosuqe_vister += parseInt(vister);
          }


          }*/
        return visitors;
    },
    Avgevent: function() {
        //managerid = Meteor.user().profile.manager;

        var startmonth = moment(new Date().setDate(1))._d;
        var endmonth = moment(new Date().setDate(1)).add(1, 'month')._d;
        //console.log(startmonth, endmonth);
        var eventslist = Events.find({date: {
            $gt: startmonth,
            $lt: endmonth}}).fetch();
        var totalevent = eventslist.length;
        //console.log(eventslist);
        //Meteor.subscribe('mosque_checkins', parseID(eventslist[0].mosque_id));
        var visitors = Check_In.find().fetch().length;

        //Meteor.subscribe('mosque_checkins',this.data.mosque._id);
        /*var mosuqe_vister = 0;
          var currentdate = new Date();
          var totalevent = 0;
          var currentday = currentdate.getMonth() + 1;
          for (i = 0; i < eventslist.length; i++) {
          var date = eventslist[i]['date'];
          var selectdate = date.getMonth() + 1;

          if (currentday == selectdate) {
          vister = eventslist[i]['checkin'];
          if (isNaN(parseInt(vister))) {vister = 0;}
          mosuqe_vister += parseInt(vister);
          totalevent = totalevent + 1;
          }
          }*/
        // console.log("avg",mosuqe_vister,totalevent)
        if (totalevent == 0 || visitors == 0) {
            return 0;
        }
        avg = Math.round(((totalevent) / (visitors)));
        return avg;
    },
    Popular_Event: function() {
        eventslist = Events.find({}, {sort: {'totalCheckins': -1}}).fetch();
        /*for (i = 0; i < 1; i++) {
        //console.log(eventslist[i]['checkin']);
        var populerevent = eventslist[i]['name'];
        }*/

        if (eventslist.length > 0) {
            return eventslist[0].name;
        }
    }
});

Template.eventlistROW.events({
    'click #delete': function(e, t) {
        Events.remove(t.data._id);
    }
});

Template.eventlistROW.helpers({
    formattime: function(seconds) {
        return moment(new Date(2014,2,17,0,0)).add(seconds,'seconds').format('hh:mm A');
    },
    formatdate: function(date) {
        return moment(date).format('DD/MMM/YYYY');
    },
    imamname:function(imamid){
        if(imamid){
            imam = Imams.findOne({_id:parseID(imamid)})
            if(imam && imam.first_name){
                return imam.first_name;
            }
        }
    },
    numRSVP: function(id) {
        //Meteor.subscribe('event_rsvps', id);
        return RSVP.find({eventId: id}).fetch().length;
    },
    numCheckin: function(id) {
        //Meteor.subscribe('event_checkins', id);
        return Check_In.find({eventId: id}).fetch().length;
    }
});
