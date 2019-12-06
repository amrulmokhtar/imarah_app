this.App = {};
this.Helpers = {};
Logger.setLevel("famous-views", "info");



Meteor.startup(function() {

    if(Meteor.isClient){
        L.Icon.Default.imagePath = 'images/leaflet'
        //Code for using Famono dependency scanning
        //TODO: switch to Famono once it's more stable? Should result in smaller js download
        //require("leaflet");
        //require("bootstrap-timepicker/js/bootstrap-timepicker");
        //require("bootstrap-timepicker/css/bootstrap-timepicker");
        //require("c3");
    }
    if (Meteor.isCordova) {

        this.iCompassWatch=navigator.compass.watchHeading(
            function (heading) {
                var newHeading = Math.round(heading.magneticHeading);
                Session.set("heading",newHeading);
            },
            function (error) {
                alert("Error: " + error.code);
            }, {frequency : 80});
    }
});

App.logout = function() {
        Meteor.logout(function(err) {
        });
};

Helpers.menuItemClass = function(routeName) {
        if(!routeGranted(routeName)) {
                return "hidden";
        }

        if(!Router.current()) {
                return "";
        }

        if(!Router.routes[routeName]) {
                return "";
        }

        var currentPath = Router.routes[Router.current().route.getName()].handler.path;
        var routePath = Router.routes[routeName].handler.path;

        if(routePath === "/") {
                return currentPath == routePath ? "active" : "";
        }

        return currentPath.indexOf(routePath) === 0 ? "active" : "";
};

Helpers.userFullName = function() {
        var name = "";
        if(Meteor.user() && Meteor.user().profile)
                name = Meteor.user().profile.name;
        return name;
};

Helpers.userEmail = function() {
        var email = "";
        if(Meteor.user() && Meteor.user().profile)
                email = Meteor.user().profile.email;
        return email;
};

Helpers.secondsToTime = function(seconds, timeFormat) {
        return secondsToTime(seconds, timeFormat);
};

Helpers.formatDate = function(date, dateFormat) {
        if(!date) {
                return "";
        }

        var f = dateFormat || "MM/DD/YYYY";

        if(_.isString(date)) {
                if(date.toUpperCase() == "NOW") {
                        date = new Date();
                }
                if(date.toUpperCase() == "TODAY") {
                        d = new Date();
                        date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
                }
        }

        return moment(date).format(f);
};

Helpers.integerToYesNo = function(i) {
        return i ? "Yes" : "No";
};

Helpers.integerToTrueFalse = function(i) {
        return i ? "True" : "False";
};

_.each(Helpers, function (helper, key) {
        Handlebars.registerHelper(key, helper);
});

UI.registerHelper('monthNum', function(){
    return new Date().getMonth();
});

UI.registerHelper('keyInArrayAt', function(key, array, index){
    return array[index][key];
})

UI.registerHelper('today',function(){return new Date()});

UI.registerHelper('formatDate',function(date,format){
    return moment(date).format(format);
});

UI.registerHelper('whiteToUnder',function(strng){
    return strng.replace(/\s+/g,'_');
});

UI.registerHelper('encodeURI',function(strng){
    return encodeURI(strng);
});

UI.registerHelper('empty',function(containerWithLength){
    console.log(containerWithLength);
    if(containerWithLength.hasOwnProperty('length')){
        return containerWithLength.length == 0;
    }
    if(containerWithLength.count){
        return containerWithLength.count == 0;
    }

});

UI.registerHelper('roundNumber',function(number,places){
    if(!number){return 0};
    if(typeof(places) != typeof(1)){places = 3}
    return parseFloat(parseFloat(number).toPrecision(places || 3));
});

UI.registerHelper('islamicDate',function(date){
    var cal = $.calendars.instance('Islamic');
    var date =  cal.today().fromJSDate(date);
    return date.formatDate('MM yyyy');
});