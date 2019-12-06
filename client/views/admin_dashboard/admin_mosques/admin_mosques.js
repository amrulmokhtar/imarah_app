var pageSession = new ReactiveDict();

Template.AdminDashboardAdminMosques.rendered = function() {

};

Template.AdminDashboardAdminMosques.events({
    "click #page-close-button": function(e, t) {
	e.preventDefault();
	Router.go("", {});
    }
});

Template.AdminDashboardAdminMosques.helpers({

});

var AdminDashboardAdminMosquesMosqueViewItems = function(cursor) {
    if(!cursor) {
	return [];
    }

    var searchString = pageSession.get("AdminDashboardAdminMosquesMosqueViewSearchString");
    var sortBy = pageSession.get("AdminDashboardAdminMosquesMosqueViewSortBy");
    var sortAscending = pageSession.get("AdminDashboardAdminMosquesMosqueViewSortAscending");
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

var AdminDashboardAdminMosquesMosqueViewExport = function(cursor, fileType) {
    var data = AdminDashboardAdminMosquesMosqueViewItems(cursor);
    var exportFields = [];

    var str = convertArrayOfObjects(data, exportFields, fileType);

    var filename = "export." + fileType;

    downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminDashboardAdminMosquesMosqueView.rendered = function() {
    pageSession.set("AdminDashboardAdminMosquesMosqueViewStyle", "table");

};

Template.AdminDashboardAdminMosquesMosqueView.events({
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
		pageSession.set("AdminDashboardAdminMosquesMosqueViewSearchString", searchString);
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
		    pageSession.set("AdminDashboardAdminMosquesMosqueViewSearchString", searchString);
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
		    pageSession.set("AdminDashboardAdminMosquesMosqueViewSearchString", "");
		}

	    }
	    return false;
	}

	return true;
    },

    "click #dataview-insert-button": function(e, t) {
	e.preventDefault();
	Router.go("admin_dashboard.admin_mosques.admin_new_mosque", {});
    },

    "click #dataview-export-default": function(e, t) {
	e.preventDefault();
	AdminDashboardAdminMosquesMosqueViewExport(this.admin_all_mosques, "csv");
    },

    "click #dataview-export-csv": function(e, t) {
	e.preventDefault();
	AdminDashboardAdminMosquesMosqueViewExport(this.admin_all_mosques, "csv");
    },

    "click #dataview-export-tsv": function(e, t) {
	e.preventDefault();
	AdminDashboardAdminMosquesMosqueViewExport(this.admin_all_mosques, "tsv");
    },

    "click #dataview-export-json": function(e, t) {
	e.preventDefault();
	AdminDashboardAdminMosquesMosqueViewExport(this.admin_all_mosques, "json");
    }
});

Template.AdminDashboardAdminMosquesMosqueView.helpers({
    "isEmpty": function() {
	return !this.admin_all_mosques || this.admin_all_mosques.count() == 0;
    },
    "isNotEmpty": function() {
	return this.admin_all_mosques && this.admin_all_mosques.count() > 0;
    },
    "isNotFound": function() {
	return this.admin_all_mosques && pageSession.get("AdminDashboardAdminMosquesMosqueViewSearchString") && AdminDashboardAdminMosquesMosqueViewItems(this.admin_all_mosques).length == 0;
    },
    "searchString": function() {
	return pageSession.get("AdminDashboardAdminMosquesMosqueViewSearchString");
    },
    "viewAsTable": function() {
	return pageSession.get("AdminDashboardAdminMosquesMosqueViewStyle") == "table";
    },
    "viewAsList": function() {
	return pageSession.get("AdminDashboardAdminMosquesMosqueViewStyle") == "list";
    },
    "viewAsGallery": function() {
	return pageSession.get("AdminDashboardAdminMosquesMosqueViewStyle") == "gallery";
    }
});


Template.AdminDashboardAdminMosquesMosqueViewTable.rendered = function() {

};

Template.AdminDashboardAdminMosquesMosqueViewTable.events({
    "click .th-sortable": function(e, t) {
	e.preventDefault();
	var oldSortBy = pageSession.get("AdminDashboardAdminMosquesMosqueViewSortBy");
	var newSortBy = $(e.target).attr("data-sort");

	pageSession.set("AdminDashboardAdminMosquesMosqueViewSortBy", newSortBy);
	if(oldSortBy == newSortBy) {
	    var sortAscending = pageSession.get("AdminDashboardAdminMosquesMosqueViewSortAscending") || false;
	    pageSession.set("AdminDashboardAdminMosquesMosqueViewSortAscending", !sortAscending);
	} else {
	    pageSession.set("AdminDashboardAdminMosquesMosqueViewSortAscending", true);
	}
    }
});

Template.AdminDashboardAdminMosquesMosqueViewTable.helpers({
    "tableItems": function() {
        //cursor = Mosques.find({},{lim});
        //console.log(cursor.fetch())
        //res = cursor.fetch();
        //console.log(res);
        //return res;
        //return this.admin_all_mosques;
        return AdminDashboardAdminMosquesMosqueViewItems(this.admin_all_mosques);
    }
});


Template.AdminDashboardAdminMosquesMosqueViewTableItems.rendered = function() {

};

Template.AdminDashboardAdminMosquesMosqueViewTableItems.events({
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
	Router.go("admin_dashboard.admin_mosques.admin_edit_mosque", {mosqueId: this._id});
	return false;
    }
});

Template.AdminDashboardAdminMosquesMosqueViewTableItems.helpers({

});

Template.AdminDashboardAdminMosquesAdminMosqueMenu.rendered = function() {

};

Template.AdminDashboardAdminMosquesAdminMosqueMenu.events({

});

Template.AdminDashboardAdminMosquesAdminMosqueMenu.helpers({

});
