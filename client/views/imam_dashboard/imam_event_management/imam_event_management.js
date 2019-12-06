var pageSession = new ReactiveDict();

Template.ImamDashboardImamEventManagement.rendered = function() {
	
};

Template.ImamDashboardImamEventManagement.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.ImamDashboardImamEventManagement.helpers({

});

var ImamDashboardImamEventManagementEventViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ImamDashboardImamEventManagementEventViewSearchString");
	var sortBy = pageSession.get("ImamDashboardImamEventManagementEventViewSortBy");
	var sortAscending = pageSession.get("ImamDashboardImamEventManagementEventViewSortAscending");
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

var ImamDashboardImamEventManagementEventViewExport = function(cursor, fileType) {
	var data = ImamDashboardImamEventManagementEventViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ImamDashboardImamEventManagementEventView.rendered = function() {
	pageSession.set("ImamDashboardImamEventManagementEventViewStyle", "table");
	
};

Template.ImamDashboardImamEventManagementEventView.events({
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
				pageSession.set("ImamDashboardImamEventManagementEventViewSearchString", searchString);
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
					pageSession.set("ImamDashboardImamEventManagementEventViewSearchString", searchString);
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
					pageSession.set("ImamDashboardImamEventManagementEventViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("imam_dashboard.imam_event_management.imam_new_event", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ImamDashboardImamEventManagementEventViewExport(this.imam_events, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ImamDashboardImamEventManagementEventViewExport(this.imam_events, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ImamDashboardImamEventManagementEventViewExport(this.imam_events, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ImamDashboardImamEventManagementEventViewExport(this.imam_events, "json");
	}
});

Template.ImamDashboardImamEventManagementEventView.helpers({
	"isEmpty": function() {
		return !this.imam_events || this.imam_events.count() == 0;
	},
	"isNotEmpty": function() {
		return this.imam_events && this.imam_events.count() > 0;
	},
	"isNotFound": function() {
		return this.imam_events && pageSession.get("ImamDashboardImamEventManagementEventViewSearchString") && ImamDashboardImamEventManagementEventViewItems(this.imam_events).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ImamDashboardImamEventManagementEventViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ImamDashboardImamEventManagementEventViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ImamDashboardImamEventManagementEventViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ImamDashboardImamEventManagementEventViewStyle") == "gallery";
	}
});


Template.ImamDashboardImamEventManagementEventViewTable.rendered = function() {
	
};

Template.ImamDashboardImamEventManagementEventViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ImamDashboardImamEventManagementEventViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ImamDashboardImamEventManagementEventViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ImamDashboardImamEventManagementEventViewSortAscending") || false;
			pageSession.set("ImamDashboardImamEventManagementEventViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ImamDashboardImamEventManagementEventViewSortAscending", true);
		}
	}
});

Template.ImamDashboardImamEventManagementEventViewTable.helpers({
	"tableItems": function() {
		return ImamDashboardImamEventManagementEventViewItems(this.imam_events);
	}
});


Template.ImamDashboardImamEventManagementEventViewTableItems.rendered = function() {
	
};

Template.ImamDashboardImamEventManagementEventViewTableItems.events({
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
		Router.go("imam_dashboard.imam_event_management.imam_edit_event", {eventId: this._id});
		return false;
	}
});

Template.ImamDashboardImamEventManagementEventViewTableItems.helpers({

});

Template.ImamDashboardImamEventManagementImamMenu.rendered = function() {
	
};

Template.ImamDashboardImamEventManagementImamMenu.events({

});

Template.ImamDashboardImamEventManagementImamMenu.helpers({

});
