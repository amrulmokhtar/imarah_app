this.CheckinController = RouteController.extend({
    template: 'Checkin',
    yieldTemplates: {

    },
    onBeforeAction: function() {
        this.next();
    },
    action: function() {
        this.render();
    },
    waitOn: function() {
        var waits = [];
        if (this.params.eventId) {
            waits.push(Meteor.subscribe('single_event',
                                        parseID(this.params.eventId)));
        }

        if (this.params.mosqueId) {
            waits.push(Meteor.subscribe('single_mosque',
                                        parseID(this.params.mosqueId)));
        }
        return waits;
    },
    data: function() {
        return {
            event: Events.findOne(),
            mosque: Mosques.findOne()
        };
    }
});

/*****************************************************************************/
/* Checkin: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Checkin.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.Checkin.helpers({
    /*
     * Example:
     *  items: function () {
     *    return Items.find();
     *  }
     */
});

Template.checkinContent.helpers({
    mosquename: function(id){
        Meteor.subscribe('single_mosque',id);
        return Mosques.findOne({_id:id}).name;
    }
})

Template.checkinContent.events({
    'change #checkinmessage': function(e, t){
        Session.set('checkinmessage', t.find('#checkinmessage').value)
    }
});

Template.checkinContent.rendered = function() {
    Session.set('checkinmessage', this.find('#checkinmessage').value);
}

Template.checkinHeader.events({
    'click #checkinconf': function(e, t) {
        var checkin = {};

        if (t.data.mosque) {
           checkin.mosqueId = t.data.mosque._id;
        }

        if (t.data.event) {
            checkin.eventId = t.data.event._id;
            checkin.mosqueId = t.data.event.mosque_id;
        }

        checkin.userId = Meteor.userId() || 'unregistered';
        checkin.date = new Date();
        checkin.message = Session.get('checkinmessage');

        Check_In.insert(checkin);
        window.history.back();
    },
    'click #backButton1': function () {
        window.history.back() ;
    }
});

/*****************************************************************************/
/* Checkin: Lifecycle Hooks */
/*****************************************************************************/
Template.Checkin.created = function () {

};

Template.Checkin.rendered = function () {
};

Template.Checkin.destroyed = function () {
};
