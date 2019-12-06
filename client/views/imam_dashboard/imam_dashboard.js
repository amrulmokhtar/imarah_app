Template.ImamDashboard.rendered = function() {
	alert('ok');
};

Template.ImamDashboard.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.ImamDashboard.helpers({

});

Template.ImamDashboardImamMenu.rendered = function() {
	alert('ok');
};

Template.ImamDashboardImamMenu.events({

});

Template.ImamDashboardImamMenu.helpers({

});
