/*****************************************************************************/
/* Cardview: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Cardview.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Cardview.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

Template.cardViewHeader.helpers({
  previousRoute: function () {
    var back = window.history.back();

    return back;
  }
});

Template.cardViewHeader.events({
  'click #backButton1': function () {
      window.history.back() ;
  } 
});

/*****************************************************************************/
/* Cardview: Lifecycle Hooks */
/*****************************************************************************/
Template.Cardview.created = function () {
};

Template.Cardview.rendered = function () {
};

Template.Cardview.destroyed = function () {
};

