Template.AdminDashboardAdminMosquesAdminEditMosque.rendered = function() {	
};

Template.AdminDashboardAdminMosquesAdminEditMosque.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.AdminDashboardAdminMosquesAdminEditMosque.helpers({

});

Template.AdminDashboardAdminMosquesAdminEditMosqueMosqueEditForm.rendered = function() {
	
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

Template.AdminDashboardAdminMosquesAdminEditMosqueMosqueEditForm.events({
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
				

				Mosques.update({ _id: t.data.admin_edit_mosque._id }, { $set: values });

				Router.go("admin_dashboard.admin_mosques", {});
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_dashboard.admin_mosques", {});
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

Template.AdminDashboardAdminMosquesAdminEditMosqueMosqueEditForm.helpers({
});
