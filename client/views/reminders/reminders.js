Template.Reminders.rendered = function() {
	
};

Template.Reminders.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.Reminders.helpers({

});
