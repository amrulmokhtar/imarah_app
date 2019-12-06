var pageSession = new ReactiveDict();

Template.AdminDashboardAdminImams.rendered = function() {
	
};

Template.AdminDashboardAdminImams.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.AdminDashboardAdminImams.helpers({

});

var AdminDashboardAdminImamsImamViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminDashboardAdminImamsImamViewSearchString");
	var sortBy = pageSession.get("AdminDashboardAdminImamsImamViewSortBy");
	var sortAscending = pageSession.get("AdminDashboardAdminImamsImamViewSortAscending");
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

var AdminDashboardAdminImamsImamViewExport = function(cursor, fileType) {
	var data = AdminDashboardAdminImamsImamViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminDashboardAdminImamsImamView.rendered = function() {
	pageSession.set("AdminDashboardAdminImamsImamViewStyle", "table");
	
};

Template.AdminDashboardAdminImamsImamView.events({
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
				pageSession.set("AdminDashboardAdminImamsImamViewSearchString", searchString);
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
					pageSession.set("AdminDashboardAdminImamsImamViewSearchString", searchString);
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
					pageSession.set("AdminDashboardAdminImamsImamViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_dashboard.admin_imams.admin_new_imam", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminDashboardAdminImamsImamViewExport(this.imams, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminDashboardAdminImamsImamViewExport(this.imams, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminDashboardAdminImamsImamViewExport(this.imams, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminDashboardAdminImamsImamViewExport(this.imams, "json");
	}
});

Template.AdminDashboardAdminImamsImamView.helpers({
	"isEmpty": function() {
		return !this.imams || this.imams.count() == 0;
	},
	"isNotEmpty": function() {
		return this.imams && this.imams.count() > 0;
	},
	"isNotFound": function() {
		return this.imams && pageSession.get("AdminDashboardAdminImamsImamViewSearchString") && AdminDashboardAdminImamsImamViewItems(this.imams).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminDashboardAdminImamsImamViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminDashboardAdminImamsImamViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminDashboardAdminImamsImamViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminDashboardAdminImamsImamViewStyle") == "gallery";
	}
});


Template.AdminDashboardAdminImamsImamViewTable.rendered = function() {
	
};

Template.AdminDashboardAdminImamsImamViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminDashboardAdminImamsImamViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminDashboardAdminImamsImamViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminDashboardAdminImamsImamViewSortAscending") || false;
			pageSession.set("AdminDashboardAdminImamsImamViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminDashboardAdminImamsImamViewSortAscending", true);
		}
	}
});

Template.AdminDashboardAdminImamsImamViewTable.helpers({
	"tableItems": function() {
		return AdminDashboardAdminImamsImamViewItems(this.imams);
	}
});


Template.AdminDashboardAdminImamsImamViewTableItems.rendered = function() {
	
};

Template.AdminDashboardAdminImamsImamViewTableItems.events({
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
		Router.go("admin_dashboard.admin_imams.admin_edit_imam", {imamId: this._id});
		return false;
	}
});

Template.AdminDashboardAdminImamsImamViewTableItems.helpers({

});

Template.AdminDashboardAdminImamsAdminImamMenu.rendered = function() {
	
};

Template.AdminDashboardAdminImamsAdminImamMenu.events({

});

Template.AdminDashboardAdminImamsAdminImamMenu.helpers({

});
