/*****************************************************************************/
/* Imam: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Imam.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.imamHeader.events({
  'click #backButton1': function () {
      window.history.back();
  }
});

Template.Imam.helpers({
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
    return [width, 340];
  }
});
var followDep = new Tracker.Dependency;

// Template.imamHeaderProfile.helpers({
//   following: function(id){
//     followDep.depend();
//     return !idInLocalStorage('my_imams',id);
//   }
// })

// Template.imamHeaderProfile.events({
  // 'click #followimam' : function(e,t){
  //   addToLocalStorageArray('my_imams',t.data._id);
  //   followDep.changed();
  // },
  // 'click #unfollowimam' : function(e,t){
  //   removeFromLocalStorageArray('my_imams',t.data._id);
  //   followDep.changed();
  // }
// })

/* tab slider */

Session.setDefault('imamTemplate', 'imamProfileSurface1') //Search surface after mosque profile has Surface1 as default
Session.setDefault('menuTransition3', 'slideWindowLeft');

Template.imamProfileTabSlider.helpers({
    showImamSearchTemplate: function () {
        return Template[Session.get('imamTemplate')]; //Template for mosque profile Search Surface
    },
    imamProfileTransition: function () {
        return Session.get('menuTransition3');// Search Surface Transition for Mosque profile
    }
});

Template.imamProfileSurface2.helpers({
    events: function(imam){
        return Events.find({imams:imam});
    }
})

Template.imamProfileContainer.helpers({
    tabs: function () {
        return Session.get('imamProfileTabsState');
    },
    following: function(id){
      followDep.depend();
      return !idInLocalStorage('my_imams',id);
    }
});

Template.imamProfileContainer.events({
        'click #followimam' : function(e,t){
          addToLocalStorageArray('my_imams',t.data._id);
          followDep.changed();
        },
        'click #unfollowimam' : function(e,t){
          removeFromLocalStorageArray('my_imams',t.data._id);
          followDep.changed();
        },
        'click #backButton1': function () {
         //   Session.set('menuTransition2', 'slideWindowRight'); //Same search transition specific for Mosque profile surface view
         // Defaults to opacity
            window.history.back();
        },
        'click #surface1': function (event, tpl) {
            setMosqueProfileSearchTabs(0);
            Session.set('menuTransition3', 'slideWindowRight');
            Session.set('imamTemplate', 'imamProfileSurface1');
        },
        'click #surface2': function (event, tpl) {
            setMosqueProfileSearchTabs(1);
            Session.set('menuTransition3', 'slideWindowLeft');
            Session.set('imamTemplate', 'imamProfileSurface2');
            // if(tabs[0]['status']=='activetab'){
            //     setMosqueProfileSearchTabs(1);
            //     Session.set('menuTransition3', 'slideWindowLeft');
            //     Session.set('imamTemplate', 'imamProfileSurface2');
            // } else {
            //     setMosqueProfileSearchTabs(1);
            //     Session.set('menuTransition3', 'slideWindowRight');
            //     Session.set('imamTemplate', 'imamProfileSurface2');
            // }
        }
        // 'click #surface3': function (event, tpl) {
        //     setMosqueProfileSearchTabs(2);
        //     Session.set('menuTransition3', 'slideWindowLeft');
        //     Session.set('imamTemplate', 'imamProfileSurface3');
        // }
});

var setMosqueProfileSearchTabs = function (id) {
    switch (id) {
        case 0:
            tabs[0]['status'] = 'activetab';
            tabs[1]['status'] = '';
            // tabs[2]['status'] = '';
            Session.set('imamProfileTabsState', tabs);
            break;
        case 1:
            tabs[0]['status'] = '';
            tabs[1]['status'] = 'activetab';
            // tabs[2]['status'] = '';
            Session.set('imamProfileTabsState', tabs);
            break;
        // case 2:
        //     tabs[0]['status'] = '';
        //     tabs[1]['status'] = '';
        //     tabs[2]['status'] = 'activetab';
        //     Session.set('imamProfileTabsState', tabs);
        //     break;
    }
};

var tabs = [
    // {status: '', id: 'surface1' , text: 'Feed', imgId: 'feed'},
    {status: 'activetab', id: 'surface1' , text: 'About', imgId: 'about'},
    {status: '', id: 'surface2', text: 'Events', imgId: 'events'}
];

Session.setDefault('imamProfileTabsState', tabs);


/*****************************************************************************/
/* Imam: Lifecycle Hooks */
/*****************************************************************************/
Template.Imam.created = function () {
    //console.log(this);
    Meteor.subscribe('imam_events',this.data.imam._id);
};

Template.Imam.rendered = function () {
};

Template.Imam.destroyed = function () {
};