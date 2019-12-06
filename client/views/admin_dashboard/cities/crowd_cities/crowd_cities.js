var pageSession = new ReactiveDict();

Template.AdminDashboardCitiesCrowdCities.events({
    'click #page-close-button': function(e, t) {
        e.preventDefault();
        Router.go('', {});
    }
});

var AdminDashboardAdminCitiesCrowdCitiesImamViewItems = function(cursor) {
    if (!cursor) {
        return [];
    }

    var searchString = pageSession.get('AdminDashboardAdminCitiesCrowdCitiesImamViewSearchString');
    var sortBy = pageSession.get('AdminDashboardAdminCitiesCrowdCitiesImamViewSortBy');
    var sortAscending = pageSession.get('AdminDashboardAdminCitiesCrowdCitiesImamViewSortAscending');
    if (typeof(sortAscending) == 'undefined') sortAscending = true;

    var raw = cursor.fetch();

    // filter
    var filtered = [];
    if (!searchString || searchString == '') {
        filtered = raw;
    } else {
        searchString = searchString.replace('.', '\\.');
        var regEx = new RegExp(searchString, 'i');
        var searchFields = ['name', 'longitude', 'latitude',
                            'district', 'postcode',
                            'state', 'country', 'timezone'];
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

var AdminDashboardAdminCitiesCrowdCitiesImamViewExport =
    function(cursor, fileType) {
    var data = AdminDashboardAdminCitiesCrowdCitiesImamViewItems(cursor);
    var exportFields = [];

    var str = convertArrayOfObjects(data, exportFields, fileType);

    var filename = 'export.' + fileType;

    downloadLocalResource(str, filename, 'application/octet-stream');
};


Template.AdminDashboardCitiesCrowdCitiesView.rendered = function() {
    pageSession.set('AdminDashboardAdminCitiesCrowdCitiesImamViewStyle', 'table');
};

Template.AdminDashboardCitiesCrowdCitiesView.events({
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
                pageSession.set('AdminDashboardAdminCitiesCrowdCitiesImamViewSearchString', searchString);
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
                    pageSession.set('AdminDashboardAdminCitiesCrowdCitiesImamViewSearchString', searchString);
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
                    pageSession.set('AdminDashboardAdminCitiesCrowdCitiesImamViewSearchString', '');
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
        AdminDashboardAdminCitiesCrowdCitiesImamViewExport(this.crowd_events, "csv");
    },

    "click #dataview-export-csv": function(e, t) {
        e.preventDefault();
        AdminDashboardAdminCitiesCrowdCitiesImamViewExport(this.crowd_events, "csv");
    },

    "click #dataview-export-tsv": function(e, t) {
        e.preventDefault();
        AdminDashboardAdminCitiesCrowdCitiesImamViewExport(this.crowd_events, "tsv");
    },

    "click #dataview-export-json": function(e, t) {
        e.preventDefault();
        AdminDashboardAdminCitiesCrowdCitiesImamViewExport(this.crowd_events, "json");
    }
});

Template.AdminDashboardCitiesCrowdCitiesView.helpers({
    "isEmpty": function() {
        return !this.crowd_cities || this.crowd_cities.count() == 0;
    },
    "isNotEmpty": function() {
        return this.crowd_cities && this.crowd_cities.count() > 0;
    },
    "isNotFound": function() {
        return this.crowd_events && pageSession.get("AdminDashboardAdminCitiesCrowdCitiesImamViewSearchString") && AdminDashboardAdminCitiesCrowdCitiesImamViewItems(this.crowd_events).length == 0;
    },
    "searchString": function() {
        return pageSession.get("AdminDashboardAdminCitiesCrowdCitiesImamViewSearchString");
    },
    "viewAsTable": function() {
        return pageSession.get("AdminDashboardAdminCitiesCrowdCitiesImamViewStyle") == "table";
    },
    "viewAsList": function() {
        return pageSession.get("AdminDashboardAdminCitiesCrowdCitiesImamViewStyle") == "list";
    },
    "viewAsGallery": function() {
        return pageSession.get("AdminDashboardAdminCitiesCrowdCitiesImamViewStyle") == "gallery";
    }
});


Template.CrowdCitiesViewTable.events({
    "click .th-sortable": function(e, t) {
        e.preventDefault();
        var oldSortBy = pageSession.get("AdminDashboardAdminCitiesCrowdCitiesImamViewSortBy");
        var newSortBy = $(e.target).attr("data-sort");

        pageSession.set("AdminDashboardAdminCitiesCrowdCitiesImamViewSortBy", newSortBy);
        if(oldSortBy == newSortBy) {
            var sortAscending = pageSession.get("AdminDashboardAdminCitiesCrowdCitiesImamViewSortAscending") || false;
            pageSession.set("AdminDashboardAdminCitiesCrowdCitiesImamViewSortAscending", !sortAscending);
        } else {
            pageSession.set("AdminDashboardAdminCitiesCrowdCitiesImamViewSortAscending", true);
        }
    }
});


Template.CrowdCitiesViewTable.helpers({
    "tableItems": function() {

        return AdminDashboardAdminCitiesCrowdCitiesImamViewItems(CrowdCities.find({}));
    }
});


Template.CrowdCitiesItems.events({
    "click td": function(e, t) {
        e.preventDefault();
        /**/
        return false;
    },
    'click #add_event': function(e, t) {
        e.preventDefault();
        //FIXME: Possible that this will clash with existing id in Cities?
        Cities.insert(this);
        CrowdCities.remove({_id: this._id});
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
                        CrowdCities.remove({ _id: me._id });
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
