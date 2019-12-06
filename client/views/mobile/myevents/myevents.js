/*****************************************************************************/
/* Myevents: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Myevents.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Myevents.helpers({
    size4: function () {
      var width = window.innerWidth,
      height = window.innerHeight;
      return [width, height];
    }
});

Template.myEventsContainerHeader.events({
    'touchstart #backButton1': function (evt) {
        globalmenuToggle();
        evt.preventDefault();
    },
  'click #backButton1': function () {
    globalmenuToggle();
  }
});

Template.myEventCards.created = function(){

}

/*****************************************************************************/
/* Myevents: Lifecycle Hooks */
/*****************************************************************************/
Template.Myevents.created = function () {

};

Template.Myevents.rendered = function () {
};

Template.Myevents.destroyed = function () {
};