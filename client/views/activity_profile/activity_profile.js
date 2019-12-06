var pageSession = new ReactiveDict();

Template.ActivityProfile.rendered = function() {
	
};

Template.ActivityProfile.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.ActivityProfile.helpers({

});

var ActivityProfileEventProfileViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ActivityProfileEventProfileViewSearchString");
	var sortBy = pageSession.get("ActivityProfileEventProfileViewSortBy");
	var sortAscending = pageSession.get("ActivityProfileEventProfileViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "longitude", "latitude", "seats", "type", "topic", "picture", "imams", "mosque_id", "website", "address_1", "city", "district", "postcode", "state", "country", "timezone", "date", "time"];
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

var ActivityProfileEventProfileViewExport = function(cursor, fileType) {
	var data = ActivityProfileEventProfileViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ActivityProfileEventProfileView.rendered = function() {
	pageSession.set("ActivityProfileEventProfileViewStyle", "table");
	
};

Template.ActivityProfileEventProfileView.events({
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
				pageSession.set("ActivityProfileEventProfileViewSearchString", searchString);
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
					pageSession.set("ActivityProfileEventProfileViewSearchString", searchString);
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
					pageSession.set("ActivityProfileEventProfileViewSearchString", "");
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
		ActivityProfileEventProfileViewExport(this.single_event, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ActivityProfileEventProfileViewExport(this.single_event, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ActivityProfileEventProfileViewExport(this.single_event, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ActivityProfileEventProfileViewExport(this.single_event, "json");
	}
});

Template.ActivityProfileEventProfileView.helpers({
	"isEmpty": function() {
		return !this.single_event || this.single_event.count() == 0;
	},
	"isNotEmpty": function() {
		return this.single_event && this.single_event.count() > 0;
	},
	"isNotFound": function() {
		return this.single_event && pageSession.get("ActivityProfileEventProfileViewSearchString") && ActivityProfileEventProfileViewItems(this.single_event).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ActivityProfileEventProfileViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ActivityProfileEventProfileViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ActivityProfileEventProfileViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ActivityProfileEventProfileViewStyle") == "gallery";
	}
});


Template.ActivityProfileEventProfileViewTable.rendered = function() {
	
};

Template.ActivityProfileEventProfileViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ActivityProfileEventProfileViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ActivityProfileEventProfileViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ActivityProfileEventProfileViewSortAscending") || false;
			pageSession.set("ActivityProfileEventProfileViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ActivityProfileEventProfileViewSortAscending", true);
		}
	}
});

Template.ActivityProfileEventProfileViewTable.helpers({
	"tableItems": function() {
		return ActivityProfileEventProfileViewItems(this.single_event);
	}
});


Template.ActivityProfileEventProfileViewTableItems.rendered = function() {
	
};

Template.ActivityProfileEventProfileViewTableItems.events({
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
						Events.remove({ _id: me._id });
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

Template.ActivityProfileEventProfileViewTableItems.helpers({

});
