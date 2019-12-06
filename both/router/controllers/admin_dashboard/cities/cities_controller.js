this.AdminDashboardCitiesController = RouteController.extend({
    template: 'AdminDashboard',
    yieldTemplates: {
        'AdminDashboardCities': { to: 'AdminDashboardSubcontent'}
        /*YIELD_TEMPLATES*/
    },
    onBeforeAction: function() {
        /*BEFORE_FUNCTION*/
        this.next();
    },
    action: function() {
        this.render();
        /*ACTION_FUNCTION*/
    },
    waitOn: function() {
        return [
            Meteor.subscribe('admin_all_cities'),
            Meteor.subscribe('crowd_cities')
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {
        return {
            params: this.params || {},
            admin_all_cities: Cities.find({}, {})
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});
