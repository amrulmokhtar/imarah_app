var pageSession = new ReactiveDict();

Template.AdminDashboardAdminEventsCrowdEvents.rendered = function() {

};

Template.AdminDashboardAdminEventsCrowdEvents.events({
    'click #page-close-button': function(e, t) {
        e.preventDefault();
        Router.go('', {});
    }
});

Template.AdminDashboardAdminEventsCrowdEvents.helpers({

});

var AdminDashboardAdminEventsCrowdEventsImamViewItems = function(cursor) {
    if (!cursor) {
        return [];
    }

    var searchString = pageSession.get('AdminDashboardAdminEventsCrowdEventsImamViewSearchString');
    var sortBy = pageSession.get('AdminDashboardAdminEventsCrowdEventsImamViewSortBy');
    var sortAscending = pageSession.get('AdminDashboardAdminEventsCrowdEventsImamViewSortAscending');
    if (typeof(sortAscending) == 'undefined') sortAscending = true;

    var raw = cursor.fetch();

    // filter
    var filtered = [];
    if (!searchString || searchString == '') {
        filtered = raw;
    } else {
        searchString = searchString.replace('.', '\\.');
        var regEx = new RegExp(searchString, 'i');
        var searchFields = ['name', 'longitude', 'latitude', 'seats', 'type',
                            'topic', 'picture', 'imams', 'mosque_id', 'website',
                            'address_1', 'city', 'district', 'postcode',
                            'state', 'country', 'timezone', 'date', 'time'];
        filtered = _.filter(raw, function(item) {
            var match = false;
            _.each(searchFields, function(field) {
                var value = (getPropertyValue(field, item) || '') + '';

                match = match || (value && value.match(regEx));
                if (match) {
                    return false;
                }
            });
                return match;
        });
    }

    // sort
    if (sortBy) {
        filtered = _.sortBy(filtered, sortBy);

        // descending?
        if (!sortAscending) {
            filtered = filtered.reverse();
        }
    }

    return filtered;
};

var AdminDashboardAdminEventsCrowdEventsImamViewExport =
    function(cursor, fileType) {
    var data = AdminDashboardAdminEventsCrowdEventsImamViewItems(cursor);
    var exportFields = [];

    var str = convertArrayOfObjects(data, exportFields, fileType);

    var filename = 'export.' + fileType;

    downloadLocalResource(str, filename, 'application/octet-stream');
};


Template.AdminDashboardAdminEventsCrowdEventsImamView.rendered = function() {
    pageSession.set('AdminDashboardAdminEventsCrowdEventsImamViewStyle', 'table');
};

Template.AdminDashboardAdminEventsCrowdEventsImamView.events({
    'submit #dataview-controls': function(e, t) {
        return false;
    },

    'click #dataview-search-button': function(e, t) {
        e.preventDefault();
        var form = $(e.currentTarget).parent();
        if (form) {
            var searchInput = form.find('#dataview-search-input');
            if (searchInput) {
                searchInput.focus();
                var searchString = searchInput.val();
                pageSession.set('AdminDashboardAdminEventsCrowdEventsImamViewSearchString', searchString);
            }

        }
        return false;
    },

    'keydown #dataview-search-input': function(e, t) {
        if (e.which === 13)
        {
            e.preventDefault();
            var form = $(e.currentTarget).parent();
            if (form) {
                var searchInput = form.find('#dataview-search-input');
                if (searchInput) {
                    var searchString = searchInput.val();
                    pageSession.set('AdminDashboardAdminEventsCrowdEventsImamViewSearchString', searchString);
                }

            }
            return false;
        }

        if (e.which === 27)
        {
            e.preventDefault();
            var form = $(e.currentTarget).parent();
            if (form) {
                var searchInput = form.find('#dataview-search-input');
                if (searchInput) {
                    searchInput.val('');
                    pageSession.set('AdminDashboardAdminEventsCrowdEventsImamViewSearchString', '');
                }

            }
            return false;
        }

        return true;
    },

    'click #dataview-insert-button': function(e, t) {
        e.preventDefault();
        /**/
    },

    "click #dataview-export-default": function(e, t) {
        e.preventDefault();
        AdminDashboardAdminEventsCrowdEventsImamViewExport(this.crowd_events, "csv");
    },

    "click #dataview-export-csv": function(e, t) {
        e.preventDefault();
        AdminDashboardAdminEventsCrowdEventsImamViewExport(this.crowd_events, "csv");
    },

    "click #dataview-export-tsv": function(e, t) {
        e.preventDefault();
        AdminDashboardAdminEventsCrowdEventsImamViewExport(this.crowd_events, "tsv");
    },

    "click #dataview-export-json": function(e, t) {
        e.preventDefault();
        AdminDashboardAdminEventsCrowdEventsImamViewExport(this.crowd_events, "json");
    }
});

Template.AdminDashboardAdminEventsCrowdEventsImamView.helpers({
    "isEmpty": function() {
        return !this.crowd_events || this.crowd_events.count() == 0;
    },
    "isNotEmpty": function() {
        return this.crowd_events && this.crowd_events.count() > 0;
    },
    "isNotFound": function() {
        return this.crowd_events && pageSession.get("AdminDashboardAdminEventsCrowdEventsImamViewSearchString") && AdminDashboardAdminEventsCrowdEventsImamViewItems(this.crowd_events).length == 0;
    },
    "searchString": function() {
        return pageSession.get("AdminDashboardAdminEventsCrowdEventsImamViewSearchString");
    },
    "viewAsTable": function() {
        return pageSession.get("AdminDashboardAdminEventsCrowdEventsImamViewStyle") == "table";
    },
    "viewAsList": function() {
        return pageSession.get("AdminDashboardAdminEventsCrowdEventsImamViewStyle") == "list";
    },
    "viewAsGallery": function() {
        return pageSession.get("AdminDashboardAdminEventsCrowdEventsImamViewStyle") == "gallery";
    }
});


Template.AdminDashboardAdminEventsCrowdEventsImamViewTable.rendered = function() {

};

Template.AdminDashboardAdminEventsCrowdEventsImamViewTable.events({
    "click .th-sortable": function(e, t) {
        e.preventDefault();
        var oldSortBy = pageSession.get("AdminDashboardAdminEventsCrowdEventsImamViewSortBy");
        var newSortBy = $(e.target).attr("data-sort");

        pageSession.set("AdminDashboardAdminEventsCrowdEventsImamViewSortBy", newSortBy);
        if(oldSortBy == newSortBy) {
            var sortAscending = pageSession.get("AdminDashboardAdminEventsCrowdEventsImamViewSortAscending") || false;
            pageSession.set("AdminDashboardAdminEventsCrowdEventsImamViewSortAscending", !sortAscending);
        } else {
            pageSession.set("AdminDashboardAdminEventsCrowdEventsImamViewSortAscending", true);
        }
    }
});

Template.AdminDashboardAdminEventsCrowdEventsImamViewTable.helpers({
    "tableItems": function() {
        return AdminDashboardAdminEventsCrowdEventsImamViewItems(this.crowd_events);
    }
});


Template.AdminDashboardAdminEventsCrowdEventsImamViewTableItems.rendered = function() {

};

Template.AdminDashboardAdminEventsCrowdEventsImamViewTableItems.events({
    "click td": function(e, t) {
        e.preventDefault();
        /**/
        return false;
    },
    'click #add_event': function(e, t) {
        e.preventDefault();
        //FIXME: Possible that this will clash with existing id in Events?
        Events.insert(this);
        CrowdEvents.remove({_id: this._id});
    },
    'click #delete-button': function(e, t) {
        e.preventDefault();
        var me = this;
        bootbox.dialog({
            message: 'Delete? Are you sure?',
            title: 'Delete',
            animate: false,
            buttons: {
                success: {
                    label: 'Yes',
                    className: 'btn-success',
                    callback: function() {
                        CrowdEvents.remove({ _id: me._id });
                    }
                },
                danger: {
                    label: 'No',
                    className: 'btn-default'
                }
            }
        });
        return false;
    },
    'click #edit-button': function(e, t) {
        e.preventDefault();
        /**/
        return false;
    }
});

Template.AdminDashboardAdminEventsCrowdEventsImamViewTableItems.helpers({

});
