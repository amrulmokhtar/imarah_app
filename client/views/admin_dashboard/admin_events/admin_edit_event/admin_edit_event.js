Template.AdminDashboardAdminEventsAdminEditEvent.rendered = function() {

};

Template.AdminDashboardAdminEventsAdminEditEvent.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }
});

Template.AdminDashboardAdminEventsAdminEditEvent.helpers({

});

Template.AdminDashboardAdminEventsAdminEditEventEventEditForm.rendered = function() {

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

Template.AdminDashboardAdminEventsAdminEditEventEventEditForm.events({
    "submit": function(e, t) {
        e.preventDefault();

        var self = this;

        validateForm(
            $(e.target),
            function(fieldName, fieldValue) {

            },
            function(msg) {

            },
            function(values) {


                Events.update({ _id: t.data.edit_event._id }, { $set: values });

                Router.go("admin_dashboard.admin_events", {});
            }
        );

        return false;
    },
    "click #form-cancel-button": function(e, t) {
        e.preventDefault();
        Router.go("admin_dashboard.admin_events", {});
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

Template.AdminDashboardAdminEventsAdminEditEventEventEditForm.helpers({
});
