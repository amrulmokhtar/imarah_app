/*****************************************************************************/
/* Donatethanks: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Donatethanks.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Donatethanks.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
   size1: function() {
    return [window.innerWidth, window.innerHeight];
   }
});


Template.donateThanksText.events({
  'click #backButton10': function () {
    Router.go('/');
  }
});

Template.donateThanksText.rendered = function(){
    console.log(this);
}

Template.donateThanksText.helpers({
  donateto: function () {
    return Session.get('donateto');
  }
});
/*****************************************************************************/
/* Donatethanks: Lifecycle Hooks */
/*****************************************************************************/
Template.Donatethanks.created = function () {
};

Template.Donatethanks.rendered = function () {
};

Template.Donatethanks.destroyed = function () {
};