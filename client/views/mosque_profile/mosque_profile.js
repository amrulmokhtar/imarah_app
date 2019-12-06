var pageSession = new ReactiveDict();

Template.MosqueProfile.rendered = function() {
	
};

Template.MosqueProfile.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.MosqueProfile.helpers({

});

var MosqueProfileMosqueProfileViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("MosqueProfileMosqueProfileViewSearchString");
	var sortBy = pageSession.get("MosqueProfileMosqueProfileViewSortBy");
	var sortAscending = pageSession.get("MosqueProfileMosqueProfileViewSortAscending");
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

var MosqueProfileMosqueProfileViewExport = function(cursor, fileType) {
	var data = MosqueProfileMosqueProfileViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.MosqueProfileMosqueProfileView.rendered = function() {
	pageSession.set("MosqueProfileMosqueProfileViewStyle", "table");
	
};

Template.MosqueProfileMosqueProfileView.events({
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
				pageSession.set("MosqueProfileMosqueProfileViewSearchString", searchString);
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
					pageSession.set("MosqueProfileMosqueProfileViewSearchString", searchString);
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
					pageSession.set("MosqueProfileMosqueProfileViewSearchString", "");
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
		MosqueProfileMosqueProfileViewExport(this.single_mosque, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		MosqueProfileMosqueProfileViewExport(this.single_mosque, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		MosqueProfileMosqueProfileViewExport(this.single_mosque, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		MosqueProfileMosqueProfileViewExport(this.single_mosque, "json");
	}
});

Template.MosqueProfileMosqueProfileView.helpers({
	"isEmpty": function() {
		return !this.single_mosque || this.single_mosque.count() == 0;
	},
	"isNotEmpty": function() {
		return this.single_mosque && this.single_mosque.count() > 0;
	},
	"isNotFound": function() {
		return this.single_mosque && pageSession.get("MosqueProfileMosqueProfileViewSearchString") && MosqueProfileMosqueProfileViewItems(this.single_mosque).length == 0;
	},
	"searchString": function() {
		return pageSession.get("MosqueProfileMosqueProfileViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("MosqueProfileMosqueProfileViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("MosqueProfileMosqueProfileViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("MosqueProfileMosqueProfileViewStyle") == "gallery";
	}
});


Template.MosqueProfileMosqueProfileViewTable.rendered = function() {
	
};

Template.MosqueProfileMosqueProfileViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("MosqueProfileMosqueProfileViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("MosqueProfileMosqueProfileViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("MosqueProfileMosqueProfileViewSortAscending") || false;
			pageSession.set("MosqueProfileMosqueProfileViewSortAscending", !sortAscending);
		} else {
			pageSession.set("MosqueProfileMosqueProfileViewSortAscending", true);
		}
	}
});

Template.MosqueProfileMosqueProfileViewTable.helpers({
	"tableItems": function() {
		return MosqueProfileMosqueProfileViewItems(this.single_mosque);
	}
});


Template.MosqueProfileMosqueProfileViewTableItems.rendered = function() {
	
};

Template.MosqueProfileMosqueProfileViewTableItems.events({
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
		/**/
		return false;
	}
});

Template.MosqueProfileMosqueProfileViewTableItems.helpers({

});
