var pageSession = new ReactiveDict();

Template.MosqueDashboardMosqueEventManagement.rendered = function() {

};

Template.MosqueDashboardMosqueEventManagement.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }
});

Template.MosqueDashboardMosqueEventManagement.helpers({

});

var MosqueDashboardMosqueEventManagementEventViewItems = function(cursor) {
    if(!cursor) {
        return [];
    }

    var searchString = pageSession.get("MosqueDashboardMosqueEventManagementEventViewSearchString");
    var sortBy = pageSession.get("MosqueDashboardMosqueEventManagementEventViewSortBy");
    var sortAscending = pageSession.get("MosqueDashboardMosqueEventManagementEventViewSortAscending");
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

var MosqueDashboardMosqueEventManagementEventViewExport = function(cursor, fileType) {
    var data = MosqueDashboardMosqueEventManagementEventViewItems(cursor);
    var exportFields = [];

    var str = convertArrayOfObjects(data, exportFields, fileType);

    var filename = "export." + fileType;

    downloadLocalResource(str, filename, "application/octet-stream");
}


Template.MosqueDashboardMosqueEventManagementEventView.rendered = function() {
    pageSession.set("MosqueDashboardMosqueEventManagementEventViewStyle", "table");

};

Template.MosqueDashboardMosqueEventManagementEventView.events({
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
                pageSession.set("MosqueDashboardMosqueEventManagementEventViewSearchString", searchString);
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
                    pageSession.set("MosqueDashboardMosqueEventManagementEventViewSearchString", searchString);
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
                    pageSession.set("MosqueDashboardMosqueEventManagementEventViewSearchString", "");
                }

            }
            return false;
        }

        return true;
    },

    "click #dataview-insert-button": function(e, t) {
        e.preventDefault();
        Router.go("mosque_dashboard.mosque_event_management.mosque_new_event", {});
    },

    "click #dataview-export-default": function(e, t) {
        e.preventDefault();
        MosqueDashboardMosqueEventManagementEventViewExport(this.mosque_events, "csv");
    },

    "click #dataview-export-csv": function(e, t) {
        e.preventDefault();
        MosqueDashboardMosqueEventManagementEventViewExport(this.mosque_events, "csv");
    },

    "click #dataview-export-tsv": function(e, t) {
        e.preventDefault();
        MosqueDashboardMosqueEventManagementEventViewExport(this.mosque_events, "tsv");
    },

    "click #dataview-export-json": function(e, t) {
        e.preventDefault();
        MosqueDashboardMosqueEventManagementEventViewExport(this.mosque_events, "json");
    }
});

Template.MosqueDashboardMosqueEventManagementEventView.helpers({
    "isEmpty": function() {
        return !this.mosque_events || this.mosque_events.count() == 0;
    },
    "isNotEmpty": function() {
        return this.mosque_events && this.mosque_events.count() > 0;
    },
    "isNotFound": function() {
        return this.mosque_events && pageSession.get("MosqueDashboardMosqueEventManagementEventViewSearchString") && MosqueDashboardMosqueEventManagementEventViewItems(this.mosque_events).length == 0;
    },
    "searchString": function() {
        return pageSession.get("MosqueDashboardMosqueEventManagementEventViewSearchString");
    },
    "viewAsTable": function() {
        return pageSession.get("MosqueDashboardMosqueEventManagementEventViewStyle") == "table";
    },
    "viewAsList": function() {
        return pageSession.get("MosqueDashboardMosqueEventManagementEventViewStyle") == "list";
    },
    "viewAsGallery": function() {
        return pageSession.get("MosqueDashboardMosqueEventManagementEventViewStyle") == "gallery";
    }
});


Template.MosqueDashboardMosqueEventManagementEventViewTable.rendered = function() {

};

Template.MosqueDashboardMosqueEventManagementEventViewTable.events({
    "click .th-sortable": function(e, t) {
        e.preventDefault();
        var oldSortBy = pageSession.get("MosqueDashboardMosqueEventManagementEventViewSortBy");
        var newSortBy = $(e.target).attr("data-sort");

        pageSession.set("MosqueDashboardMosqueEventManagementEventViewSortBy", newSortBy);
        if(oldSortBy == newSortBy) {
            var sortAscending = pageSession.get("MosqueDashboardMosqueEventManagementEventViewSortAscending") || false;
            pageSession.set("MosqueDashboardMosqueEventManagementEventViewSortAscending", !sortAscending);
        } else {
            pageSession.set("MosqueDashboardMosqueEventManagementEventViewSortAscending", true);
        }
    }
});

Template.MosqueDashboardMosqueEventManagementEventViewTable.helpers({
    "tableItems": function() {
        return MosqueDashboardMosqueEventManagementEventViewItems(this.mosque_events);
    }
});


Template.MosqueDashboardMosqueEventManagementEventViewTableItems.rendered = function() {

};

Template.MosqueDashboardMosqueEventManagementEventViewTableItems.events({
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
        Router.go("mosque_dashboard.mosque_event_management.mosque_edit_event", {eventId: this._id});
        return false;
    }
});

Template.MosqueDashboardMosqueEventManagementEventViewTableItems.helpers({

});

Template.MosqueDashboardMosqueEventManagementMosqueMenu.rendered = function() {

};

Template.MosqueDashboardMosqueEventManagementMosqueMenu.events({

});

Template.MosqueDashboardMosqueEventManagementMosqueMenu.helpers({

});
