/*****************************************************************************/
/* Notification: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Notification.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Notification.helpers({
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

//Set Event's details
Session.set('eventName', 'Kuliah Maghrib');
Session.set('eventAt', 'Masjid Negeri Shah Alam');
Session.set('eventBy', 'Ustaz Syed Norhisyam');

Template.notificationText.helpers({
  eventName: function () {
    return Session.get('eventName');
  },
  eventAt: function () {
    return Session.get('eventAt');
  },
  eventBy: function () {
    return Session.get('eventBy');
  }
});

Template.notificationText.events({
  'click #rateBtn': function () {
    Router.go('/feedback');
  }
});

Template.notificationCross.events({
  'click #backButton10': function () {
    Router.go('newsfeed');
    //window.history.back();
  }
});

/*****************************************************************************/
/* Notification: Lifecycle Hooks */
/*****************************************************************************/
Template.Notification.created = function () {
  Session.set('page','event');
};

Template.Notification.rendered = function () {
};

Template.Notification.destroyed = function () {
};