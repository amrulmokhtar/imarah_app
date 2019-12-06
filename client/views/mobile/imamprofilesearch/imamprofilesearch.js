/*****************************************************************************/
/* Imamprofilesearch: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Imamprofilesearch.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Imamprofilesearch.helpers({
  size4: function () {
        var width = window.innerWidth,
        height = window.innerHeight;
        return [width, height];
      },
  size1: function () {
        var width = window.innerWidth;
        return [width, 180];
  }
});

Session.setDefault('imamTemplate', 'imamProfileSearchSurface1');
Session.setDefault('menuTransition4', 'slideWindowLeft');

Template.imamProfileSlider.helpers({
  imamTemplate: function () {
    return Session.get('imamTemplate');
  },
  showImamSearchTemplate: function () {
    return Template[Session.get('imamTemplate')];
  },
  imamProfileTransition: function () {
    return Session.get('menuTransition4');
  }
});

Template.imamProfileSearchHeader.helpers({
  tabs: function () {
    return Session.get('imamProfileTabsState');
  },
  eventsOpen: function () {
    if (Session.get('imamTemplate') == 'imamProfileSearchSurface2') {
      return true;
    } else {
      return false;
    }
  }
});

Template.imamProfileSearchHeader.events({
        'click #surface2': function (event, tpl) {
            setImamProfileSearchTabs(1);
            Session.set('menuTransition4', 'slideWindowLeft');
            Session.set('imamTemplate', 'imamProfileSearchSurface2');
        },
        'click #surface1': function (event, tpl) {
            setImamProfileSearchTabs(0);
            Session.set('menuTransition4', 'slideWindowRight');
            Session.set('imamTemplate', 'imamProfileSearchSurface1');
        },
        'click #backButton1': function (event, tpl) {
          window.history.back();
        }
});

var tabs = [
    {status: 'active1', id: 'surface1' , text: 'ABOUT'},
    {status: '', id: 'surface2' , text: 'EVENTS'}
];

var setImamProfileSearchTabs = function (id) {
    switch (id) {
        case 0:
                tabs[0]['status'] = 'active1';
                tabs[1]['status'] = '';
                Session.set('imamProfileTabsState', tabs);
                break;
        case 1:
                tabs[0]['status'] = '';
                tabs[1]['status'] = 'active1';
                Session.set('imamProfileTabsState', tabs);
                break;
    }
};
  
Session.setDefault('imamProfileTabsState', tabs);

/*****************************************************************************/
/* Imamprofilesearch: Lifecycle Hooks */
/*****************************************************************************/
Template.Imamprofilesearch.created = function () {
};

Template.Imamprofilesearch.rendered = function () {
};

Template.Imamprofilesearch.destroyed = function () {
};