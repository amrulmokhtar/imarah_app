var pageSession = new ReactiveDict();

Template.AdminDashboardAdminForumTopics.rendered = function() {
	
};

Template.AdminDashboardAdminForumTopics.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.AdminDashboardAdminForumTopics.helpers({

});

var AdminDashboardAdminForumTopicsTopicViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminDashboardAdminForumTopicsTopicViewSearchString");
	var sortBy = pageSession.get("AdminDashboardAdminForumTopicsTopicViewSortBy");
	var sortAscending = pageSession.get("AdminDashboardAdminForumTopicsTopicViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "category_id"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var AdminDashboardAdminForumTopicsTopicViewExport = function(cursor, fileType) {
	var data = AdminDashboardAdminForumTopicsTopicViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminDashboardAdminForumTopicsTopicView.rendered = function() {
	pageSession.set("AdminDashboardAdminForumTopicsTopicViewStyle", "table");
	
};

Template.AdminDashboardAdminForumTopicsTopicView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("AdminDashboardAdminForumTopicsTopicViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("AdminDashboardAdminForumTopicsTopicViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("AdminDashboardAdminForumTopicsTopicViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_dashboard.admin_forum.topics.new_topic", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminDashboardAdminForumTopicsTopicViewExport(this.admin_all_forum_topics, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminDashboardAdminForumTopicsTopicViewExport(this.admin_all_forum_topics, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminDashboardAdminForumTopicsTopicViewExport(this.admin_all_forum_topics, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminDashboardAdminForumTopicsTopicViewExport(this.admin_all_forum_topics, "json");
	}
});

Template.AdminDashboardAdminForumTopicsTopicView.helpers({
	"isEmpty": function() {
		return !this.admin_all_forum_topics || this.admin_all_forum_topics.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_all_forum_topics && this.admin_all_forum_topics.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_all_forum_topics && pageSession.get("AdminDashboardAdminForumTopicsTopicViewSearchString") && AdminDashboardAdminForumTopicsTopicViewItems(this.admin_all_forum_topics).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminDashboardAdminForumTopicsTopicViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminDashboardAdminForumTopicsTopicViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminDashboardAdminForumTopicsTopicViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminDashboardAdminForumTopicsTopicViewStyle") == "gallery";
	}
});


Template.AdminDashboardAdminForumTopicsTopicViewTable.rendered = function() {
	
};

Template.AdminDashboardAdminForumTopicsTopicViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminDashboardAdminForumTopicsTopicViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminDashboardAdminForumTopicsTopicViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminDashboardAdminForumTopicsTopicViewSortAscending") || false;
			pageSession.set("AdminDashboardAdminForumTopicsTopicViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminDashboardAdminForumTopicsTopicViewSortAscending", true);
		}
	}
});

Template.AdminDashboardAdminForumTopicsTopicViewTable.helpers({
	"tableItems": function() {
		return AdminDashboardAdminForumTopicsTopicViewItems(this.admin_all_forum_topics);
	}
});


Template.AdminDashboardAdminForumTopicsTopicViewTableItems.rendered = function() {
	
};

Template.AdminDashboardAdminForumTopicsTopicViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		/**/
		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						ForumTopics.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_dashboard.admin_forum.topics.edit_topic", {forum_topicId: this._id});
		return false;
	}
});

Template.AdminDashboardAdminForumTopicsTopicViewTableItems.helpers({

});
