var pageSession = new ReactiveDict();

Template.AdminDashboardTimezones.rendered = function() {
	
};

Template.AdminDashboardTimezones.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.AdminDashboardTimezones.helpers({

});

var AdminDashboardTimezonesTimezoneViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminDashboardTimezonesTimezoneViewSearchString");
	var sortBy = pageSession.get("AdminDashboardTimezonesTimezoneViewSortBy");
	var sortAscending = pageSession.get("AdminDashboardTimezonesTimezoneViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "offset", "daylightsaving"];
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

var AdminDashboardTimezonesTimezoneViewExport = function(cursor, fileType) {
	var data = AdminDashboardTimezonesTimezoneViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminDashboardTimezonesTimezoneView.rendered = function() {
	pageSession.set("AdminDashboardTimezonesTimezoneViewStyle", "table");
	
};

Template.AdminDashboardTimezonesTimezoneView.events({
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
				pageSession.set("AdminDashboardTimezonesTimezoneViewSearchString", searchString);
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
					pageSession.set("AdminDashboardTimezonesTimezoneViewSearchString", searchString);
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
					pageSession.set("AdminDashboardTimezonesTimezoneViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_dashboard.timezones.new_timezone", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminDashboardTimezonesTimezoneViewExport(this.admin_all_timezones, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminDashboardTimezonesTimezoneViewExport(this.admin_all_timezones, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminDashboardTimezonesTimezoneViewExport(this.admin_all_timezones, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminDashboardTimezonesTimezoneViewExport(this.admin_all_timezones, "json");
	}
});

Template.AdminDashboardTimezonesTimezoneView.helpers({
	"isEmpty": function() {
		return !this.admin_all_timezones || this.admin_all_timezones.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_all_timezones && this.admin_all_timezones.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_all_timezones && pageSession.get("AdminDashboardTimezonesTimezoneViewSearchString") && AdminDashboardTimezonesTimezoneViewItems(this.admin_all_timezones).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminDashboardTimezonesTimezoneViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminDashboardTimezonesTimezoneViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminDashboardTimezonesTimezoneViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminDashboardTimezonesTimezoneViewStyle") == "gallery";
	}
});


Template.AdminDashboardTimezonesTimezoneViewTable.rendered = function() {
	
};

Template.AdminDashboardTimezonesTimezoneViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminDashboardTimezonesTimezoneViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminDashboardTimezonesTimezoneViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminDashboardTimezonesTimezoneViewSortAscending") || false;
			pageSession.set("AdminDashboardTimezonesTimezoneViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminDashboardTimezonesTimezoneViewSortAscending", true);
		}
	}
});

Template.AdminDashboardTimezonesTimezoneViewTable.helpers({
	"tableItems": function() {
		return AdminDashboardTimezonesTimezoneViewItems(this.admin_all_timezones);
	}
});


Template.AdminDashboardTimezonesTimezoneViewTableItems.rendered = function() {
	
};

Template.AdminDashboardTimezonesTimezoneViewTableItems.events({
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
						Timezones.remove({ _id: me._id });
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
		Router.go("admin_dashboard.timezones.edit_timezone", {timezoneId: this._id});
		return false;
	}
});

Template.AdminDashboardTimezonesTimezoneViewTableItems.helpers({

});
