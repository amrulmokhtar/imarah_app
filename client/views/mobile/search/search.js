/*****************************************************************************/
/* Search: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.search.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.search.helpers({

});

var setActiveTab = function (id) {
    var tabs = Session.get('searchTabs');
    switch(id) {
    case 0:
        tabs[0]['select'] = 'active2';
        tabs[1]['select'] = 'iconBox2';
        tabs[2]['select'] = 'iconBox2';
        break;
    case 1:
        tabs[0]['select'] = 'iconBox2';
        tabs[1]['select'] = 'active2';
        tabs[2]['select'] = 'iconBox2';
        break;
    case 2:
        tabs[0]['select'] = 'iconBox2';
        tabs[1]['select'] = 'iconBox2';
        tabs[2]['select'] = 'active2';
        break;
    }
    Session.set('searchTabs', tabs);
};

Template.searchHeader.events({
    'change #name_2': function(event, tpl) {
        Session.set('searchQuery', event.target.value);
    },
    'click #arrowleft': function(event, tpl) {
        // Set News feed on back click
        Session.set('menuTransition2', 'slideWindowRight');
    },
    'click #surface2': function(event, tpl) {
        setActiveTab(1);
        if (Session.get('searchTemplate') == 'searchSurface1') {
            // Set different surfaces on search
            // surface on different boxes click
            Session.set('menuTransition1', 'slideWindowLeft');
        }
        else {
            Session.set('menuTransition1', 'slideWindowRight');
        }
        Session.set('searchTemplate', 'searchSurface2');
    },
    'click #surface3': function (event, tpl) {
        setActiveTab(2);
        Session.set('menuTransition1', 'slideWindowLeft');
        Session.set('searchTemplate', 'searchSurface3');

    },
    'click #surface1': function (event, tpl) {
        setActiveTab(0);
        Session.set('menuTransition1', 'slideWindowRight');
        Session.set('searchTemplate', 'searchSurface1');
    },
    'click #arrowleft': function (event, tpl) {
        window.history.back();
    }
});

Template.searchHeader.helpers({
    tab: function () {
        return Session.get('searchTabs');
    }
});

Template.searchSurfaceHandler.helpers({
    searchTemplate: function() {
        return Session.get('searchTemplate');
    },
    showTemplate1: function() {
        // Set Search Transition Template
        return Template[Session.get('searchTemplate')];
    },
    menuTransition1: function() {
        //Search Transition method
        return Session.get('menuTransition1');
    }
});

//Sets default search tabs position
var tabs =  [
    {select: 'active2', text: 'MOSQUES' ,id: 'surface1'},
    {select: 'iconBox2', text: 'IMAMS', id: 'surface2'},
    {select: 'iconBox2', text: 'EVENTS', id: 'surface3'}
];
Session.setDefault('searchTabs', tabs);

// Sets transition templates in search view
Session.setDefault('searchTemplate', 'searchSurface1');

//Default pages transition
Session.setDefault('menuTransition1', 'slideWindowLeft');

moment.locale('en', {
    calendar : {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L LT'
    }
});

Template.eventCard2.helpers({
    formatDate: function(date, time){
        date = moment(date).add(time,'s');
        return date.calendar();
    },
    mosquedetails: function(id){
        if(id && id.split){

            initArg = id.split('(');
            if (initArg.length > 1){
                if (initArg[0] == "ObjectID" ){
                    id = eval("new Meteor.Collection." + id);
                }
            }
            result = '';
            mosque = Mosques.findOne({_id: id});
            //console.log(id)
            //console.log(mosque)
            if (mosque) {
                result = mosque.name + ', ' + mosque.city;
            }
            return result;
        }
    }
})


Template.searchSurface1.helpers({
    mosques: function() {
        return Mosques.find({});
    }
});

Template.searchSurface2.helpers({
    imams: function(){
        var regex = new RegExp(Session.get('searchQuery'), 'i');
        return Imams.find({$or: [
            {first_name: regex},
            {title:regex},
            {last_name:regex}]},
                          {limit: Session.get('loadlimit')});
    }
})

Template.searchSurface3.helpers({
    events: function(){
        var regex = new RegExp(Session.get('searchQuery'));
        return Events.find({$or:[
            { name: regex}
        ]},{limit:Session.get('loadlimit')});
    }
})
/*****************************************************************************/
/* Search: Lifecycle Hooks */
/*****************************************************************************/
Template.search.created = function () {
};

Template.search.rendered = function () {
};

Template.search.destroyed = function () {
};
