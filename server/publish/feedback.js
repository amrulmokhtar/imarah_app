/**
 * Created by ryan on 20/01/15.
 */

Meteor.publish('feedback_for_mosque', function(mosque_id){

    //var mong_id = new MongoInternals.NpmModule.ObjectID(mosque_id._str);
    //console.log(mong_id);
    var sub = Feedback.find({mosque_id:mosque_id});

    return sub;

})