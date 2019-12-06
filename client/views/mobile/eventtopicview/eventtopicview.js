/*****************************************************************************/
/* Eventtopicview: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Eventtopicview.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.eventTopicHeader.events({
  'click #backButton1': function () {
    window.history.back();
  }
});

Template.Eventtopicview.helpers({
   size4: function () {
    var width = window.innerWidth,
    height = window.innerHeight;
    return [width, height];
  },
  size1: function () {
    var width = window.innerWidth;
    return [width, 200];
  }
});

/*****************************************************************************/
/* Eventtopicview: Lifecycle Hooks */
/*****************************************************************************/
Template.Eventtopicview.created = function () {
};

Template.Eventtopicview.rendered = function () {
};

Template.Eventtopicview.destroyed = function () {
};