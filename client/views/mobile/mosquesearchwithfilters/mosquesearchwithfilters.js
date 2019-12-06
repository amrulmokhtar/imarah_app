/*****************************************************************************/
/* Mosquesearchwithfilters: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Mosquesearchwithfilters.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Mosquesearchwithfilters.helpers({
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

/*****************************************************************************/
/* Mosquesearchwithfilters: Lifecycle Hooks */
/*****************************************************************************/
Template.Mosquesearchwithfilters.created = function () {
};

Template.Mosquesearchwithfilters.rendered = function () {
};

Template.Mosquesearchwithfilters.destroyed = function () {
};