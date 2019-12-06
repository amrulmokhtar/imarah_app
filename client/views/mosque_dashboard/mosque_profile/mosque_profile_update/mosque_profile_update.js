Template.MosqueDashboardMosqueProfileMosqueProfileUpdate.rendered = function() {
	
};

Template.MosqueDashboardMosqueProfileMosqueProfileUpdate.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.MosqueDashboardMosqueProfileMosqueProfileUpdate.helpers({

});

Template.MosqueDashboardMosqueProfileMosqueProfileUpdateMosqueProfileForm.rendered = function() {
	
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

Template.MosqueDashboardMosqueProfileMosqueProfileUpdateMosqueProfileForm.events({
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
				

				Mosques.update({ _id: t.data.update_mosque._id }, { $set: values });

				Router.go("mosque_dashboard.mosque_profile", {});
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();
		Router.go("mosque_dashboard.mosque_profile", {});
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

Template.MosqueDashboardMosqueProfileMosqueProfileUpdateMosqueProfileForm.helpers({
});
