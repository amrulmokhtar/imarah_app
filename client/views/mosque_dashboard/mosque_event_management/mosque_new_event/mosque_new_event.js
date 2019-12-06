Template.MosqueDashboardMosqueEventManagementMosqueNewEvent.rendered = function() {

};

Template.MosqueDashboardMosqueEventManagementMosqueNewEvent.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }
});

Template.MosqueDashboardMosqueEventManagementMosqueNewEvent.helpers({

});

Template.MosqueDashboardMosqueEventManagementMosqueNewEventEventForm.rendered = function() {

    $(".input-group.date").each(function() {
        var format = $(this).find("input[type='text']").attr("data-format").toLowerCase() || "mm/dd/yyyy";

        $(this).datepicker({
            autoclose: true,
            todayHighlight: true,
            todayBtn: true,
            forceParse: false,
            keyboardNavigation: false,
            format: format
        });
    });

    $("input[autofocus]").focus();
};

Template.MosqueDashboardMosqueEventManagementMosqueNewEventEventForm.events({
    "submit": function(e, t) {
        e.preventDefault();

        var self = this;
        //TODO: Implement image uploading
        validateForm(
            $(e.target),
            function(fieldName, fieldValue) {

            },
            function(msg) {

            },
            function(values) {
                values.location = Location.get('geojson');
                values.longitude = undefined;
                values.latitude = undefined;
                newId = Events.insert(values);

                Router.go("mosque_dashboard_noid",
                          {});
            }
        );

        return false;
    },
    "click #form-cancel-button": function(e, t) {
        e.preventDefault();
        Router.go("mosque_dashboard.mosque_event_management", {});
    },
    "click #form-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    },
    "click #form-back-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }
});

Template.MosqueDashboardMosqueEventManagementMosqueNewEventEventForm.helpers({
    longitude: function(){
        return Location.get('current').lng;
    },
    latitude: function(){
        return Location.get('current').lat;
    }
});
