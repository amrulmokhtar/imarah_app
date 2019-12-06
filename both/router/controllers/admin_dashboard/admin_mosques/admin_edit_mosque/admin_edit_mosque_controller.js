this.AdminDashboardAdminMosquesAdminEditMosqueController = RouteController.extend({
    template: "AdminDashboard",
    yieldTemplates: {
        'AdminDashboardAdminMosquesAdminEditMosque': { to: 'AdminDashboardSubcontent'}
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
        //console.log(this.params.mosqueId);
        initArg = this.params.mosqueId.split('(');
        var mos;
        if (initArg.length > 1){
            console.log(initArg);
            if (initArg[0] == "ObjectID" ){
                this.params.mosqueId = "new Meteor.Collection." + this.params.mosqueId;
                console.log(this.params.mosqueId);
                mos = Meteor.subscribe("admin_edit_mosque", eval(this.params.mosqueId))
            }else{
                mos = Meteor.subscribe("admin_edit_mosque", eval(this.params.mosqueId))
            }

        }else{
            mos = Meteor.subscribe("admin_edit_mosque",this.params.mosqueId);
        }
            return [
                Meteor.subscribe("mosque_city"),
                Meteor.subscribe("mosque_countries"),
                Meteor.subscribe("mosque_timezones"),
                Meteor.subscribe("users"),
                mos
                //Meteor.subscribe("admin_edit_mosque", this.params.mosqueId)
            ];
            /*WAIT_FUNCTION*/
        },
        data: function() {
            var id;
            initArg = this.params.mosqueId.split('(');
            var mos;
            if (initArg.length > 1){
                console.log(initArg);
                if (initArg[0] == "ObjectID" ){
                    this.params.mosqueId = "new Meteor.Collection." + this.params.mosqueId;
                }
                mos = eval(this.params.mosqueId);
            }else{
                mos = this.params.mosqueId;
            }
            console.log(Mosques.find());
            console.log(Mosques.findOne({_id:this.params.mosqueId}, {}))
            return {
                params: this.params || {},
                mosque_city: Cities.find({}, {}),
                mosque_countries: Countries.find({}, {}),
                mosque_timezones: Timezones.find({}, {}),
                users: Users.find({}, {}),
                admin_edit_mosque: Mosques.findOne({_id:mos}, {})
            };
            /*DATA_FUNCTION*/
        },
        onAfterAction: function() {
        }
    });
