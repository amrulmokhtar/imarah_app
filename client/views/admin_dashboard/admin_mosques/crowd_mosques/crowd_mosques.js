var pageSession = new ReactiveDict();

Template.AdminDashboardAdminMosquesCrowdMosques.rendered = function() {

};

Template.AdminDashboardAdminMosquesCrowdMosques.events({
    'click #page-close-button': function(e, t) {
        e.preventDefault();
        Router.go('', {});
    }
});

Template.AdminDashboardAdminMosquesCrowdMosques.helpers({

});

var AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewItems =
    function(cursor) {
        if (!cursor) {
            return [];
        }

        var searchString = pageSession.get(
            'AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewSearchString');
        var sortBy = pageSession.get('AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewSortBy');
        var sortAscending = pageSession.get('AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewSortAscending');
        if (typeof(sortAscending) == 'undefined') sortAscending = true;

        var raw = cursor.fetch();

        // filter
        var filtered = [];
        if (!searchString || searchString == '') {
            filtered = raw;
        } else {
            searchString = searchString.replace('.', '\\.');
            var regEx = new RegExp(searchString, 'i');
            var searchFields = ['name', 'type', 'friday_prayers', 'description', 'amenities', 'longitude', 'latitude', 'phone_number', 'email', 'facebook', 'twitter', 'website', 'address_1', 'city', 'district', 'postcode', 'state', 'country', 'timezone', 'managers', 'picture'];
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

var AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewExport = function(cursor, fileType) {
    var data = AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewItems(cursor);
    var exportFields = [];

    var str = convertArrayOfObjects(data, exportFields, fileType);

    var filename = 'export.' + fileType;

    downloadLocalResource(str, filename, 'application/octet-stream');
};


Template.AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueView.rendered = function() {
    pageSession.set('AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewStyle', 'table');

};

Template.AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueView.events({
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
                pageSession.set('AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewSearchString', searchString);
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
                    pageSession.set('AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewSearchString', searchString);
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
                    pageSession.set('AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewSearchString', '');
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
        AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewExport(this.crowd_mosques, "csv");
    },

    "click #dataview-export-csv": function(e, t) {
        e.preventDefault();
        AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewExport(this.crowd_mosques, "csv");
    },

    "click #dataview-export-tsv": function(e, t) {
        e.preventDefault();
        AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewExport(this.crowd_mosques, "tsv");
    },

    "click #dataview-export-json": function(e, t) {
        e.preventDefault();
        AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewExport(this.crowd_mosques, "json");
    }
});

Template.AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueView.helpers({
    "isEmpty": function() {
        return !this.crowd_mosques || this.crowd_mosques.count() == 0;
    },
    "isNotEmpty": function() {
        return this.crowd_mosques && this.crowd_mosques.count() > 0;
    },
    "isNotFound": function() {
        return this.crowd_mosques && pageSession.get("AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewSearchString") && AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewItems(this.crowd_mosques).length == 0;
    },
    "searchString": function() {
        return pageSession.get("AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewSearchString");
    },
    "viewAsTable": function() {
        return pageSession.get("AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewStyle") == "table";
    },
    "viewAsList": function() {
        return pageSession.get("AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewStyle") == "list";
    },
    "viewAsGallery": function() {
        return pageSession.get("AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewStyle") == "gallery";
    }
});


Template.AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewTable.rendered = function() {

};

Template.AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewTable.events({
    "click .th-sortable": function(e, t) {
        e.preventDefault();
        var oldSortBy = pageSession.get("AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewSortBy");
        var newSortBy = $(e.target).attr("data-sort");

        pageSession.set("AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewSortBy", newSortBy);
        if(oldSortBy == newSortBy) {
            var sortAscending = pageSession.get("AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewSortAscending") || false;
            pageSession.set("AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewSortAscending", !sortAscending);
        } else {
            pageSession.set("AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewSortAscending", true);
        }
    }
});

Template.AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewTable.helpers({
    "tableItems": function() {
        return AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewItems(this.crowd_mosques);
    }
});


Template.AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewTableItems.rendered = function() {

};

Template.AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewTableItems.events({
    "click td": function(e, t) {
        e.preventDefault();
        /**/
        return false;
    },
    'click #add_event': function(e, t) {
        e.preventDefault();
        //FIXME: Possible that this will clash with existing id in Events?
        Mosques.insert(this);
        CrowdMosques.remove({_id: this._id});
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
                        CrowdMosques.remove({ _id: me._id });
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

Template.AdminDashboardAdminMosquesCrowdMosquesCrowdMosqueViewTableItems.helpers({

});
