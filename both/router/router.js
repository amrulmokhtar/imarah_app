Router.configure({
    templateNameConverter: "upperCamelCase",
    routeControllerNameConverter: "upperCamelCase",
    layoutTemplate: "layout",
    notFoundTemplate: "notFound",
    loadingTemplate: "loading"
});

if(Meteor.isClient) {
    var publicRoutes = ["home_public", "login", "register", "forgot_password", "reset_password", "crowd_sourcing", "crowd_sourcing.success", "crowd_sourcing.contribute_mosque", "crowd_sourcing.contribute_imam", "crowd_sourcing.contribute_event", "reminders", "prayer_times", "forum", "quran"];
    var privateRoutes = ["home_private", "logout", "imam_dashboard", "imam_dashboard.imam_event_management", "imam_dashboard.imam_event_management.imam_new_event", "imam_dashboard.imam_event_management.imam_edit_event", "imam_dashboard.imam_setup_donation", "imam_dashboard.imam_profile", "imam_dashboard.imam_profile.imam_profile_update", "mosque_dashboard", "mosque_dashboard.verifyEmail","mosque_dashboard.verified","mosque_dashboard.mosque_event_management", "mosque_dashboard.mosque_event_management.mosque_new_event", "mosque_dashboard.mosque_event_management.mosque_edit_event", "mosque_dashboard.mosque_setup_donation","mosque_dashboard.events","mosque_dashboard.add_events","mosque_dashboard.edit_events","mosque_dashboard.finance","mosque_dashboard.feedback","mosque_dashboard.amenities", "mosque_dashboard.mosque_profile", "mosque_dashboard.mosque_profile.mosque_profile_update", "admin_dashboard", "admin_dashboard.admin_events", "admin_dashboard.admin_events.crowd_events", "admin_dashboard.admin_events.admin_new_event", "admin_dashboard.admin_events.admin_edit_event", "admin_dashboard.admin_mosques", "admin_dashboard.admin_mosques.crowd_mosques", "admin_dashboard.admin_mosques.admin_new_mosque", "admin_dashboard.admin_mosques.admin_edit_mosque", "admin_dashboard.admin_imams", "admin_dashboard.admin_imams.crowd_imams", "admin_dashboard.admin_imams.admin_new_imam", "admin_dashboard.admin_imams.admin_edit_imam", "admin_dashboard.admin_forum", "admin_dashboard.admin_forum.topics", "admin_dashboard.admin_forum.topics.new_topic", "admin_dashboard.admin_forum.topics.edit_topic", "admin_dashboard.cities", "admin_dashboard.cities.new_city", "admin_dashboard.cities.edit_city", "admin_dashboard.countries", "admin_dashboard.countries.new_country", "admin_dashboard.countries.edit_country", "admin_dashboard.timezones", "admin_dashboard.timezones.new_timezone", "admin_dashboard.timezones.edit_timezone"];

    var roleMap = [
        { route: "setup_mosque", roles:["admin","mosque"]},
        { route: "select_plan", roles:["admin","mosque"]},
        { route: "imam_dashboard", roles: ["admin","imam"] },
        { route: "imam_dashboard.imam_event_management", roles: ["admin","imam"] },
        { route: "imam_dashboard.imam_event_management.imam_new_event", roles: ["admin","imam"] },
        { route: "imam_dashboard.imam_event_management.imam_edit_event", roles: ["admin","imam"] },
        { route: "imam_dashboard.imam_setup_donation", roles: ["admin","imam"] },
        { route: "imam_dashboard.imam_profile", roles: ["admin","imam"] },
        { route: "imam_dashboard.imam_profile.imam_profile_update", roles: ["admin","imam"] },
        { route: "jais_dashboard",roles:["admin","mosque"]},
        { route: "jais_events",roles:["admin","mosque"]},
        { route: "jais_feedback", roles:["admin","mosque"]},
        { route: "mosque_dashboard", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.mosque_event_management", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.mosque_event_management.mosque_new_event", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.mosque_event_management.mosque_edit_event", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.mosque_setup_donation", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.mosque_profile", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.events", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.add_events", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.edit_events", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.finance", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.feedback", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.amenities", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.community", roles: ["admin", "mosque"]},
        { route: "mosque_dashboard.verifyEmail", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.verified", roles: ["admin","mosque"] },
        { route: "mosque_dashboard.mosque_profile.mosque_profile_update", roles: ["admin","mosque"] },
        { route: "admin_dashboard", roles: ["admin"] },
        { route: "admin_dashboard.admin_events", roles: ["admin"] },
        { route: "admin_dashboard.admin_events.crowd_events", roles: ["admin"] },
        { route: "admin_dashboard.admin_events.admin_new_event", roles: ["admin"] },
        { route: "admin_dashboard.admin_events.admin_edit_event", roles: ["admin"] },
        { route: "admin_dashboard.admin_mosques", roles: ["admin"] },
        { route: "admin_dashboard.admin_mosques.crowd_mosques", roles: ["admin"] },
        { route: "admin_dashboard.admin_mosques.admin_new_mosque", roles: ["admin"] },
        { route: "admin_dashboard.admin_mosques.admin_edit_mosque", roles: ["admin"] },
        { route: "admin_dashboard.admin_imams", roles: ["admin"] },
        { route: "admin_dashboard.admin_imams.crowd_imams", roles: ["admin"] },
        { route: "admin_dashboard.admin_imams.admin_new_imam", roles: ["admin"] },
        { route: "admin_dashboard.admin_imams.admin_edit_imam", roles: ["admin"] },
        { route: "admin_dashboard.admin_forum", roles: ["admin"] },
        { route: "admin_dashboard.admin_forum.topics", roles: ["admin"] },
        { route: "admin_dashboard.admin_forum.topics.new_topic", roles: ["admin"] },
        { route: "admin_dashboard.admin_forum.topics.edit_topic", roles: ["admin"] },
        { route: "admin_dashboard.cities", roles: ["admin"] },
        { route: "admin_dashboard.cities.new_city", roles: ["admin"] },
        { route: "admin_dashboard.cities.edit_city", roles: ["admin"] },
        { route: "admin_dashboard.countries", roles: ["admin"] },
        { route: "admin_dashboard.countries.new_country", roles: ["admin"] },
        { route: "admin_dashboard.countries.edit_country", roles: ["admin"] },
        { route: "admin_dashboard.timezones", roles: ["admin"] },
        { route: "admin_dashboard.timezones.new_timezone", roles: ["admin"] },
        { route: "admin_dashboard.timezones.edit_timezone", roles: ["admin"] }
    ];



    // this function returns true if user is in role allowed to access given route
    routeGranted = function(routeName) {
        if(!routeName) {
            // route without name - enable access (?)
            return true;
        }

        if(!roleMap || roleMap.length === 0) {
            // this app don't have role map - enable access
            return true;
        }

        var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
        if(!roleMapItem) {
            // page is not restricted
            return true;
        }

        if(!Meteor.user() || !Meteor.user().roles) {
            // user is not logged in
            return false;
        }

        // this page is restricted to some role(s), check if user is in one of allowedRoles
        var allowedRoles = roleMapItem.roles;
        var granted = _.intersection(allowedRoles, Meteor.user().roles);
        if(!granted || granted.length === 0) {
            return false;
        }

        return true;
    };

    roleHomepages = function(router){
        if (Meteor.user().roles.indexOf("admin") > -1)
        {
            router.redirect("admin_dashboard");
        }else if(Meteor.user().roles.indexOf("mosque") > -1){
            router.redirect("mosque_dashboard_noid");
        }else if(Meteor.user().roles.indexOf("imam") > -1){
            router.redirect("imam_dashboard");
        }else{
            router.redirect("home_private");
        }
    }

    Meteor.subscribe("current_user_data");

    Router.ensureLogged = function() {
        if(!Meteor.user()) {
            // user is not logged in - redirect to public home
            this.redirect("home_public");
            return;
        } else {
            // user is logged in - check role
            if(!routeGranted(this.route.name)) {
                // user is not in allowedRoles - redirect to private home
                roleHomepages(this);
                return;
            }
            this.next();
        }
    };

    Router.ensureNotLogged = function() {
        if(Meteor.user())
            roleHomepages(this);
        else
            this.next();
    };

    Router.onBeforeAction(function() {
        // loading indicator here
        if(!this.ready()) {
            $("body").addClass("wait");
        } else {
            $("body").removeClass("wait");
            this.next();
        }
    });

    Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
    Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});
}

Router.route('/', {name: 'newsfeed', layoutTemplate: 'MobileLayout'});
Router.route('/qiblat', {name: 'qiblat', layoutTemplate: 'MobileLayout'});
Router.route('/search',
             {name: 'search',
              layoutTemplate: 'MobileLayout',
              controller: 'SearchController'});

Router.route('/mosquelocator',
             {
                 name: 'mosquelocator',
                 layoutTemplate: 'MobileLayout',
                 controller: 'MosquelocatorController'
             });
Router.route('/event/:_id',
             {
                 name: 'event',
                 layoutTemplate: 'MobileLayout',
                 controller: 'EventController'
             });
Router.route('/imam/:_id',
             {name: 'imam',
              layoutTemplate: 'MobileLayout',
              controller:'ImamController'});

Router.route('/mosque/:_id',
             {name: 'mosque',
              layoutTemplate: 'MobileLayout',
              controller:'MosqueController'});


//Router.route('/event',{});

Router.route('/mosquemapview',{name:'mosquemapview', layoutTemplate: 'MobileLayout'});
Router.route('/profilesearch',{name:'profilesearch', layoutTemplate: 'MobileLayout'});
Router.route('/user', {name: 'userprofile', layoutTemplate: 'MobileLayout'});
Router.route('/userevents', {name: 'userevents', layoutTemplate: 'MobileLayout', controller:'UsereventsController'});
Router.route('/prayertimes', {name: 'prayertimes', layoutTemplate: 'MobileLayout'});
Router.route('/alquran', {name: 'alquran', layoutTemplate: 'MobileLayout'});
Router.route('/quranviewer/:index', {name: 'quranviewer', controller:'quranviewer', layoutTemplate: 'MobileLayout'});
Router.route('/myevents', {name: 'myevents', layoutTemplate: 'MobileLayout', controller:'UsereventsController'});
Router.route('/cardview', {name: 'cardview', layoutTemplate: 'MobileLayout'});
Router.route('/feedback', {name:'feedback', layoutTemplate: 'MobileLayout'});
Router.route('/thankyou', {name:'thankyou', layoutTemplate: 'MobileLayout'});
Router.route('/donate/:mosqueId', {name:'donate', layoutTemplate: 'MobileLayout'});
Router.route('/notification', {name:'notification', layoutTemplate: 'MobileLayout'});
Router.route('/donatethanks/:mosqueId', {name:'donatethanks', layoutTemplate: 'MobileLayout'});
Router.route('/zakat', {name: 'zakat', layoutTemplate: 'MobileLayout'});
Router.route('/zakathanks', {name: 'zakathanks', layoutTemplate: 'MobileLayout'});
Router.route('/bookamenity/:amenityId', {name: 'bookamenity', layoutTemplate: 'MobileLayout'});
Router.route('/bookingthanks', {name: 'bookingthanks', layoutTemplate: 'MobileLayout'});
Router.route('/checkin/:eventId', {name: 'checkinevent', layoutTemplate: 'MobileLayout',
                          controller: 'CheckinController'});
Router.route('/checkin/:mosqueId', {name: 'checkinmosque', layoutTemplate: 'MobileLayout',
                                   controller: 'CheckinController'});


Router.route('/nearbyevents', {name: 'nearbyevents',
    layoutTemplate: 'MobileLayout',
    controller:'NearbyEventsController'})
Router.route('/mosqueprofilesearch', {name: 'mosqueprofilesearch', layoutTemplate: 'MobileLayout'})

Router.map(function () {
    //this.route("home_public", {path: "/", controller: "HomePublicController"});
    this.route("login", {layoutTemplate:'cleanLayout', path: "/login", controller: "LoginController"});
    this.route("register", {layoutTemplate:'cleanLayout', path: "/register", controller: "RegisterController"});
    this.route("setup_mosque", {layoutTemplate:'cleanLayout', path: "/setup_mosque"});
    this.route("select_plan", {layoutTemplate:'cleanLayout', path: "/select_plan"});
    this.route("forgot_password", {path: "/forgot_password", controller: "ForgotPasswordController"});
    this.route("reset_password", {path: "/reset_password/:resetPasswordToken", controller: "ResetPasswordController"});
    //this.route("qiblat", {path: "/qiblat", controller: "QiblatController"});
    this.route("mosque_locator", {path: "/mosque_locator", controller: "MosqueLocatorController"});
    //this.route("search", {path: "/search", controller: "SearchController"});
    this.route("mosque_profile", {path: "/mosque_profile/:mosqueId", controller: "MosqueProfileController"});
    this.route("imam_profile", {path: "/imam_profile/:imamId", controller: "ImamProfileController"});
    this.route("activity_profile", {path: "/activity_profile/:activityId", controller: "ActivityProfileController"});

    this.route("crowd_sourcing", {path: "/crowd_sourcing", controller: "CrowdSourcingController"});
    this.route("crowd_sourcing.success", {path: "/crowd_sourcing/success", controller: "CrowdSourcingSuccessController"});
    this.route("crowd_sourcing.contribute_mosque", {path: "/crowd_sourcing/contribute_mosque", controller: "CrowdSourcingContributeMosqueController"});
    this.route("crowd_sourcing.contribute_imam", {path: "/crowd_sourcing/contribute_imam", controller: "CrowdSourcingContributeImamController"});
    this.route("crowd_sourcing.contribute_event", {path: "/crowd_sourcing/contribute_event", controller: "CrowdSourcingContributeEventController"});


    this.route("reminders", {path: "/reminders", controller: "RemindersController"});
    //this.route("prayer_times", {path: "/prayer_times", controller: "PrayerTimesController"});
    //this.route("forum", {path: "/forum", controller: "ForumController"});
    //this.route("quran", {path: "/quran", controller: "QuranController"});
    this.route("home_private", {path: "/home_private", controller: "HomePrivateController"});
    this.route("logout", {path: "/logout", controller: "LogoutController"});


    this.route("imam_dashboard", {path: "/imam_dashboard/:imamId", controller: "ImamDashboardController"});
    this.route("imam_dashboard.imam_event_management", {path: "/imam_dashboard/:imamId/imam_event_management", controller: "ImamDashboardImamEventManagementController"});
    this.route("imam_dashboard.imam_event_management.imam_new_event", {path: "/imam_dashboard/:imamId/imam_event_management/imam_new_event", controller: "ImamDashboardImamEventManagementImamNewEventController"});
    this.route("imam_dashboard.imam_event_management.imam_edit_event", {path: "/imam_dashboard/:imamId/imam_event_management/imam_edit_event/:eventId", controller: "ImamDashboardImamEventManagementImamEditEventController"});
    this.route("imam_dashboard.imam_setup_donation", {path: "/imam_dashboard/:imamId/imam_setup_donation", controller: "ImamDashboardImamSetupDonationController"});
    this.route("imam_dashboard.imam_profile", {path: "/imam_dashboard/:imamId/imam_profile", controller: "ImamDashboardImamProfileController"});
    this.route("imam_dashboard.imam_profile.imam_profile_update", {path: "/imam_dashboard/:imamId/imam_profile/imam_profile_update", controller: "ImamDashboardImamProfileImamProfileUpdateController"});

    this.route("jais_dashboard", {path: "/jais_dashboard"});
    this.route("jais_events", {path: "/jais_events"});
    this.route("jais_feedback", {path: "/jais_feedback"});
    this.route("mosque_dashboard", {path: "/mosque_dashboard/:mosqueId", controller: "MosqueDashboardController"});
    this.route("mosque_dashboard_noid", {path: "/mosque_dashboard/", controller: "MosqueDashboardController"});
    this.route("mosque_dashboard.mosque_event_management", {path: "/mosque_dashboard/:mosqueId/mosque_event_management", controller: "MosqueDashboardMosqueEventManagementController"});
    this.route("mosque_dashboard.mosque_event_management.mosque_new_event", {path: "/mosque_dashboard/:mosqueId/mosque_event_management/mosque_new_event", controller: "MosqueDashboardMosqueEventManagementMosqueNewEventController"});
    this.route("mosque_dashboard.mosque_event_management.mosque_edit_event", {path: "/mosque_dashboard/:mosqueId/mosque_event_management/mosque_edit_event/:eventId", controller: "MosqueDashboardMosqueEventManagementMosqueEditEventController"});
    this.route("mosque_dashboard.mosque_setup_donation", {path: "/mosque_dashboard/:mosqueId/mosque_setup_donation", controller: "MosqueDashboardMosqueSetupDonationController"});
    this.route("mosque_dashboard.mosque_profile", {path: "/mosque_dashboard/:mosqueId/mosque_profile", controller: "MosqueDashboardMosqueProfileController"});
    this.route("mosque_dashboard.mosque_profile.mosque_profile_update", {path: "/mosque_dashboard/:mosqueId/mosque_profile/mosque_profile_update", controller: "MosqueDashboardMosqueProfileMosqueProfileUpdateController"});

    this.route('mosque_dashboard.new_event_at',
               { path: "/mosque_dashboard/mosque_add_event/:date",
                 controller: 'MosqueDashboardnnewEventsController'});

    this.route("mosque_dashboard.profile", {path: "/mosque_dasboard/mosque_profile", controller: "MosqueDashboardMosqueProfileMosqueProfileUpdateController"});
    this.route("mosque_dashboard.events", {path: "/mosque_event", controller: "MosqueDashboardEventsController"});
    this.route("mosque_dashboard.add_events", {path: "/mosque_event/mosque_add_event", controller: "MosqueDashboardnnewEventsController"});
    this.route("mosque_dashboard.edit_events", {path: "/mosque_event/mosque_edit_event/:eventId", controller: "MosqueDashboardeditEventsController"});
    this.route("mosque_dashboard.finance", {path: "/mosque_finance", controller: "MosqueDashboardFinanceController"});
    this.route("mosque_dashboard.feedback", {path: "/mosque_feedback", controller: "MosqueDashboardfeedbackController"});
    this.route("mosque_dashboard.community", {path: "/mosque_community"});
    this.route("mosque_dashboard.amenities", {path: "/mosque_amenities", controller: "MosqueDashboardAmenitiesController"});
    this.route("mosque_dashboard.verifyEmail", { path: '/verify-email/:token', controller: "AccountControllerverification"});
    this.route("mosque_dashboard.verified", { path: '/verficaltion', controller: "AccountControllerverified"});

    this.route("admin_dashboard", {path: "/admin_dashboard", controller: "AdminDashboardController"});
    this.route("admin_dashboard.admin_events", {path: "/admin_dashboard/admin_events", controller: "AdminDashboardAdminEventsController"});
    this.route("admin_dashboard.admin_events.crowd_events", {path: "/admin_dashboard/admin_events/crowd_events", controller: "AdminDashboardAdminEventsCrowdEventsController"});
    this.route("admin_dashboard.admin_events.admin_new_event", {path: "/admin_dashboard/admin_events/admin_new_event", controller: "AdminDashboardAdminEventsAdminNewEventController"});
    this.route("admin_dashboard.admin_events.admin_edit_event", {path: "/admin_dashboard/admin_events/admin_edit_event/:eventId", controller: "AdminDashboardAdminEventsAdminEditEventController"});
    this.route("admin_dashboard.admin_mosques", {path: "/admin_dashboard/admin_mosques", controller: "AdminDashboardAdminMosquesController"});
    this.route("admin_dashboard.admin_mosques.crowd_mosques", {path: "/admin_dashboard/admin_mosques/crowd_mosques", controller: "AdminDashboardAdminMosquesCrowdMosquesController"});
    this.route("admin_dashboard.admin_mosques.admin_new_mosque", {path: "/admin_dashboard/admin_mosques/admin_new_mosque", controller: "AdminDashboardAdminMosquesAdminNewMosqueController"});
    this.route("admin_dashboard.admin_mosques.admin_edit_mosque", {path: "/admin_dashboard/admin_mosques/admin_edit_mosque/:mosqueId", controller: "AdminDashboardAdminMosquesAdminEditMosqueController"});
    this.route("admin_dashboard.admin_imams", {path: "/admin_dashboard/admin_imams", controller: "AdminDashboardAdminImamsController"});
    this.route("admin_dashboard.admin_imams.crowd_imams", {path: "/admin_dashboard/admin_imams/crowd_imams", controller: "AdminDashboardAdminImamsCrowdImamsController"});
    this.route("admin_dashboard.admin_imams.admin_new_imam", {path: "/admin_dashboard/admin_imams/admin_new_imam", controller: "AdminDashboardAdminImamsAdminNewImamController"});
    this.route("admin_dashboard.admin_imams.admin_edit_imam", {path: "/admin_dashboard/admin_imams/admin_edit_imam/:imamId", controller: "AdminDashboardAdminImamsAdminEditImamController"});
    this.route("admin_dashboard.admin_forum", {path: "/admin_dashboard/admin_forum", controller: "AdminDashboardAdminForumController"});
    this.route("admin_dashboard.admin_forum.topics", {path: "/admin_dashboard/admin_forum/topics", controller: "AdminDashboardAdminForumTopicsController"});
    this.route("admin_dashboard.admin_forum.topics.new_topic", {path: "/admin_dashboard/admin_forum/topics/new_topic", controller: "AdminDashboardAdminForumTopicsNewTopicController"});
    this.route("admin_dashboard.admin_forum.topics.edit_topic", {path: "/admin_dashboard/admin_forum/topics/edit_topic/:forum_topicId", controller: "AdminDashboardAdminForumTopicsEditTopicController"});
    this.route("admin_dashboard.cities", {path: "/admin_dashboard/cities", controller: "AdminDashboardCitiesController"});
    this.route("admin_dashboard.cities.new_city", {path: "/admin_dashboard/cities/new_city", controller: "AdminDashboardCitiesNewCityController"});
    this.route("admin_dashboard.cities.edit_city", {path: "/admin_dashboard/cities/edit_city/:cityId", controller: "AdminDashboardCitiesEditCityController"});
    this.route("admin_dashboard.countries", {path: "/admin_dashboard/countries", controller: "AdminDashboardCountriesController"});
    this.route("admin_dashboard.countries.new_country", {path: "/admin_dashboard/countries/new_country", controller: "AdminDashboardCountriesNewCountryController"});
    this.route("admin_dashboard.countries.edit_country", {path: "/admin_dashboard/countries/edit_country/:countryId", controller: "AdminDashboardCountriesEditCountryController"});
    this.route("admin_dashboard.timezones", {path: "/admin_dashboard/timezones", controller: "AdminDashboardTimezonesController"});
    this.route("admin_dashboard.timezones.new_timezone", {path: "/admin_dashboard/timezones/new_timezone", controller: "AdminDashboardTimezonesNewTimezoneController"});
    this.route("admin_dashboard.timezones.edit_timezone", {path: "/admin_dashboard/timezones/edit_timezone/:timezoneId", controller: "AdminDashboardTimezonesEditTimezoneController"});/*ROUTER_MAP*/
});
