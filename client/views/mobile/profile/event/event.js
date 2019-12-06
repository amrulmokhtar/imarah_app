/*****************************************************************************/
/* Event: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Event.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Event.helpers({
  size4: function () {
    var width = window.innerWidth,
    height = window.innerHeight;
    return [width, height];
  },
  size1: function () {
    var width = window.innerWidth;
    return [width, 27.5];
  },
  size2: function () {
    var width = window.innerWidth;
    return [width, 320];
  }
});

Template.eventViewContains.helpers({
  btns: function () {
    return Session.get('btnTabs');
  },
  dateFormat: function(date, time) {
      date = moment(date).add(time, 's');
      return date.format('dddd, MMMM Do YYYY, h:mm A');
  }
});

Template.contactTemplate.helpers({
    mosquedetails: function(id){
        return Mosques.findOne({_id:id});
    }
})

Template.imamTemplate.helpers({
    imamdetails: function(id){
        return Imams.findOne({_id:id});
    }
})


Template.eventViewContains.events({
  'click #rsvpClick': function (e,t) {
      //console.log(t.data);
      AntiModals.overlay('rsvpModal', { // Opening modal on RSVP Button click
         modal: true,
         data: t.data
    });
  }
});

Template.eventProfileContainer.events({
  'click #imamCard': function () {
    Session.set('menuTransition2', 'slideWindow');
  }
});

Template.eventViewHeader.events({
  'click #backButton1': function () {
    window.history.back();
  }
});

Template.reportTemplate.events({
    'click #rate_event': function(e,t){

        Session.set('eventName',t.data.name);
        Session.set('eventAt',t.data.mosque_name);
        if(t.data.imam_names){
            Session.set('eventBy',t.data.imam_names[0]);
        }else{
            Session.set('eventBy','No Imam');
        }


        Session.set('rating_event_id',t.data._id);
        Session.set('rating_mosque_id',t.data.mosque_id);
        if(t.data.imams){
            Session.set('rating_imam_id',t.data.imams[0]);
        }

        Router.go('notification');
    }
});

var buttons = [{'btnName': 'RSVP'}];
Session.setDefault('btnTabs', buttons);
/*****************************************************************************/
/* Event: Lifecycle Hooks */
/*****************************************************************************/
Template.Event.created = function () {
};

Template.Event.rendered = function () {
};

Template.Event.destroyed = function () {

};
