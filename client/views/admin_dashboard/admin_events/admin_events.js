var pageSession = new ReactiveDict();

Template.AdminDashboardAdminEvents.rendered = function() {
	$('.top_title').text('Events');
};

Template.AdminDashboardAdminEvents.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.AdminDashboardAdminEvents.helpers({

});

var AdminDashboardAdminEventsEventViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminDashboardAdminEventsEventViewSearchString");
	var sortBy = pageSession.get("AdminDashboardAdminEventsEventViewSortBy");
	var sortAscending = pageSession.get("AdminDashboardAdminEventsEventViewSortAscending");
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

var AdminDashboardAdminEventsEventViewExport = function(cursor, fileType) {
	var data = AdminDashboardAdminEventsEventViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminDashboardAdminEventsEventView.rendered = function() {
	pageSession.set("AdminDashboardAdminEventsEventViewStyle", "table");
	
};

Template.AdminDashboardAdminEventsEventView.events({
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
				pageSession.set("AdminDashboardAdminEventsEventViewSearchString", searchString);
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
					pageSession.set("AdminDashboardAdminEventsEventViewSearchString", searchString);
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
					pageSession.set("AdminDashboardAdminEventsEventViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_dashboard.admin_events.admin_new_event", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminDashboardAdminEventsEventViewExport(this.admin_all_events, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminDashboardAdminEventsEventViewExport(this.admin_all_events, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminDashboardAdminEventsEventViewExport(this.admin_all_events, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminDashboardAdminEventsEventViewExport(this.admin_all_events, "json");
	}
});

Template.AdminDashboardAdminEventsEventView.helpers({
	"isEmpty": function() {
		return !this.admin_all_events || this.admin_all_events.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_all_events && this.admin_all_events.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_all_events && pageSession.get("AdminDashboardAdminEventsEventViewSearchString") && AdminDashboardAdminEventsEventViewItems(this.admin_all_events).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminDashboardAdminEventsEventViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminDashboardAdminEventsEventViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminDashboardAdminEventsEventViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminDashboardAdminEventsEventViewStyle") == "gallery";
	}
});


Template.AdminDashboardAdminEventsEventViewTable.rendered = function() {
	
};

Template.AdminDashboardAdminEventsEventViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminDashboardAdminEventsEventViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminDashboardAdminEventsEventViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminDashboardAdminEventsEventViewSortAscending") || false;
			pageSession.set("AdminDashboardAdminEventsEventViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminDashboardAdminEventsEventViewSortAscending", true);
		}
	}
});

Template.AdminDashboardAdminEventsEventViewTable.helpers({
	"tableItems": function() {
		return AdminDashboardAdminEventsEventViewItems(this.admin_all_events);
	}
});


Template.AdminDashboardAdminEventsEventViewTableItems.rendered = function() {
	
};

Template.AdminDashboardAdminEventsEventViewTableItems.events({
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
		Router.go("admin_dashboard.admin_events.admin_edit_event", {eventId: this._id});
		return false;
	}
});

Template.AdminDashboardAdminEventsEventViewTableItems.helpers({

});

Template.AdminDashboardAdminEventsAdminMosqueMenu.rendered = function() {
	
};

Template.AdminDashboardAdminEventsAdminMosqueMenu.events({

});

Template.AdminDashboardAdminEventsAdminMosqueMenu.helpers({

});
