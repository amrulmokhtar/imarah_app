parseID = function(id){
    if(id && typeof(id) == typeof("")){
        initArg = id.split('(');
        if (initArg.length > 1){
            if (initArg[0] == "ObjectID" ){
                return eval("new Meteor.Collection." + id);
            }else{
                return eval(id);
            }
        }else{
            return id;
        }
    } else {
        return id;
    }
}

EventController = RouteController.extend({
    waitOn: function () {
        var ev_sub = Meteor.subscribe("single_event", this.params._id);
        var ev = Events.findOne();
        if(ev){
            var other_subs = [Meteor.subscribe("single_mosque", parseID(ev.mosque_id))]
            if(ev.imams){
                other_subs.push(Meteor.subscribe("single_imam", parseID(ev.imams[0])));
            }
        }

        return [
            ev_sub
        ].concat(other_subs);
    },

    data: function () {
        //var ev_sub = Meteor.subscribe("single_event", this.params._id);
        var ev = Events.findOne();//{_id:parseID(this.params._id)});
        //console.log(ev);
        var toreturn = {
            event: ev
        };
        if(ev){
            toreturn.mosque = Mosques.findOne({_id:parseID(ev.mosque_id)});
            if(ev.imams){
                toreturn.imam = Imams.findOne({_id:parseID(ev.imams[0])});
            }
        }
        return toreturn;
    },

    action: function () {
        this.render();
    }
});
