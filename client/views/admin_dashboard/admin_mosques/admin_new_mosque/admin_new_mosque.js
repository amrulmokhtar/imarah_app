Template.AdminDashboardAdminMosquesAdminNewMosque.rendered = function() {
$('.top_title').html('New Mosque');
};

Template.AdminDashboardAdminMosquesAdminNewMosque.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }
});

Template.AdminDashboardAdminMosquesAdminNewMosque.helpers({

});

Template.AdminDashboardAdminMosquesAdminNewMosqueMosqueForm.rendered = function() {

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

var pictures = new ReactiveDict;
pictures.set('pictures',[{id:1,value:""}]);

Template.AdminDashboardAdminMosquesAdminNewMosqueMosqueForm.events({
    "click #add_picture": function(e,t){
        e.preventDefault();
        var pics = pictures.get('pictures');
        pics.push({id:pics.length+1});
        pictures.set('pictures',pics);
    },
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
                values.picture = [];
                values.location = Location.get('geojson');
                values.longitude = undefined;
                values.latitude = undefined;
                var files = t.findAll('input[type="file"]');


                var reader = new FileReader();
                reader.onload = function(e) {
                    // Add it to your model
                    values.picture.push(e.target.result);
                    if(values.picture.length == files.length){
                        //alert('ok');
                        var user = {
                            profile: {
                                name: values.name,
                                manager:Meteor.userId(),
                            }
                        };
                        var pass = makeid();
                        var email = values.email;

                        Meteor.call("mosquereg", user, email, pass, //add new user
                                    function(error, response){
                                        if (error){
                                            alert(error);
                                        }else{
                                            //alert(response);
                          newId = Mosques.insert(values);
                          Router.go("admin_dashboard.admin_mosques", {});
                     }
            });                       


                      
                    }else{
                        reader.readAsDataURL(
                            files[values.picture.length].files[0]);
                    }
                }
                reader.readAsDataURL(files[0].files[0])
            }
        );

        return false;
    },
    "click #form-cancel-button": function(e, t) {
        e.preventDefault();
        Router.go("admin_dashboard.admin_mosques", {});
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

Template.AdminDashboardAdminMosquesAdminNewMosqueMosqueForm.helpers({
    longitude: function(){
        return Location.get('current').lng;
    },
    latitude: function(){
        return Location.get('current').lat;
    },
    "pictureslots": function() {
        return pictures.get('pictures');//[{id:1}];
    }
});
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

}
