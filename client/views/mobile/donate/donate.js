/*****************************************************************************/
/* Donate: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Donate.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Donate.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

Template.donateHeader.events({
  'click #backButton1': function () {
      window.history.back();   
  },
  'click #godonate': function (e,t) {
      var mosque = t.data.mosque;
      validateForm(
          $('#donateform'),
          function(){},
          function(er){},
          function(values){
              //console.log(values);
              MosqueFinances.insert({
                  mosque_id:mosque._id,
                  amount:parseFloat(values.donationamount),
                  type:'income',
                  category:'donation',
                  date:new Date(),
                  description: 'Donation from ' +Meteor.user().profile.name
              });
          }
      );
    Router.go('donatethanks',{mosqueId: mosque._id});
  }
});

//Set values here


Template.donateToSurface.rendered = function(){

}

Template.donateToSurface.helpers({

});

Template.donateSurface.rendered = function () {
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

  //Set default value
};

/*****************************************************************************/
/* Donate: Lifecycle Hooks */
/*****************************************************************************/
Template.Donate.created = function () {
};

Template.Donate.rendered = function () {
};

Template.Donate.destroyed = function () {
};