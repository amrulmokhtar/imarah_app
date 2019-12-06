Template.Mosque_add_events.rendered=function(){
    $('.checkbox_sel').hide();
    $('.top_title').html('New Events');
    $('#page_title').html('New Events');

    Meteor.subscribe('event_imams');
    var dpick = new Pikaday({
        field: $('#date')[0],
        defaultDate: moment(Session.get('passeddate')).format('YYYY-MM-DD')
    });

    $('#time').datetimepicker({pickTime:true, pickDate:false})

    $('input[autofocus]').focus();


    $('#checkbox').change(function(){
        if (this.checked) {
            $('.checkbox_sel').fadeIn('slow');
        }
        else {
            $('.checkbox_sel').fadeOut('slow');
        }
    });
};

Template.Mosque_add_events.helpers({
   thismosque: function(){
       return Mosques.findOne({managers: Meteor.userId()})
   },
    event_imams: function(){
        return Imams.find({},{sort:{first_name:1}});
    }
});



Template.Mosque_add_events.events({
    'click #cancel_event': function(e, t) {
        Router.go('mosque_dashboard.events', {});
    },
    'change #otherimamcheck':function(e,t){
        console.log('changine');
        var input =$('#otherimaminput');
        if(input.attr('readonly')){
            input.removeAttr('readonly');
        }else{
            input.attr('readonly',true);
        }

    },
    'change #prayertime_select':function(e,t){
        var time = $('#prayertime_select').val();

        var mcords = Mosques.findOne({managers: Meteor.userId()}).location.geometry.coordinates;
        var times = prayTimes.getTimes(moment($('#date').val())._d,
            [mcords[1],mcords[0]]);
        var ptime = moment(times[time],'HH:mm').format('hh:mm A');

        $('#time').val(ptime);
    },
    'change #pictureupload': function(e, t) {
        var picture = '';
        var reader = new FileReader();
        reader.onload = function(e) {
            picture = e.target.result;
            $(t.find('#picturecont')).attr('src', picture);
        };


        if ($(e.target)[0].files[0]) {
            reader.readAsDataURL($(e.target)[0].files[0]);
        }
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
                var thismosque = Mosques.findOne({managers: Meteor.userId()});
                var files = t.findAll('input[type="file"]');

                values.location = thismosque.location; //Location.get('geojson');
                delete(values.longitude);
                delete(values.latitude);
                var userrole=Meteor.user().roles ;
                if(userrole=='admin'){
                    manager=Meteor.userId();
                }
                else{
                    manager=Meteor.user().profile.manager;
                }
                values['manager']=manager;
                values['mosque_id']= thismosque._id;
                values.mosque_name = thismosque.name;
                values.city = thismosque.city;
                values.city_name = thismosque.city_name;
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

                var reader = new FileReader();
                reader.onload = function(e) {
                    // Add it to your model
                    values.picture.push(e.target.result);
                    if (values.picture.length == files.length) {
                        newId = Events.insert(values);
                        $('#cancel_event').click();
                        Router.go('mosque_dashboard.events', {});
                    } else {
                        reader.readAsDataURL(
                            files[values.picture.length].files[0]);
                    }
                };

                if (files[0].files[0]) {
                    reader.readAsDataURL(files[0].files[0]);
                } else {
                    newId = Events.insert(values);
                    $('#cancel_event').click();
                    Router.go('mosque_dashboard.events', {});
                };
            }
        );

        return false;
    }
});
