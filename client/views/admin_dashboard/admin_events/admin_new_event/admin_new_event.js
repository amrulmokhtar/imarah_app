Template.AdminDashboardAdminEventsAdminNewEvent.rendered = function() {
$('.top_title').html('New Events');
};

Template.AdminDashboardAdminEventsAdminNewEvent.events({
    'click #page-close-button': function(e, t) {
        e.preventDefault();
        Router.go('', {});
    }
});

Template.AdminDashboardAdminEventsAdminNewEvent.helpers({

});

Template.AdminDashboardAdminEventsAdminNewEventEventForm.rendered = function() {
    $('#time').timepicker();
    var dpick = new Pikaday({field: $('#date')[0], format: 'D/MM/YYYY'});
    /*$('.input-group.date').each(function() {
        var format = $(this).find("input[type='text']").attr('data-format').toLowerCase() || 'mm/dd/yyyy';

        $(this).datepicker({
            autoclose: true,
            todayHighlight: true,
            todayBtn: true,
            forceParse: false,
            keyboardNavigation: false,
            format: format
        });
    });*/

    $('input[autofocus]').focus();
};
var pictures = new ReactiveDict;
pictures.set('pictures', [{id: 1, value: ''}]);

Template.AdminDashboardAdminEventsAdminNewEventEventForm.events({
    'click #add_picture': function(e, t) {
        e.preventDefault();
        var pics = pictures.get('pictures');
        pics.push({id: pics.length + 1});
        pictures.set('pictures', pics);
    },
    'change #mosque_select': function(e, t) {
        var newValue = $(e.target).val();


        initArg = newValue.split('(');
        var mos;
        if (initArg.length > 1){

            if (initArg[0] == "ObjectID" ){
                newValue = eval("new Meteor.Collection." + newValue);
            }
        }

        Mosques.find({_id: newValue}).forEach(function(mosque) {
            var cl = mosque.location.geometry.coordinates;

            $("input[name=city]").val(mosque.city);
            $("input[name=postcode]").val(mosque.postcode);
            $("input[name=country]").val(mosque.country);
            $("input[name=state]").val(mosque.state);
            $("input[name=address_1]").val(mosque.address);
            $("input[name=timezone]").val(mosque.timezone);
            locationDep.changed();
            Location.set('current', {lng: cl[0], lat: cl[1]});
        });

        //console.log(
    },
    'change #city_select': function(e, t) {
        var newValue = $(e.target).val();
        Cities.find({_id: newValue}).forEach(function(city) {
            var cl = city.location.geometry.coordinates;

            locationDep.changed();
            Location.set('current', {lng: cl[0], lat: cl[1]});
        });
    },
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
                values.picture = [];
                var files = t.findAll('input[type="file"]');

                values.location = Location.get('geojson');
                values.longitude = undefined;
                values.latitude = undefined;
                var userrole=Meteor.user().roles ;
                if(userrole=='admin'){
                manager=Meteor.userId();
                }
                else{

                    manager=Meteor.user().profile.manager;
                }
                values['manager']=manager;
                var reader = new FileReader();
                reader.onload = function(e) {
                    // Add it to your model
                    values.picture.push(e.target.result);
                    if (values.picture.length == files.length) {
                        newId = Events.insert(values);

                        Router.go('admin_dashboard.admin_events', {});
                    }else {
                        reader.readAsDataURL(
                            files[values.picture.length].files[0]);
                    }
                };
                if(files[0].files[0]){
                    reader.readAsDataURL(files[0].files[0]);
                }else{
                    console.log('no picture');
                    newId = Events.insert(values);

                    Router.go('admin_dashboard.admin_events', {});
                }

            }
        );

        return false;
    },
    'click #form-cancel-button': function(e, t) {
        e.preventDefault();
        Router.go('admin_dashboard.admin_events', {});
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

Template.AdminDashboardAdminEventsAdminNewEventEventForm.helpers({
    select: function() {
        return Location.get('selected');
    },
    address: function() {
        return Location.get('selected').address;
    },
    city: function() {
        return Location.get('selected').city;
    },
    state: function() {
        return Location.get('selected').state;
    },
    country: function() {
        return Location.get('selected').country;
    },
    longitude: function() {
        return Location.get('current').lng;
    },
    latitude: function() {
        return Location.get('current').lat;
    },
    'pictureslots': function() {
        return pictures.get('pictures');
    }
});
