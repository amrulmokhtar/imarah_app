Template.MosqueLocator.rendered = function() {
	
};

Template.MosqueLocator.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
});

Template.MosqueLocator.helpers({

});
