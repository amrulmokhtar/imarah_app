Template.MosqueDashboard.rendered = function() {

};

Template.MosqueDashboard.events({
    "click #page-close-button": function(e, t) {
        e.preventDefault();
        Router.go("", {});
    }
});

Template.MosqueDashboard.helpers({

});

Template.MosqueDashboardMosqueMenu.rendered = function() {

};

Template.MosqueDashboardMosqueMenu.events({

});

Template.MosqueDashboardMosqueMenu.helpers({
    "mosqueId":function(){
        return 1;
        if(mosqueId){
            return mosqueId;
        }else{
            return 1//managed_mosque._id;
        }
    }
});
