/*****************************************************************************/
/* Zakathanks: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Zakathanks.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Zakathanks.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
   size1: function () {
    return [window.innerWidth, window.innerHeight];
   }
});

//Set value here
Session.set('zakatTo', 'Pusat Zakat Selangor');

Template.zakathanksText.helpers({
  zakatTo: function () {
    return Session.get('zakatTo');
  }
});

Template.zakathanksText.events({
  'click #zakatBtn': function () {
     Router.go('/');
  }
});

/*****************************************************************************/
/* Zakathanks: Lifecycle Hooks */
/*****************************************************************************/
Template.Zakathanks.created = function () {
};

Template.Zakathanks.rendered = function () {
};

Template.Zakathanks.destroyed = function () {
};