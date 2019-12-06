Template.AdminDashboardCitiesNewCity.rendered = function() {

};

Template.AdminDashboardCitiesNewCity.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }
});

Template.AdminDashboardCitiesNewCity.helpers({

});

Template.AdminDashboardCitiesNewCityCityForm.rendered = function() {

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

Template.AdminDashboardCitiesNewCityCityForm.events({
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

                values.location = Location.get('geojson');
                values.longitude = undefined;
                values.latitude = undefined;
                newId = Cities.insert(values);

                Router.go("admin_dashboard.cities", {});
            }
        );

        return false;
    },
    "click #form-cancel-button": function(e, t) {
        e.preventDefault();
        Router.go("admin_dashboard.cities", {});
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

Template.AdminDashboardCitiesNewCityCityForm.helpers({
    longitude: function(){
        return Location.get('current').lng;
    },
    latitude: function(){
        return Location.get('current').lat;
    }
});
