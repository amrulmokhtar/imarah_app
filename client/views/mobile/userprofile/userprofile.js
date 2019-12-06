/*****************************************************************************/
/* Userprofile: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Userprofile.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Userprofile.helpers({
  size1: function () {
    var width = window.innerWidth;
    return [width, 27.5];
  },
  size2: function () {
    var width = window.innerWidth;
    return [width, 320];
  },
    size4: function () {
      var width = window.innerWidth,
      height = window.innerHeight;
      return [width, height];
  },
  scrollviewopts: function(){
    return {clipSize: 10}
  }
});

Template.profileContainerHeader.events({
  'touchstart #backButton1': function (evt) {
    globalmenuToggle();
    evt.preventDefault();
  },
  'click #backButton1': function () {
      globalmenuToggle();
  }
});

/* tab slider */

Session.setDefault('userTemplate', 'userProfileSurface3') //Search surface after mosque profile has Surface1 as default
Session.setDefault('menuTransition3', 'slideWindowLeft');

Template.userProfileTabSlider.helpers({
    showUserSearchTemplate: function () {
        return Template[Session.get('userTemplate')]; //Template for mosque profile Search Surface
    },
    userProfileTransition: function () {
        return Session.get('menuTransition3');// Search Surface Transition for Mosque profile
    }
});

Template.userProfileContainer.helpers({
    tabs: function () {
        return Session.get('userProfileTabsState');
    }
});

Template.userProfileContainer.events({
        'click #backButton1': function () {
         //   Session.set('menuTransition2', 'slideWindowRight'); //Same search transition specific for Mosque profile surface view
         // Defaults to opacity
            window.history.back();
        },
        'click #surface1': function (event, tpl) {
            setMosqueProfileSearchTabs(0);
            Session.set('menuTransition3', 'slideWindowRight');
            Session.set('userTemplate', 'userProfileSurface1');
        },
        'click #surface2': function (event, tpl) {
            if(tabs[0]['status']=='activetab'){
                setMosqueProfileSearchTabs(1);
                Session.set('menuTransition3', 'slideWindowLeft');
                Session.set('userTemplate', 'userProfileSurface2');
            } else {
                setMosqueProfileSearchTabs(1);
                Session.set('menuTransition3', 'slideWindowRight');
                Session.set('userTemplate', 'userProfileSurface2');
            }
        },
        'click #surface3': function (event, tpl) {
            setMosqueProfileSearchTabs(2);
            Session.set('menuTransition3', 'slideWindowLeft');
            Session.set('userTemplate', 'userProfileSurface3');
        }
});

var setMosqueProfileSearchTabs = function (id) {
    switch (id) {
        case 0:
            tabs[0]['status'] = 'activetab';
            tabs[1]['status'] = '';
            tabs[2]['status'] = '';
            Session.set('userProfileTabsState', tabs);
            break;
        case 1:
            tabs[0]['status'] = '';
            tabs[1]['status'] = 'activetab';
            tabs[2]['status'] = '';
            Session.set('userProfileTabsState', tabs);
            break;
        case 2:
            tabs[0]['status'] = '';
            tabs[1]['status'] = '';
            tabs[2]['status'] = 'activetab';
            Session.set('userProfileTabsState', tabs);
            break;
    }
};

var tabs = [
    // {status: '', id: 'surface1' , text: 'Feed', imgId: 'feed'},
    // {status: '', id: 'surface2' , text: 'Badges', imgId: 'badges'},
    {status: 'activetab', id: 'surface3', text: 'Amenities', imgId: 'amenities'}
];

Session.setDefault('userProfileTabsState', tabs);

/*****************************************************************************/
/* Userprofile: Lifecycle Hooks */
/*****************************************************************************/
Template.Userprofile.created = function () {
};

Template.Userprofile.rendered = function () {
};

Template.Userprofile.destroyed = function () {
};