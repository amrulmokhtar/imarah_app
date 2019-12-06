Meteor.publish("mosque_city", function() {
	return Cities.find({}, {});
});

Meteor.publish("admin_all_cities", function() {
	return Cities.find({}, {});
});

Meteor.publish("cities_in_country", function(countryName) {
    return Cities.find({country:countryName}, {});
});

Meteor.publish("near_cities", function(userLocation,distance){
    Cities.find({location:{$near:{
        $geometry:
        {type:"Point",
         coordinates:userLocation
        },
        $maxDistance: distance
    }}})
})

Meteor.publish("all_cities", function() {
	return Cities.find({}, {});
});

Meteor.publish("edit_city", function(cityId) {
	return Cities.find({_id:cityId}, {});
});
