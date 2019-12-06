Template.verificaltionpass.rendered = function() {

};

Template.verficaltion.events({
    'submit #verfication': function(e){
    	e.preventDefault();
    	var userid=Meteor.userId();
    	alert(userid);
    	var newPassword=$('#password').val();
    	alert(newPassword);
         if (newPassword.length < 6) {
            $('.alert').html('Your password should be 6 characters or longer.');
         }else{
    	 Meteor.call("changeMyPassword", userid,newPassword, //add new user
                 function(error, response){
                   if (error){
                        alert(error);
                     }else{
                         Router.go("mosque_dashboard_noid", {});
                     }
            });                  
        }
    }
});