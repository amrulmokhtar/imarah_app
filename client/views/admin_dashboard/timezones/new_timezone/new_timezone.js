Template.AdminDashboardTimezonesNewTimezone.rendered = function() {
	
};

Template.AdminDashboardTimezonesNewTimezone.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.AdminDashboardTimezonesNewTimezone.helpers({

});

Template.AdminDashboardTimezonesNewTimezoneTimezoneForm.rendered = function() {
	
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

Template.AdminDashboardTimezonesNewTimezoneTimezoneForm.events({
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
				

				newId = Timezones.insert(values);

				Router.go("admin_dashboard.timezones", {});
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_dashboard.timezones", {});
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

Template.AdminDashboardTimezonesNewTimezoneTimezoneForm.helpers({
});
