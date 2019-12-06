Template.ImamDashboardImamProfileImamProfileUpdate.rendered = function() {
	
};

Template.ImamDashboardImamProfileImamProfileUpdate.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.ImamDashboardImamProfileImamProfileUpdate.helpers({

});

Template.ImamDashboardImamProfileImamProfileUpdateImamProfileForm.rendered = function() {
	
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

Template.ImamDashboardImamProfileImamProfileUpdateImamProfileForm.events({
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
				

				Imams.update({ _id: t.data.update_imam._id }, { $set: values });

				Router.go("imam_dashboard.imam_profile", {});
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();
		Router.go("imam_dashboard.imam_profile", {});
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

Template.ImamDashboardImamProfileImamProfileUpdateImamProfileForm.helpers({
});
