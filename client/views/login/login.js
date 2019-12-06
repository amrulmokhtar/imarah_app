var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");

Template.LoginForm.rendered = function() {

	$("input[autofocus]").focus();
};

Template.LoginForm.created = function() {
	pageSession.set("errorMessage", "");
};

Template.LoginForm.events({
	'submit #login_form' : function(e, t) {
		e.preventDefault();

		var submit_button = $(t.find(":submit"));

		var login_email = t.find('#login_email').value.trim();
		var login_password = t.find('#login_password').value;

		// check email
		if(!isValidEmail(login_email))
		{
			pageSession.set("errorMessage", "Please enter your e-mail address.");
			t.find('#login_email').focus();
			return false;
		}

		// check password
		if(login_password == "")
		{
			pageSession.set("errorMessage", "Please enter your password.");
			t.find('#login_email').focus();
			return false;
		}

		Meteor.loginWithPassword(login_email, login_password, function(err) {
			if (err)
			{
				pageSession.set("errorMessage", err.message);
				return false;
			}
			else
				pageSession.set("errorMessage", "");
		});
		return false;
	}
});

Template.LoginForm.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	}
});
