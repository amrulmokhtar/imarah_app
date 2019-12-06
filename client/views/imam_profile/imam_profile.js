var pageSession = new ReactiveDict();

Template.ImamProfile.rendered = function() {
	
};

Template.ImamProfile.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.ImamProfile.helpers({

});

var ImamProfileImamProfileViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ImamProfileImamProfileViewSearchString");
	var sortBy = pageSession.get("ImamProfileImamProfileViewSortBy");
	var sortAscending = pageSession.get("ImamProfileImamProfileViewSortAscending");
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

var ImamProfileImamProfileViewExport = function(cursor, fileType) {
	var data = ImamProfileImamProfileViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ImamProfileImamProfileView.rendered = function() {
	pageSession.set("ImamProfileImamProfileViewStyle", "table");
	
};

Template.ImamProfileImamProfileView.events({
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
				pageSession.set("ImamProfileImamProfileViewSearchString", searchString);
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
					pageSession.set("ImamProfileImamProfileViewSearchString", searchString);
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
					pageSession.set("ImamProfileImamProfileViewSearchString", "");
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
		ImamProfileImamProfileViewExport(this.single_imam, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ImamProfileImamProfileViewExport(this.single_imam, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ImamProfileImamProfileViewExport(this.single_imam, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ImamProfileImamProfileViewExport(this.single_imam, "json");
	}
});

Template.ImamProfileImamProfileView.helpers({
	"isEmpty": function() {
		return !this.single_imam || this.single_imam.count() == 0;
	},
	"isNotEmpty": function() {
		return this.single_imam && this.single_imam.count() > 0;
	},
	"isNotFound": function() {
		return this.single_imam && pageSession.get("ImamProfileImamProfileViewSearchString") && ImamProfileImamProfileViewItems(this.single_imam).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ImamProfileImamProfileViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ImamProfileImamProfileViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ImamProfileImamProfileViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ImamProfileImamProfileViewStyle") == "gallery";
	}
});


Template.ImamProfileImamProfileViewTable.rendered = function() {
	
};

Template.ImamProfileImamProfileViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ImamProfileImamProfileViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ImamProfileImamProfileViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ImamProfileImamProfileViewSortAscending") || false;
			pageSession.set("ImamProfileImamProfileViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ImamProfileImamProfileViewSortAscending", true);
		}
	}
});

Template.ImamProfileImamProfileViewTable.helpers({
	"tableItems": function() {
		return ImamProfileImamProfileViewItems(this.single_imam);
	}
});


Template.ImamProfileImamProfileViewTableItems.rendered = function() {
	
};

Template.ImamProfileImamProfileViewTableItems.events({
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
		/**/
		return false;
	}
});

Template.ImamProfileImamProfileViewTableItems.helpers({

});
