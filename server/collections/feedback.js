/**
 * Created by ryan on 14/01/15.
 */

Feedback.allow(
    {
        //TODO: secure this
        insert:function(){return true},
        remove: function(){return true},
        update: function(){return true}
    }
);

Feedback.before.insert(function(userId, doc){
    if(doc.for=='event'){
        var event = Events.findOne({_id:doc.event_id});
        event.rating = event.rating || 0;
        event.numRatings = event.numRatings || 0;

        var avgRating = ((event.numRatings*event.rating)+doc.rating)/(event.numRatings+1);
        var rating = {rating: avgRating};
        if(event.type='Friday Sermon'){
            rating.friday_rating = avgRating;
            doc.friday_rating = doc.rating;
        }
        Events.update({_id:doc.event_id},{
            $set: rating,
            $inc: {numRatings: 1}
        });

        //FIXME: THIS HAS TO BE REMOVED
        //FIXME: have to figure out when is the best time/way good
        Meteor.call('denormalizeMosque',Mosques.findOne({_id:event.mosque_id}),function(e,resp){
            delete resp._id;
            Mosques.update({_id:event.mosque_id},resp);
        })
    }
});