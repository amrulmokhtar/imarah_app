var pageSession = new ReactiveDict();

Template.AdminDashboardCountries.rendered = function() {
	
};

Template.AdminDashboardCountries.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.AdminDashboardCountries.helpers({

});

var AdminDashboardCountriesCountryViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminDashboardCountriesCountryViewSearchString");
	var sortBy = pageSession.get("AdminDashboardCountriesCountryViewSortBy");
	var sortAscending = pageSession.get("AdminDashboardCountriesCountryViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "num_mosques", "dialling_code"];
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

var AdminDashboardCountriesCountryViewExport = function(cursor, fileType) {
	var data = AdminDashboardCountriesCountryViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminDashboardCountriesCountryView.rendered = function() {
	pageSession.set("AdminDashboardCountriesCountryViewStyle", "table");
	
};

Template.AdminDashboardCountriesCountryView.events({
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
				pageSession.set("AdminDashboardCountriesCountryViewSearchString", searchString);
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
					pageSession.set("AdminDashboardCountriesCountryViewSearchString", searchString);
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
					pageSession.set("AdminDashboardCountriesCountryViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_dashboard.countries.new_country", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminDashboardCountriesCountryViewExport(this.admin_all_countries, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminDashboardCountriesCountryViewExport(this.admin_all_countries, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminDashboardCountriesCountryViewExport(this.admin_all_countries, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminDashboardCountriesCountryViewExport(this.admin_all_countries, "json");
	}
});

Template.AdminDashboardCountriesCountryView.helpers({
	"isEmpty": function() {
		return !this.admin_all_countries || this.admin_all_countries.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_all_countries && this.admin_all_countries.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_all_countries && pageSession.get("AdminDashboardCountriesCountryViewSearchString") && AdminDashboardCountriesCountryViewItems(this.admin_all_countries).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminDashboardCountriesCountryViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminDashboardCountriesCountryViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminDashboardCountriesCountryViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminDashboardCountriesCountryViewStyle") == "gallery";
	}
});


Template.AdminDashboardCountriesCountryViewTable.rendered = function() {
	
};

Template.AdminDashboardCountriesCountryViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminDashboardCountriesCountryViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminDashboardCountriesCountryViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminDashboardCountriesCountryViewSortAscending") || false;
			pageSession.set("AdminDashboardCountriesCountryViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminDashboardCountriesCountryViewSortAscending", true);
		}
	}
});

Template.AdminDashboardCountriesCountryViewTable.helpers({
	"tableItems": function() {
		return AdminDashboardCountriesCountryViewItems(this.admin_all_countries);
	}
});


Template.AdminDashboardCountriesCountryViewTableItems.rendered = function() {
	
};

Template.AdminDashboardCountriesCountryViewTableItems.events({
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
						Countries.remove({ _id: me._id });
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
		Router.go("admin_dashboard.countries.edit_country", {countryId: this._id});
		return false;
	}
});

Template.AdminDashboardCountriesCountryViewTableItems.helpers({

});
