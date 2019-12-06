Template.PrayerTimes.rendered = function() {
	
};

Template.PrayerTimes.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.PrayerTimes.helpers({

});
