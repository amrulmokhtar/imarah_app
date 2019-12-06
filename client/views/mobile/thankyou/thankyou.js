/*****************************************************************************/
/* Thankyou: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Thankyou.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Thankyou.helpers({
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

Template.thankYouCross.events({
  'click #backButton10': function () {
    Router.go('/');    
  }
});

Template.thankYouText.events({
  'click #backButton10': function () {
    Router.go('/');        
  }
});

/*****************************************************************************/
/* Thankyou: Lifecycle Hooks */
/*****************************************************************************/
Template.Thankyou.created = function () {
};

Template.Thankyou.rendered = function () {
};

Template.Thankyou.destroyed = function () {
};