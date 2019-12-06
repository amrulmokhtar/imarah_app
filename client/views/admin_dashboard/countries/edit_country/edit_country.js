Template.AdminDashboardCountriesEditCountry.rendered = function() {
	
};

Template.AdminDashboardCountriesEditCountry.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.AdminDashboardCountriesEditCountry.helpers({

});

Template.AdminDashboardCountriesEditCountryCountryEditForm.rendered = function() {
	
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

Template.AdminDashboardCountriesEditCountryCountryEditForm.events({
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
				

				Countries.update({ _id: t.data.edit_country._id }, { $set: values });

				Router.go("admin_dashboard.countries", {});
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_dashboard.countries", {});
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

Template.AdminDashboardCountriesEditCountryCountryEditForm.helpers({
});
