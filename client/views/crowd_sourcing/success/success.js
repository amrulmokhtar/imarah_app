Template.CrowdSourcingSuccess.rendered = function() {
	
};

Template.CrowdSourcingSuccess.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.CrowdSourcingSuccess.helpers({

});
