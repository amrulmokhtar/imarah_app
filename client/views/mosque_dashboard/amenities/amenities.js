Template.mosqueamenities.rendered=function(){
    $('.top_title').html('Amenities');
    $('#page_title').html('Amenities');

};

Session.setDefault('booking_status','approved');
Session.setDefault('currentBookingId','');

Template.amenityBookingRow.events({
    'click #approveBooking': function(e,t){
        Session.set('currentBookingId',t.data._id);
        Session.set('booking_status','approved');
    },
    'click #rejectBooking': function(e,t){
        Session.set('currentBookingId',t.data._id);
        Session.set('booking_status','rejected');
    }
});

Template.manageBookings.helpers({
    new_bookings:function(){
        return AmenityBookings.find({status:'new'});
    },
    approved_bookings:function(){
        return AmenityBookings.find({status:'approved'});
    },
    disapproved_bookings:function(){
        return AmenityBookings.find({status:'disapproved'});
    }
});

Template.requestModal.events({
    'click #disapprove_button':function(e,t){
        validateForm(
            $('#pop-income'),
            function(fieldName, fieldValue) {
            },
            function(msg) {
            },
            function(values) {
                var currentBooking = AmenityBookings.findOne({_id:Session.get('currentBookingId')});
                currentBooking = _.extend(currentBooking,values);
                currentBooking.status = 'disapproved';
                console.log(currentBooking);
                AmenityBookings.update(currentBooking._id,{$set:currentBooking});
            }
        )
    },
    'click #approve_button': function(e,t){
        validateForm(
            $('#pop-income'),
            function(fieldName, fieldValue) {
            },
            function(msg) {
            },
            function(values) {
                var currentBooking = AmenityBookings.findOne({_id:Session.get('currentBookingId')});
                currentBooking = _.extend(currentBooking,values);
                currentBooking.status = 'approved';
                console.log(currentBooking);
                AmenityBookings.update(currentBooking._id,{$set:currentBooking});
            }
        )
    }
});

Template.requestModal.helpers({
    request:function(){
        return AmenityBookings.findOne({_id:Session.get('currentBookingId')});
    },
    active:function(in_status){
        var status = Session.get('booking_status');
        if(status==in_status){
            return 'active'
        }
    }
});

Template.amenityModal.helpers({
    am:function(){
        return ServiceAmenities.findOne({_id:Session.get('editingModal')});
    },
    checked:function(ischecked){
        if(ischecked){
            return 'checked';
        }
    }
});

Template.amenityModal.events({
    'click #add':function(e,t){

        validateForm(
            $('#amenity_form'),
            function(fieldName, fieldValue) {
            },
            function(msg) {
            },
            function(values) {

                if(Session.get('editingModal')){
                    console.log('editing');
                    ServiceAmenities.update({_id:Session.get('editingModal')},{$set:values},
                        { validationContext: "updateForm" }, function(error, result){
                        if(error){
                            alert(error);
                        }else{
                            Session.set('editingModal','');
                            $('#addAmenityModal').modal('hide');
                        }
                    });

                }else{
                    values.mosque_id = Mosques.findOne()._id;
                    ServiceAmenities.insert(values, { validationContext: "insertForm" }, function(error, result){
                        if(error){
                            alert(error);
                        }else{
                            $('#addAmenityModal').modal('hide');
                        }
                    });

                    //console.log($('#addAmenityModal'));
                    //console.log('adding')
                }
            }
        )
    }
});

Template.amenityBookingRow.helpers({
    dateformat: function(date) {
        return moment(date).format('D MMM YYYY');
    },
    timeformat: function(time) {
        return moment(time).format('hh:mm A');
    }
});

AutoForm.hooks({
    insertAmenitiesForm: {
        before: {
            insert: function(doc, template) {
                doc.mosque_id = Mosques.findOne()._id;
                //console.log(doc);
                //ServiceAmenities.insert(doc);
                return doc;
                //return doc; (synchronous)
                //return false; (synchronous, cancel)
                //this.result(doc); (asynchronous)
                //this.result(false); (asynchronous, cancel)
            }
        }
    }
});
