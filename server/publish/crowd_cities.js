Meteor.publish('crowd_cities', function() {
    return CrowdCities.find({},{});
});
