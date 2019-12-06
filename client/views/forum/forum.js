var pageSession = new ReactiveDict();

Template.Forum.rendered = function() {
	
};

Template.Forum.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.Forum.helpers({

});

var ForumForumViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ForumForumViewSearchString");
	var sortBy = pageSession.get("ForumForumViewSortBy");
	var sortAscending = pageSession.get("ForumForumViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "text", "topic", "owner_id"];
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

var ForumForumViewExport = function(cursor, fileType) {
	var data = ForumForumViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ForumForumView.rendered = function() {
	pageSession.set("ForumForumViewStyle", "table");
	
};

Template.ForumForumView.events({
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
				pageSession.set("ForumForumViewSearchString", searchString);
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
					pageSession.set("ForumForumViewSearchString", searchString);
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
					pageSession.set("ForumForumViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ForumForumViewExport(this.all_forum_questions, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ForumForumViewExport(this.all_forum_questions, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ForumForumViewExport(this.all_forum_questions, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ForumForumViewExport(this.all_forum_questions, "json");
	}
});

Template.ForumForumView.helpers({
	"isEmpty": function() {
		return !this.all_forum_questions || this.all_forum_questions.count() == 0;
	},
	"isNotEmpty": function() {
		return this.all_forum_questions && this.all_forum_questions.count() > 0;
	},
	"isNotFound": function() {
		return this.all_forum_questions && pageSession.get("ForumForumViewSearchString") && ForumForumViewItems(this.all_forum_questions).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ForumForumViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ForumForumViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ForumForumViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ForumForumViewStyle") == "gallery";
	}
});


Template.ForumForumViewTable.rendered = function() {
	
};

Template.ForumForumViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ForumForumViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ForumForumViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ForumForumViewSortAscending") || false;
			pageSession.set("ForumForumViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ForumForumViewSortAscending", true);
		}
	}
});

Template.ForumForumViewTable.helpers({
	"tableItems": function() {
		return ForumForumViewItems(this.all_forum_questions);
	}
});


Template.ForumForumViewTableItems.rendered = function() {
	
};

Template.ForumForumViewTableItems.events({
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
						ForumQuestions.remove({ _id: me._id });
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
		/**/
		return false;
	}
});

Template.ForumForumViewTableItems.helpers({

});
