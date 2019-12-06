/*****************************************************************************/
/* Zakat: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Zakat.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Zakat.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

Template.zakatHeader.events({
  'click #backButton1': function () {
    window.history.back();
  },
  'click #payZak': function () {
    Router.go('/zakathanks');
  }
});

Template.zakatSurface.rendered = function () {
    // ...
  /* Using helpe from Card payment input formatting libraries -
  * https://github.com/patrickocoffeyo/meteor-jquery-payment,
  * https://github.com/stripe/jquery.payment
  */
  //Card number input formatting
  $('input#cardInput').payment('formatCardNumber');
  //Card CVV/CVC Number
  $('input#cvcInput').payment('formatCardCVC');
  //Restrict expiry date and year to accept only number
  $('input#expiryInputDate').payment('restrictNumeric');
  $('input#expiryInputYear').payment('restrictNumeric');
};

/*****************************************************************************/
/* Zakat: Lifecycle Hooks */
/*****************************************************************************/
Template.Zakat.created = function () {
};

Template.Zakat.rendered = function () {
};

Template.Zakat.destroyed = function () {
};