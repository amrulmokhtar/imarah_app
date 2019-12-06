var pageSession = new ReactiveDict();

Template.MosqueDashboardMosqueProfile.rendered = function() {
	
};

Template.MosqueDashboardMosqueProfile.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.MosqueDashboardMosqueProfile.helpers({

});

var MosqueDashboardMosqueProfileMosqueProfileViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("MosqueDashboardMosqueProfileMosqueProfileViewSearchString");
	var sortBy = pageSession.get("MosqueDashboardMosqueProfileMosqueProfileViewSortBy");
	var sortAscending = pageSession.get("MosqueDashboardMosqueProfileMosqueProfileViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "type", "friday_prayers", "description", "amenities", "longitude", "latitude", "phone_number", "email", "facebook", "twitter", "website", "address_1", "city", "district", "postcode", "state", "country", "timezone", "managers", "picture"];
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

var MosqueDashboardMosqueProfileMosqueProfileViewExport = function(cursor, fileType) {
	var data = MosqueDashboardMosqueProfileMosqueProfileViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.MosqueDashboardMosqueProfileMosqueProfileView.rendered = function() {
	pageSession.set("MosqueDashboardMosqueProfileMosqueProfileViewStyle", "table");
	
};

Template.MosqueDashboardMosqueProfileMosqueProfileView.events({
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
				pageSession.set("MosqueDashboardMosqueProfileMosqueProfileViewSearchString", searchString);
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
					pageSession.set("MosqueDashboardMosqueProfileMosqueProfileViewSearchString", searchString);
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
					pageSession.set("MosqueDashboardMosqueProfileMosqueProfileViewSearchString", "");
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
		MosqueDashboardMosqueProfileMosqueProfileViewExport(this.mosque_view_profile, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		MosqueDashboardMosqueProfileMosqueProfileViewExport(this.mosque_view_profile, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		MosqueDashboardMosqueProfileMosqueProfileViewExport(this.mosque_view_profile, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		MosqueDashboardMosqueProfileMosqueProfileViewExport(this.mosque_view_profile, "json");
	}
});

Template.MosqueDashboardMosqueProfileMosqueProfileView.helpers({
	"isEmpty": function() {
		return !this.mosque_view_profile || this.mosque_view_profile.count() == 0;
	},
	"isNotEmpty": function() {
		return this.mosque_view_profile && this.mosque_view_profile.count() > 0;
	},
	"isNotFound": function() {
		return this.mosque_view_profile && pageSession.get("MosqueDashboardMosqueProfileMosqueProfileViewSearchString") && MosqueDashboardMosqueProfileMosqueProfileViewItems(this.mosque_view_profile).length == 0;
	},
	"searchString": function() {
		return pageSession.get("MosqueDashboardMosqueProfileMosqueProfileViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("MosqueDashboardMosqueProfileMosqueProfileViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("MosqueDashboardMosqueProfileMosqueProfileViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("MosqueDashboardMosqueProfileMosqueProfileViewStyle") == "gallery";
	}
});


Template.MosqueDashboardMosqueProfileMosqueProfileViewTable.rendered = function() {
	
};

Template.MosqueDashboardMosqueProfileMosqueProfileViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("MosqueDashboardMosqueProfileMosqueProfileViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("MosqueDashboardMosqueProfileMosqueProfileViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("MosqueDashboardMosqueProfileMosqueProfileViewSortAscending") || false;
			pageSession.set("MosqueDashboardMosqueProfileMosqueProfileViewSortAscending", !sortAscending);
		} else {
			pageSession.set("MosqueDashboardMosqueProfileMosqueProfileViewSortAscending", true);
		}
	}
});

Template.MosqueDashboardMosqueProfileMosqueProfileViewTable.helpers({
	"tableItems": function() {
		return MosqueDashboardMosqueProfileMosqueProfileViewItems(this.mosque_view_profile);
	}
});


Template.MosqueDashboardMosqueProfileMosqueProfileViewTableItems.rendered = function() {
	
};

Template.MosqueDashboardMosqueProfileMosqueProfileViewTableItems.events({
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
						Mosques.remove({ _id: me._id });
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
		Router.go("mosque_dashboard.mosque_profile.mosque_profile_update", {mosqueId: this._id});
		return false;
	}
});

Template.MosqueDashboardMosqueProfileMosqueProfileViewTableItems.helpers({

});
