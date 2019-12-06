Template.ImamDashboardImamEventManagementImamNewEvent.rendered = function() {
	
};

Template.ImamDashboardImamEventManagementImamNewEvent.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.ImamDashboardImamEventManagementImamNewEvent.helpers({

});

Template.ImamDashboardImamEventManagementImamNewEventEventForm.rendered = function() {
	
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
};

Template.ImamDashboardImamEventManagementImamNewEventEventForm.events({
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
				

				newId = Events.insert(values);

				Router.go("imam_dashboard.imam_event_management", {});
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();
		Router.go("imam_dashboard.imam_event_management", {});
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

Template.ImamDashboardImamEventManagementImamNewEventEventForm.helpers({
});
