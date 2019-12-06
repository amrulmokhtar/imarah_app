Template.AdminDashboardAdminForumTopicsNewTopic.rendered = function() {
	
};

Template.AdminDashboardAdminForumTopicsNewTopic.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.AdminDashboardAdminForumTopicsNewTopic.helpers({

});

Template.AdminDashboardAdminForumTopicsNewTopicForumTopicForm.rendered = function() {
	
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

Template.AdminDashboardAdminForumTopicsNewTopicForumTopicForm.events({
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
				

				newId = ForumTopics.insert(values);

				Router.go("admin_dashboard.admin_forum.forum_topics", {});
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_dashboard.admin_forum.forum_topics", {});
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

Template.AdminDashboardAdminForumTopicsNewTopicForumTopicForm.helpers({
});
