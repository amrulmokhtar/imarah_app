var pageSession = new ReactiveDict();

Template.AdminDashboardAdminImamsCrowdImams.rendered = function() {

};

Template.AdminDashboardAdminImamsCrowdImams.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }
});

Template.AdminDashboardAdminImamsCrowdImams.helpers({

});

var AdminDashboardAdminImamsCrowdImamsCrowdImamViewItems = function(cursor) {
    if(!cursor) {
        return [];
    }

    var searchString = pageSession.get("AdminDashboardAdminImamsCrowdImamsCrowdImamViewSearchString");
    var sortBy = pageSession.get("AdminDashboardAdminImamsCrowdImamsCrowdImamViewSortBy");
    var sortAscending = pageSession.get("AdminDashboardAdminImamsCrowdImamsCrowdImamViewSortAscending");
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

var AdminDashboardAdminImamsCrowdImamsCrowdImamViewExport = function(cursor, fileType) {
    var data = AdminDashboardAdminImamsCrowdImamsCrowdImamViewItems(cursor);
    var exportFields = [];

    var str = convertArrayOfObjects(data, exportFields, fileType);

    var filename = "export." + fileType;

    downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminDashboardAdminImamsCrowdImamsCrowdImamView.rendered = function() {
    pageSession.set("AdminDashboardAdminImamsCrowdImamsCrowdImamViewStyle", "table");

};

Template.AdminDashboardAdminImamsCrowdImamsCrowdImamView.events({
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
                pageSession.set("AdminDashboardAdminImamsCrowdImamsCrowdImamViewSearchString", searchString);
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
                    pageSession.set("AdminDashboardAdminImamsCrowdImamsCrowdImamViewSearchString", searchString);
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
                    pageSession.set("AdminDashboardAdminImamsCrowdImamsCrowdImamViewSearchString", "");
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
        AdminDashboardAdminImamsCrowdImamsCrowdImamViewExport(this.crowd_imams, "csv");
    },

    "click #dataview-export-csv": function(e, t) {
        e.preventDefault();
        AdminDashboardAdminImamsCrowdImamsCrowdImamViewExport(this.crowd_imams, "csv");
    },

    "click #dataview-export-tsv": function(e, t) {
        e.preventDefault();
        AdminDashboardAdminImamsCrowdImamsCrowdImamViewExport(this.crowd_imams, "tsv");
    },

    "click #dataview-export-json": function(e, t) {
        e.preventDefault();
        AdminDashboardAdminImamsCrowdImamsCrowdImamViewExport(this.crowd_imams, "json");
    }
});

Template.AdminDashboardAdminImamsCrowdImamsCrowdImamView.helpers({
    "isEmpty": function() {
        return !this.crowd_imams || this.crowd_imams.count() == 0;
    },
    "isNotEmpty": function() {
        return this.crowd_imams && this.crowd_imams.count() > 0;
    },
    "isNotFound": function() {
        return this.crowd_imams && pageSession.get("AdminDashboardAdminImamsCrowdImamsCrowdImamViewSearchString") && AdminDashboardAdminImamsCrowdImamsCrowdImamViewItems(this.crowd_imams).length == 0;
    },
    "searchString": function() {
        return pageSession.get("AdminDashboardAdminImamsCrowdImamsCrowdImamViewSearchString");
    },
    "viewAsTable": function() {
        return pageSession.get("AdminDashboardAdminImamsCrowdImamsCrowdImamViewStyle") == "table";
    },
    "viewAsList": function() {
        return pageSession.get("AdminDashboardAdminImamsCrowdImamsCrowdImamViewStyle") == "list";
    },
    "viewAsGallery": function() {
        return pageSession.get("AdminDashboardAdminImamsCrowdImamsCrowdImamViewStyle") == "gallery";
    }
});


Template.AdminDashboardAdminImamsCrowdImamsCrowdImamViewTable.rendered = function() {

};

Template.AdminDashboardAdminImamsCrowdImamsCrowdImamViewTable.events({
    "click .th-sortable": function(e, t) {
        e.preventDefault();
        var oldSortBy = pageSession.get("AdminDashboardAdminImamsCrowdImamsCrowdImamViewSortBy");
        var newSortBy = $(e.target).attr("data-sort");

        pageSession.set("AdminDashboardAdminImamsCrowdImamsCrowdImamViewSortBy", newSortBy);
        if(oldSortBy == newSortBy) {
            var sortAscending = pageSession.get("AdminDashboardAdminImamsCrowdImamsCrowdImamViewSortAscending") || false;
            pageSession.set("AdminDashboardAdminImamsCrowdImamsCrowdImamViewSortAscending", !sortAscending);
        } else {
            pageSession.set("AdminDashboardAdminImamsCrowdImamsCrowdImamViewSortAscending", true);
        }
    }
});

Template.AdminDashboardAdminImamsCrowdImamsCrowdImamViewTable.helpers({
    "tableItems": function() {
        return AdminDashboardAdminImamsCrowdImamsCrowdImamViewItems(this.crowd_imams);
    }
});


Template.AdminDashboardAdminImamsCrowdImamsCrowdImamViewTableItems.rendered = function() {

};

Template.AdminDashboardAdminImamsCrowdImamsCrowdImamViewTableItems.events({
    "click td": function(e, t) {
        e.preventDefault();
        /**/
        return false;
    },
    'click #add_event': function(e, t) {
        e.preventDefault();
        //FIXME: Possible that this will clash with existing id in Events?
        Imams.insert(this);
        CrowdImams.remove({_id: this._id});
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
                        CrowdImams.remove({ _id: me._id });
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

Template.AdminDashboardAdminImamsCrowdImamsCrowdImamViewTableItems.helpers({

});
