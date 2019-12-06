var pictures = new ReactiveDict;


Template.AdminDashboardAdminImamsAdminNewImam.rendered = function() {
    pictures.set('pictures',[{id:1,value:""}]);
};

Template.AdminDashboardAdminImamsAdminNewImam.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }
});

Template.AdminDashboardAdminImamsAdminNewImam.helpers({

});

Template.AdminDashboardAdminImamsAdminNewImamImamForm.rendered = function() {

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

Template.AdminDashboardAdminImamsAdminNewImamImamForm.events({
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
                var files = t.findAll('input[type="file"]');

                var reader = new FileReader();
                reader.onload = function(e) {
                    // Add it to your model
                    values.picture.push(e.target.result);
                    if(values.picture.length == files.length){
                        newId = Imams.insert(values);

                        Router.go("admin_dashboard.admin_imams", {});
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
        Router.go("admin_dashboard.admin_imams", {});
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

Template.AdminDashboardAdminImamsAdminNewImamImamForm.helpers({
    "pictureslots": function() {
        return pictures.get('pictures');//[{id:1}];
    }
});
