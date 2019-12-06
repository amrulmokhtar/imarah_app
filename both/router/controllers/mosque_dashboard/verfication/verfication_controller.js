this.AccountControllerverification = RouteController.extend({
	template: "MosqueDashboard",
	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},
	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},
	action: function() {
		this.render();
		/*ACTION_FUNCTION*/
	},
	waitOn: function() {
		   Accounts.verifyEmail(this.params.token, function () {
             // alert(this.params.token);
               // cansole.log(this.params.token);
            if (!Meteor.user()){
               Router.go('/');
              pause();
            } else{
              Router.go("mosque_dashboard.verified", {});
            }
        });
		/*WAIT_FUNCTION*/
	},
	data: function() {		
		return this.render('verified');
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});

