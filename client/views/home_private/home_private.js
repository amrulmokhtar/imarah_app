var pageSession = new ReactiveDict();

Template.HomePrivate.rendered = function() {
	
};

Template.HomePrivate.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.HomePrivate.helpers({

});

var HomePrivateProfileViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("HomePrivateProfileViewSearchString");
	var sortBy = pageSession.get("HomePrivateProfileViewSortBy");
	var sortAscending = pageSession.get("HomePrivateProfileViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = [];
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

var HomePrivateProfileViewExport = function(cursor, fileType) {
	var data = HomePrivateProfileViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.HomePrivateProfileView.rendered = function() {
	pageSession.set("HomePrivateProfileViewStyle", "table");
	
};

Template.HomePrivateProfileView.events({
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
				pageSession.set("HomePrivateProfileViewSearchString", searchString);
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
					pageSession.set("HomePrivateProfileViewSearchString", searchString);
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
					pageSession.set("HomePrivateProfileViewSearchString", "");
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
		HomePrivateProfileViewExport(this.user_profile, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		HomePrivateProfileViewExport(this.user_profile, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		HomePrivateProfileViewExport(this.user_profile, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		HomePrivateProfileViewExport(this.user_profile, "json");
	}
});

Template.HomePrivateProfileView.helpers({
	"isEmpty": function() {
		return !this.user_profile || this.user_profile.count() == 0;
	},
	"isNotEmpty": function() {
		return this.user_profile && this.user_profile.count() > 0;
	},
	"isNotFound": function() {
		return this.user_profile && pageSession.get("HomePrivateProfileViewSearchString") && HomePrivateProfileViewItems(this.user_profile).length == 0;
	},
	"searchString": function() {
		return pageSession.get("HomePrivateProfileViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("HomePrivateProfileViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("HomePrivateProfileViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("HomePrivateProfileViewStyle") == "gallery";
	}
});


Template.HomePrivateProfileViewTable.rendered = function() {
	
};

Template.HomePrivateProfileViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("HomePrivateProfileViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("HomePrivateProfileViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("HomePrivateProfileViewSortAscending") || false;
			pageSession.set("HomePrivateProfileViewSortAscending", !sortAscending);
		} else {
			pageSession.set("HomePrivateProfileViewSortAscending", true);
		}
	}
});

Template.HomePrivateProfileViewTable.helpers({
	"tableItems": function() {
		return HomePrivateProfileViewItems(this.user_profile);
	}
});


Template.HomePrivateProfileViewTableItems.rendered = function() {
	
};

Template.HomePrivateProfileViewTableItems.events({
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
						Users.remove({ _id: me._id });
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
		Router.go("home_private.edit_profile", {profile_id: Meteor.userId()});
		return false;
	}
});

Template.HomePrivateProfileViewTableItems.helpers({

});

var HomePrivateUserPostsItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("HomePrivateUserPostsSearchString");
	var sortBy = pageSession.get("HomePrivateUserPostsSortBy");
	var sortAscending = pageSession.get("HomePrivateUserPostsSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["text", "url", "picture", "owner_id"];
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

var HomePrivateUserPostsExport = function(cursor, fileType) {
	var data = HomePrivateUserPostsItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.HomePrivateUserPosts.rendered = function() {
	pageSession.set("HomePrivateUserPostsStyle", "table");
	
};

Template.HomePrivateUserPosts.events({
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
				pageSession.set("HomePrivateUserPostsSearchString", searchString);
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
					pageSession.set("HomePrivateUserPostsSearchString", searchString);
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
					pageSession.set("HomePrivateUserPostsSearchString", "");
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
		HomePrivateUserPostsExport(this.user_posts, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		HomePrivateUserPostsExport(this.user_posts, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		HomePrivateUserPostsExport(this.user_posts, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		HomePrivateUserPostsExport(this.user_posts, "json");
	}
});

Template.HomePrivateUserPosts.helpers({
	"isEmpty": function() {
		return !this.user_posts || this.user_posts.count() == 0;
	},
	"isNotEmpty": function() {
		return this.user_posts && this.user_posts.count() > 0;
	},
	"isNotFound": function() {
		return this.user_posts && pageSession.get("HomePrivateUserPostsSearchString") && HomePrivateUserPostsItems(this.user_posts).length == 0;
	},
	"searchString": function() {
		return pageSession.get("HomePrivateUserPostsSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("HomePrivateUserPostsStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("HomePrivateUserPostsStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("HomePrivateUserPostsStyle") == "gallery";
	}
});


Template.HomePrivateUserPostsTable.rendered = function() {
	
};

Template.HomePrivateUserPostsTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("HomePrivateUserPostsSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("HomePrivateUserPostsSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("HomePrivateUserPostsSortAscending") || false;
			pageSession.set("HomePrivateUserPostsSortAscending", !sortAscending);
		} else {
			pageSession.set("HomePrivateUserPostsSortAscending", true);
		}
	}
});

Template.HomePrivateUserPostsTable.helpers({
	"tableItems": function() {
		return HomePrivateUserPostsItems(this.user_posts);
	}
});


Template.HomePrivateUserPostsTableItems.rendered = function() {
	
};

Template.HomePrivateUserPostsTableItems.events({
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
						Posts.remove({ _id: me._id });
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
		Router.go("home_private.edit_post", {post_id: this._id});
		return false;
	}
});

Template.HomePrivateUserPostsTableItems.helpers({

});

Template.HomePrivateNewPost.rendered = function() {
	
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

Template.HomePrivateNewPost.events({
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
				

				newId = Posts.insert(values);

				Router.go("admin_dashboard", {});
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();
		Router.go("home_private", {});
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

Template.HomePrivateNewPost.helpers({
});
