var pageSession = new ReactiveDict();

Template.AdminDashboardCities.rendered = function() {
	
};

Template.AdminDashboardCities.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.AdminDashboardCities.helpers({

});

var AdminDashboardCitiesCityViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminDashboardCitiesCityViewSearchString");
	var sortBy = pageSession.get("AdminDashboardCitiesCityViewSortBy");
	var sortAscending = pageSession.get("AdminDashboardCitiesCityViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "longitude", "latitude", "timezone", "num_mosques", "num_users"];
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

var AdminDashboardCitiesCityViewExport = function(cursor, fileType) {
	var data = AdminDashboardCitiesCityViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminDashboardCitiesCityView.rendered = function() {
	pageSession.set("AdminDashboardCitiesCityViewStyle", "table");
	
};

Template.AdminDashboardCitiesCityView.events({
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
				pageSession.set("AdminDashboardCitiesCityViewSearchString", searchString);
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
					pageSession.set("AdminDashboardCitiesCityViewSearchString", searchString);
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
					pageSession.set("AdminDashboardCitiesCityViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_dashboard.cities.new_city", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminDashboardCitiesCityViewExport(this.admin_all_cities, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminDashboardCitiesCityViewExport(this.admin_all_cities, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminDashboardCitiesCityViewExport(this.admin_all_cities, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminDashboardCitiesCityViewExport(this.admin_all_cities, "json");
	}
});

Template.AdminDashboardCitiesCityView.helpers({
	"isEmpty": function() {
		return !this.admin_all_cities || this.admin_all_cities.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_all_cities && this.admin_all_cities.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_all_cities && pageSession.get("AdminDashboardCitiesCityViewSearchString") && AdminDashboardCitiesCityViewItems(this.admin_all_cities).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminDashboardCitiesCityViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminDashboardCitiesCityViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminDashboardCitiesCityViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminDashboardCitiesCityViewStyle") == "gallery";
	}
});


Template.AdminDashboardCitiesCityViewTable.rendered = function() {
	
};

Template.AdminDashboardCitiesCityViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminDashboardCitiesCityViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminDashboardCitiesCityViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminDashboardCitiesCityViewSortAscending") || false;
			pageSession.set("AdminDashboardCitiesCityViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminDashboardCitiesCityViewSortAscending", true);
		}
	}
});

Template.AdminDashboardCitiesCityViewTable.helpers({
	"tableItems": function() {
		return AdminDashboardCitiesCityViewItems(this.admin_all_cities);
	}
});


Template.AdminDashboardCitiesCityViewTableItems.rendered = function() {
	
};

Template.AdminDashboardCitiesCityViewTableItems.events({
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
						Cities.remove({ _id: me._id });
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
		Router.go("admin_dashboard.cities.edit_city", {cityId: this._id});
		return false;
	}
});

Template.AdminDashboardCitiesCityViewTableItems.helpers({

});
