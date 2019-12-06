Template.MosqueDashboardCommunity.rendered=function(){
    $('.top_title').html('Community');
     $('#page_title').html('Community');
};

Template.community_dashboard_content.helpers({
    nextMonth: function(){
        var thisM = new Date();
        thisM.setDate(1);
        return moment(thisM).add(1,'month')._d;
    }
})

Template.newMemberModal.events({
   'click #add_member':function(e,t) {
       validateForm(
           $('#newMemberModal'),
           function (fieldName, fieldValue) {

           },
           function (msg) {

           },
           function (values) {
               values.mosque_id = Mosques.findOne()._id;
               values.has_app = false;
               values.join_date = new Date();
               CommunityMembers.insert(values);
           });
   }
 });

Template.newMessageModal.events({
    'click #send_message':function(e,t) {
        validateForm(
            $('#newMessageModal'),
            function (fieldName, fieldValue) {

            },
            function (msg) {

            },
            function (values) {

                values.mosque_id = Mosques.findOne()._id;
                values.date = new Date();
                CommunitySMS.insert(values);
                console.log(values);
                Meteor.call('sendSMS', values.message, _.pluck(CommunityMembers.find().fetch(),'phone_number'));
            });
    }
});