Template.Quran.rendered = function() {
	
};

Template.Quran.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.Quran.helpers({

});
