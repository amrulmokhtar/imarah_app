Meteor.publish('mosque_finances' , function(mosqueId) {
    return MosqueFinances.find({mosque_id: mosqueId}, {});
})


Meteor.publish('mosque_finances_by_user' , function(userId) {
    managed_mosque = Mosques.findOne({managers: userId},{});
    return MosqueFinances.find({mosque_id: managed_mosque._id}, {});
});
