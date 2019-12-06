Template.CrowdSourcingContributeMosque.rendered = function() {

};

Template.CrowdSourcingContributeMosque.events({
    'click #page-close-button': function(e, t) {
        e.preventDefault();
        Router.go('', {});
    }
});

Template.CrowdSourcingContributeMosque.helpers({

});

Template.CrowdSourcingContributeMosqueCrowdMosqueAddForm.rendered = function() {

    $('.input-group.date').each(function() {
        var format = $(this).find("input[type='text']").attr('data-format').toLowerCase() || 'mm/dd/yyyy';

        $(this).datepicker({
            autoclose: true,
            todayHighlight: true,
            todayBtn: true,
            forceParse: false,
            keyboardNavigation: false,
            format: format
        });
    });

    $('input[autofocus]').focus();
};

Template.CrowdSourcingContributeMosqueCrowdMosqueAddForm.events({
    'submit': function(e, t) {
        e.preventDefault();

        var self = this;

        validateForm(
            $(e.target),
            function(fieldName, fieldValue) {

            },
            function(msg) {

            },
            function(values) {

                if (values.new_city_name) {
                    crowdCityID = CrowdCities.insert(values);
                    values.new_city_name = undefined;
                    values.city = crowdCityID;
                }
                newId = CrowdMosques.insert(values);

                Router.go('crowd_sourcing.success', {});
            }
        );

        return false;
    },
    'click #form-cancel-button': function(e, t) {
        e.preventDefault();
        Router.go('crowd_sourcing.success', {});
    },
    'click #form-close-button': function(e, t) {
        e.preventDefault();
        Router.go('', {});
    },
    'click #form-back-button': function(e, t) {
        e.preventDefault();
        Router.go('', {});
    }
});

Template.CrowdSourcingContributeMosqueCrowdMosqueAddForm.helpers({
});
