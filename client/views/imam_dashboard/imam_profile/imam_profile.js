var pageSession = new ReactiveDict();

Template.ImamDashboardImamProfile.rendered = function() {
	
};

Template.ImamDashboardImamProfile.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.ImamDashboardImamProfile.helpers({

});

var ImamDashboardImamProfileImamProfileViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ImamDashboardImamProfileImamProfileViewSearchString");
	var sortBy = pageSession.get("ImamDashboardImamProfileImamProfileViewSortBy");
	var sortAscending = pageSession.get("ImamDashboardImamProfileImamProfileViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "first_name", "last_name", "specialities", "user_id", "description", "phone_number", "country", "email", "facebook", "twitter", "website", "picture"];
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

var ImamDashboardImamProfileImamProfileViewExport = function(cursor, fileType) {
	var data = ImamDashboardImamProfileImamProfileViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ImamDashboardImamProfileImamProfileView.rendered = function() {
	pageSession.set("ImamDashboardImamProfileImamProfileViewStyle", "table");
	
};

Template.ImamDashboardImamProfileImamProfileView.events({
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
				pageSession.set("ImamDashboardImamProfileImamProfileViewSearchString", searchString);
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
					pageSession.set("ImamDashboardImamProfileImamProfileViewSearchString", searchString);
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
					pageSession.set("ImamDashboardImamProfileImamProfileViewSearchString", "");
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
		ImamDashboardImamProfileImamProfileViewExport(this.imam_view_profile, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ImamDashboardImamProfileImamProfileViewExport(this.imam_view_profile, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ImamDashboardImamProfileImamProfileViewExport(this.imam_view_profile, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ImamDashboardImamProfileImamProfileViewExport(this.imam_view_profile, "json");
	}
});

Template.ImamDashboardImamProfileImamProfileView.helpers({
	"isEmpty": function() {
		return !this.imam_view_profile || this.imam_view_profile.count() == 0;
	},
	"isNotEmpty": function() {
		return this.imam_view_profile && this.imam_view_profile.count() > 0;
	},
	"isNotFound": function() {
		return this.imam_view_profile && pageSession.get("ImamDashboardImamProfileImamProfileViewSearchString") && ImamDashboardImamProfileImamProfileViewItems(this.imam_view_profile).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ImamDashboardImamProfileImamProfileViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ImamDashboardImamProfileImamProfileViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ImamDashboardImamProfileImamProfileViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ImamDashboardImamProfileImamProfileViewStyle") == "gallery";
	}
});


Template.ImamDashboardImamProfileImamProfileViewTable.rendered = function() {
	
};

Template.ImamDashboardImamProfileImamProfileViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ImamDashboardImamProfileImamProfileViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ImamDashboardImamProfileImamProfileViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ImamDashboardImamProfileImamProfileViewSortAscending") || false;
			pageSession.set("ImamDashboardImamProfileImamProfileViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ImamDashboardImamProfileImamProfileViewSortAscending", true);
		}
	}
});

Template.ImamDashboardImamProfileImamProfileViewTable.helpers({
	"tableItems": function() {
		return ImamDashboardImamProfileImamProfileViewItems(this.imam_view_profile);
	}
});


Template.ImamDashboardImamProfileImamProfileViewTableItems.rendered = function() {
	
};

Template.ImamDashboardImamProfileImamProfileViewTableItems.events({
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
						Imams.remove({ _id: me._id });
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
		Router.go("imam_dashboard.imam_profile.imam_profile_update", {imamId: this._id});
		return false;
	}
});

Template.ImamDashboardImamProfileImamProfileViewTableItems.helpers({

});
