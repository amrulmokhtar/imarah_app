/*****************************************************************************/
/* Mosqueprofilesearch: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Mosqueprofilesearch.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Mosqueprofilesearch.helpers({
      size4: function () {
        var width = window.innerWidth,
        height = window.innerHeight;
        return [width, height];
      },
      size1: function () {
        var width = window.innerWidth;
        return [width, 160];
      }
});

Session.setDefault('mosqueTemplate', 'mosqueProfileSearchSurface1') //Search surface after mosque profile has Surface1 as default
Session.setDefault('menuTransition3', 'slideWindowLeft');

Template.donateTemplate.events({
    /*'click #donateBtn': function () {
        Router.goToPage('donate')
    }*/
});

Template.mosqueProfileSlider.helpers({
        mosqueTemplate: function () {
            console.log(this)
            return Session.get('mosqueTemplate');
        },
        showMosqueSearchTemplate: function () {
            console.log(this);
            return Template[Session.get('mosqueTemplate')]; //Template for mosque profile Search Surface
        },
        mosqueProfileTransition: function () {
            return Session.get('menuTransition3');// Search Surface Transition for Mosque profile
        }
});

Template.mosqueProfileSearchHeader.helpers({
    tabs: function () {
        return Session.get('mosqueProfileTabsState');
    }
});

Template.mosqueProfileSearchHeader.events({
        'click #backButton1': function () {
         //   Session.set('menuTransition2', 'slideWindowRight'); //Same search transition specific for Mosque profile surface view
         // Defaults to opacity
            window.history.back();
        },
        'click #surface2': function (event, tpl) {
            setMosqueProfileSearchTabs(1);
            Session.set('menuTransition3', 'slideWindowLeft');
            Session.set('mosqueTemplate', 'mosqueProfileSearchSurface2');
        },
        'click #surface1': function (event, tpl) {
            setMosqueProfileSearchTabs(0);
            Session.set('menuTransition3', 'slideWindowRight');
            Session.set('mosqueTemplate', 'mosqueProfileSearchSurface1');
        }
});

var setMosqueProfileSearchTabs = function (id) {
    switch (id) {
        case 0:
                tabs[0]['status'] = 'active1';
                tabs[1]['status'] = '';
                Session.set('mosqueProfileTabsState', tabs);
                break;
        case 1:
                tabs[0]['status'] = '';
                tabs[1]['status'] = 'active1';
                Session.set('mosqueProfileTabsState', tabs);
                break;
    }
};

var tabs = [
    {status: 'active1', id: 'surface1' , text: 'DETAILS', imgId: 'about'},
    {status: '', id: 'surface2' , text: 'EVENTS', imgId: 'events'},
];

Session.setDefault('mosqueProfileTabsState', tabs);

/*****************************************************************************/
/* Mosqueprofilesearch: Lifecycle Hooks */
/*****************************************************************************/
Template.Mosqueprofilesearch.created = function () {
};

Template.Mosqueprofilesearch.rendered = function () {
};

Template.Mosqueprofilesearch.destroyed = function () {
};
