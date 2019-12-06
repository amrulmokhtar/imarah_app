Template.MosqueDashboard.rendered = function() {

};

Template.MosqueDashboard.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }
});

Template.MosqueDashboard.helpers({
    postcommit:function(){
        //var commit=MosqueCommitpost.find().fetch();

        return this.data.managed_mosque.posts;
    }

});

Template.MosqueDashboardMosqueMenu.rendered = function() {
    $('.top_title').html('Dashboard');
    $('#page_title').html('Dashboard');
    var myDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    var date=new Date();
    getday=date.getDay();
    day=myDays[getday];
    $('#day').html(day);
    $('#currentdate').html(date.getDate());
};


Template.MosqueDashboardMosqueMenu.events({
    'click #add_commit':function(evt, tmpl){ //SHOULD NOT BE COMMIT, SHOULD BE POST OR UPDATE
        var values = {};
        values.content = tmpl.find('#post_commit').value;
        if(values.content.length < 1){
            //TODO: make a popup or warning ask for post content
            return false;
        }

        values.author_name = tmpl.data.managed_mosque.name;

        values.posted_date = new Date();
        //console.log(tmpl.data.managed_mosque._id)
        Mosques.update(Mosques.findOne()._id,{$push:{posts:values}});
        console.log('got here');
        $('#post_commit').val("");
    }
});

Template.mosque_dashboard_post.events({
   'click #delPostBtn': function(e,t){
       var id = Mosques.findOne()._id
       var docQuery = {name:Mosques.findOne().name};
       var matchQuery = {posts:t.data};
       Meteor.call('removeDenormPost',docQuery,matchQuery);
   },
    'click #editPostBtn': function(e,t){
        //TODO: Change edit to actually edit instead of re-posting
        var id = Mosques.findOne()._id
        var docQuery = {name:Mosques.findOne().name};
        var matchQuery = {posts:t.data};
        $('#post_commit').val(t.data.content);
        Meteor.call('removeDenormPost',docQuery,matchQuery);

    }
});

Template.mosque_dashboard_post.helpers({
    formatdate: function(date) {
        return moment(date).fromNow();
    }
});

Template.MosqueDashboardMosqueMenu.helpers({
    stats_for_month: stats_for_month,
    islamicDate:function(){
        return writeIslamicDate();
    },
    numrsvp: function(eventid) {
        return RSVP.find({eventId: eventid}).length;
    },
    formattime: function(time) {
        return moment(time).format('hh:mm A');
    },
    "mosqueId": function(){
        return this.managed_mosque.fetch()[0]._id;
        /*if(mosqueId){
          return mosqueId;
          }else{
          return 1//managed_mosque._id;
          }*/
    },
    imamname: function(id) {
        var imam = Imams.findOne({_id: parseID(id)});
        var name = '';
        if (imam) {
            if (imam.title) {
                name += imam.title;
            }
            if (imam.first_name) {
                name += ' ' + imam.first_name;
            }

            if (imam.last_name) {
                name += ' ' + imam.last_name;
            }
        }
        return name;
    },
    donations_for_month: function() {
        var donations = MosqueFinances.find({'category': 'donation'}).fetch();
        //console.log(donations);
        var total = 0;
        donations.forEach(function(donation) {
            if (donation.date.getMonth() == new Date().getMonth()) {
                total = total + parseInt(donation.amount);
            }
        });
        return total;
    },
    eventlist: function() {
        var today = new Date();
        var mm = today.getMonth()+1;
        var currentdate=today.getFullYear()+'-'+mm+'-'+today.getDate();
        var events=Events.find().fetch();
        todayevents=[];
        for(var i=0;i<events.length;i++){
            var date=events[i]['date'];
            var month = date.getMonth()+1;
            var datelist=date.getFullYear()+'-'+month+'-'+date.getDate();
            if(datelist==currentdate){
                var hrs=date.getUTCHours();
                var time = new Date(events[i]['time'] * 1000);
                var hh = time.getUTCHours();
                var mint = time.getUTCMinutes();
                if(hrs > 12){
                    hrs -= 12;
                    meridian = 'PM';
                }
                else {
                    meridian = 'AM';
                }
                if(mint.toString().length=='1'){ mint='0'+mint;}else{ mint=mint;}
                events[i]['mettime']=hh+':'+mint+meridian;
                todayevents.push(events[i]);
            }
        }
        return todayevents;

    },
    eventcount:function(){
        var today = new Date();
        var mm = today.getMonth()+1;
        var currentdate=today.getFullYear()+'-'+mm+'-'+today.getDate();
        var events=Events.find().fetch();
        count=[];
        for(var i=0;i<events.length;i++){
            var date=events[i]['date'];
            var month = date.getMonth()+1;
            var datelist=date.getFullYear()+'-'+month+'-'+date.getDate();
            if(datelist==currentdate){
                count.push(events[i]);
            }
        }
        return count.length;
    },
    currentdate:function(){
        var date=new Date();
        month=date.getMonth();
        year=date.getFullYear();
        thismonth=["January", "February", "March", "April","May", "June","July", "August", "September", "October", "November", "December"];
        currentmonth=thismonth[month];
        return currentmonth +" "+ year;
    },
    mosque_vister:function(){ // VISITOR not VISITER
        managerid=Meteor.user().profile.manager;
        eventslist = Events.find({manager:managerid}).fetch();
        //console.log(eventslist);
        var mosuqe_vister=0;
        var currentdate=new Date();
        var currentday=currentdate.getMonth()+1;
        for(i=0;i<eventslist.length;i++){
            var date=eventslist[i]['date'];
            var selectdate=date.getMonth()+1;
            if(currentday==selectdate){
                vister= eventslist[i]['checkin'];
                if(isNaN(parseInt(vister))){vister=0;}
                mosuqe_vister+=parseInt(vister);
            }
        }

        if(isNaN(mosuqe_vister)){mosuqe_vister = 0};
        return mosuqe_vister;
    },
    Avgevent:function(){
        managerid=Meteor.user().profile.manager;
        eventslist = Events.find({manager:managerid}).fetch();
        var mosuqe_vister=0;
        var currentdate=new Date();
        var totalevent=0;
        var currentday=currentdate.getMonth()+1;
        for(i=0;i<eventslist.length;i++){
            var date=eventslist[i]['date'];
            var selectdate=date.getMonth()+1;

            if(currentday==selectdate){
                vister= eventslist[i]['checkin'];
                if(isNaN(parseInt(vister))){vister=0;}
                mosuqe_vister+=parseInt(vister);
                totalevent=totalevent+1;
            }
        }
        if (totalevent == 0 || mosuqe_vister == 0) { return 0; }
        // console.log("avg",mosuqe_vister,totalevent)
        avg=Math.round((mosuqe_vister)/(totalevent));
        return avg;
    }
});


Template.comment_list.rendered=function(){

}

Template.comment_list.events({


});

Template.comment_list.helpers({
    formatdate: function(date) {
        return moment(date).fromNow();
    },
    getmosquecommit: function(id, filter) {
        var mosquecomment = MosqueCommitpost.find(
            {mosque_id: id},
            {sort: {'date': -1}}).fetch();

        //If we iterate over the entire collection in the helper
        //and then iterate over it in the template again, we are
        //being inefficient. Both performance and programming time
        //wise

        /*var postcommit = [];
          for(var i = 0; i<mosquecomment.length;i++){
          var date = moment(mosquecomment[i]['date']).fromNow();
          mosquecomment[i]['time']=date;
          postcommit.push(mosquecomment[i]);
          }*/
        return mosquecomment;
    }
});
