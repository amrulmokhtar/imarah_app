var pageSession = new ReactiveDict();

Template.HomePublic.rendered = function() {
    //FView.startup()

};

Template.HomePublic.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }
});

Template.HomePublic.helpers({

});


Template.HomePublicEventView.rendered = function() {
    pageSession.set("HomePublicEventViewStyle", "table");

};

Template.HomePublicEventView.events({

});

Template.HomePublicEventView.helpers({

});


Template.HomePublicEventViewTable.rendered = function() {

};

Template.HomePublicEventViewTable.events({
});

Template.HomePublicEventViewTable.helpers({
    "tableItems": function() {
        //return [{name:"hi"}]
        return this.user_events;
    }
});


Template.HomePublicEventViewTableItems.rendered = function() {

};

Template.HomePublicEventViewTableItems.events({
    "click td": function(e, t) {
        e.preventDefault();
        /**/
        return false;
    }
});

Template.HomePublicEventViewTableItems.helpers({

});
