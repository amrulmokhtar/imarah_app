/*****************************************************************************/
/* Profilesearch: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Profilesearch.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.profileSearchHeader.events({
  'click #backButton': function () {
    window.history.back();
  }
});

Template.Profilesearch.helpers({
    size4: function () {
      var width = window.innerWidth,
      height = window.innerHeight;
      return [width, height];
  }
});

Template.profileSearchBar.helpers({
  tabs: function () {
    return Session.get('tabsPosition');
  }
});

var setActive = function (id) {
  switch(id) {
    case 0: 
          tabs[0]['select'] = 'select3';
          tabs[1]['select'] = '';
          break;
    case 1:
          tabs[0]['select'] = '';
          tabs[1]['select'] = 'select3';
          break;
    }
    Session.set('tabsPosition', tabs);
};

Template.profileSearchBar.events({
  'click #mosqueButton': function () {
      Session.set('profileSearchTemplate', 'profileSearch1');
      Session.set('profileMenuTransition1', 'slideWindowRight');
      setActive(0);
  }, 
  'click #ImamButton': function () {
      Session.set('profileSearchTemplate', 'profileSearch2');
      Session.set('profileMenuTransition1', 'slideWindowLeft');
      setActive(1);
  }
});

Template.profileSearchSurface.helpers({
  profileSearchTemplate: function () {
    return Session.get('profileSearchTemplate');
  },
  profileShowTemplate1: function () {
    return Template[Session.get('profileSearchTemplate')];
  },
  profileMenuTransition1: function () {
    return Session.get('profileMenuTransition1');
  }
});

var tabs = [
  {select: 'select3', button: 'mosqueButton', text: 'Mosques', id: 'mosque' },
  {select: '', button: 'ImamButton', text: 'Imams', id: 'imam'}
];

Session.setDefault('tabsPosition', tabs);
// Set default profile Search surfaces
Session.setDefault('profileSearchTemplate', 'profileSearch1');

Session.setDefault('profileMenuTransition1', 'slideWindowLeft');
/*****************************************************************************/
/* Profilesearch: Lifecycle Hooks */
/*****************************************************************************/
Template.Profilesearch.created = function () {
};

Template.Profilesearch.rendered = function () {
};

Template.Profilesearch.destroyed = function () {
};