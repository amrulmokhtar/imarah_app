/*****************************************************************************/
/* Mosque: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Mosque.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.cardHeader.events({
  'click #backButton1': function () {
    window.history.back();
  }
});

Template.Mosque.helpers({
  size4: function () {
    var width = window.innerWidth,
    height = window.innerHeight;
    return [width, height];
  },
  size1: function () {
    var width = window.innerWidth;
    return [width, 27.5];
  },
  size2: function () {
    var width = window.innerWidth;
    return [width, 320];
  }
});
var joinDep = new Tracker.Dependency;

Template.mosqueProfileSurface1.helpers({
    hasLinks: function(data){
        if(data.facebook || data.twitter || data.website){return true}
    }
})

//Fetch an array of ids in the localstorage, compare to string id or objectid
idInLocalStorage = function(storekey,id){
    id = parseID(id);
    var store = EJSON.parse(localStorage.getItem(storekey)||"[]");
    var found = false;
    if(id._str){
        store.forEach(function(m){
            if(m._str == id._str){
                found = true;
            }
        })
    }else {
        if (store.indexOf(id) > -1) {
            found = true;
        }
    }
    return found;
};

Template.mosqueProfileContainer.helpers({
    notJoined: function(id) {
        joinDep.depend();
        return !idInLocalStorage('my_mosques',id);
    }
});

addToLocalStorageArray = function (key, value){
    var my_mosques = EJSON.parse(localStorage.getItem(key)||"[]");
    my_mosques.push(value);

    localStorage.setItem(key,EJSON.stringify(my_mosques));
    joinDep.changed();
};

removeFromLocalStorageArray = function (key, value) {
    var my_mosques = EJSON.parse(localStorage.getItem(key)||"[]");
    if(value._str){
        my_mosques = my_mosques.filter(function(m){
            var keep = true;
            if(m._str == value._str){
                keep = false;
            }
            return keep;
        });
    }
    localStorage.setItem(key,EJSON.stringify(_.without(my_mosques,value)));
    joinDep.changed();
};

Template.mosqueProfileContainer.events({
    'click #donatePop': function () {
       /* AntiModals.overlay('donateModal', { // Opening modal on RSVP Button click
                modal: true
        });
        */

        Router.go('/donate');
    },
    'click #joinmosque': function(e,t){
        addToLocalStorageArray('my_mosques',t.data._id);
    },
    'click #leavemosque': function(e,t){
        removeFromLocalStorageArray('my_mosques',t.data._id);
}
});
Template.amenityCard.helpers({
    amenities:function(){
        Meteor.subscribe('mosque_amenities',Mosques.findOne()._id);
        return ServiceAmenities.find();
    }
});

Template.donateModal.events({
    'click #confirm': function(e,t) {

        MosqueFinances.insert({
            mosque: currentMosque,
            amount: t.find('#donationamount').value,
            type: 'income',
            category: 'donation',
            date: new Date(),
            description: 'Donation from Amrul Amin Mokhtar'
        })
    }
})

/* tab slider */

Session.setDefault('mosqueTemplate', 'mosqueProfileSurface1') //Search surface after mosque profile has Surface1 as default
Session.setDefault('menuTransition3', 'slideWindowLeft');

Template.addressTemplate.rendered = function(){
    console.log('addressTemplate render');
    console.log(this);
}

Template.mosqueProfileTabSlider.helpers({
    showMosqueSearchTemplate: function () {
        console.log(this);
        return Template[Session.get('mosqueTemplate')]; //Template for mosque profile Search Surface
    },
    mosqueProfileTransition: function () {
        return Session.get('menuTransition3');// Search Surface Transition for Mosque profile
    }
});

Template.mosqueProfileContainer.helpers({
    tabs: function () {
        return Session.get('mosqueProfileTabsState');
    }
});

Template.Mosque.created = function() {

    Meteor.subscribe('mosque_events',Mosques.findOne()._id);
}

Template.mosqueProfileSurface2.helpers({
    events: function(){
        var today = new Date();
        today.setHours(0);
        return _.map(Events.find({date:{$gt:today}},{sort:{date:-1}}).fetch(),function(event){
            var time = moment(event.time);

            event.comb_date = moment(event.date).minutes(time.minutes()).hours(time.hours()).format('dddd DD @ hh:mm A');
            event.location_format = event.mosque_name +' , ' +  (event.city_name||'');
            return event;
        });
    }
})


Template.mosqueProfileContainer.events({
        'click #backButton1': function () {
         //   Session.set('menuTransition2', 'slideWindowRight'); //Same search transition specific for Mosque profile surface view
         // Defaults to opacity
            window.history.back();
        },
        'click #surface1': function (event, tpl) {
            setMosqueProfileSearchTabs(0);
            Session.set('menuTransition3', 'slideWindowRight');
            Session.set('mosqueTemplate', 'mosqueProfileSurface1');
        },
        'click #surface2': function (event, tpl) {
            if(tabs[0]['status']=='activetab'){
                setMosqueProfileSearchTabs(1);
                Session.set('menuTransition3', 'slideWindowLeft');
                Session.set('mosqueTemplate', 'mosqueProfileSurface2');
            } else {
                setMosqueProfileSearchTabs(1);
                Session.set('menuTransition3', 'slideWindowRight');
                Session.set('mosqueTemplate', 'mosqueProfileSurface2');
            }
        },
        'click #surface3': function (event, tpl) {
            setMosqueProfileSearchTabs(2);
            Session.set('menuTransition3', 'slideWindowLeft');
            Session.set('mosqueTemplate', 'mosqueProfileSurface3');
        }
});

var setMosqueProfileSearchTabs = function (id) {
    switch (id) {
        case 0:
            tabs[0]['status'] = 'activetab';
            tabs[1]['status'] = '';
            tabs[2]['status'] = '';
            Session.set('mosqueProfileTabsState', tabs);
            break;
        case 1:
            tabs[0]['status'] = '';
            tabs[1]['status'] = 'activetab';
            tabs[2]['status'] = '';
            Session.set('mosqueProfileTabsState', tabs);
            break;
        case 2:
            tabs[0]['status'] = '';
            tabs[1]['status'] = '';
            tabs[2]['status'] = 'activetab';
            Session.set('mosqueProfileTabsState', tabs);
            break;
    }
};

var tabs = [
    {status: 'activetab', id: 'surface1' , text: 'Details', imgId: 'about'},
    {status: '', id: 'surface2' , text: 'Events', imgId: 'events'},
    {status: '', id: 'surface3', text: 'Amenities', imgId: 'amenities'}
];

Session.setDefault('mosqueProfileTabsState', tabs);

/*****************************************************************************/
/* Mosque: Lifecycle Hooks */
/*****************************************************************************/
var currentMosque;

Template.Mosque.created = function() {
    currentMosque = this.data.mosque._id;
};


Template.Mosque.rendered = function() {
    currentMosque = this.data.mosque._id;
};

Template.Mosque.destroyed = function () {
};
