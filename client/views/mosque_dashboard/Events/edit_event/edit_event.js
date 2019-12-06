Template.Mosque_edit_events.created = function() {
    Meteor.subscribe('event_imams');
}

Template.Mosque_edit_events.rendered = function() {

};

Template.Mosque_edit_events.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }
});

Template.Mosque_edit_events.helpers({

});

Template.editeventForm.rendered = function() {
    $('.checkbox_sel').hide();
    var dpick = new Pikaday({field: $('#date')[0]});
    $('#time').datetimepicker({
        pickDate:false,
        pickTime:true
    });
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
    $('#checkbox').change(function(){
        if (this.checked) {
            $('.checkbox_sel').fadeIn('slow');
        }
        else {
            $('.checkbox_sel').fadeOut('slow');
        }
    });
};

Template.editeventForm.events({
    "click #cancel_event":function(){
        Router.go("mosque_dashboard.events");
    },
    'change #prayertime_select':function(e,t){
        var time = $('#prayertime_select').val();

        var mcords = Mosques.findOne({managers: Meteor.userId()}).location.geometry.coordinates;
        var times = prayTimes.getTimes(moment($('#date').val())._d,
            [mcords[1],mcords[0]]);
        var ptime = moment(times[time],'HH:mm').format('hh:mm A');

        $('#time').val(ptime);
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
                values.time = moment(t.find('#time').value,'hh:mm A')._d;
                var imam = Imams.findOne({_id:parseID(values.imams)});
                if(imam){
                    values.imam_names = [imam.title + ' ' + imam.first_name + ' ' + (imam.last_name||'')];
                    values.imams = [parseID(values.imams)];
                }else{
                    values.imam_names = ['None'];
                }
                if(values.customImam){
                    values.imam_names = [values.customImam];
                }
                //Set time according to prayer time if not using a custom time
                if(!values.time){
                    var times = prayTimes.getTimes(values.date,
                        [values.location.geometry.coordinates[1], values.location.geometry.coordinates[0]]);
                    values.time = moment(times[values.prayer])._d;

                }
                Events.update({ _id: t.data.mosque_edit_event._id }, { $set: values });
                Router.go("mosque_dashboard.events");
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

Template.editeventForm.helpers({
    event_imams: function(){
      return Imams.find({},{sort:{first_name:1}});
    },
    compareObjId: function(id1, id2){
        if(parseID(id1)._str==parseID(id2)._str){
            return 'selected';
        }
    },
    selectedimam: function(idArray, id2){
        //console.log(idArray,id2);
        if(_.contains(idArray,parseID(id2))){
            console.log('found')
            return 'selected';
        }
        if(idArray.length >0 && idArray[0]._str == parseID(id2)._str){
            console.log('found')
            return 'selected';
        }
    },
    timeformat: function(time) {
        return moment(time).format('hh:mm A');
    },
    format: function(date){
        return moment(date).format('YYYY-MM-DD');
    }
});
