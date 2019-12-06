Blaze._allowJavascriptUrls();

Session.setDefault('menuTransition2','slideWindowLeft');
//Initializing
var menuActivityArray = [];
//Logger.setLevel("famous-views", "info");

Template.MobileLayout.helpers({
    contentTransition : function(){
        return Session.get('menuTransition2');
    }
})

//Hacky code to prevent touchstart from opening links in a scrollview while being scrolled
var ox, oy;

var getPointerEvent = function(event) {
    return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
}

//Capture events on the entire scope
Template.MobileLayout.events({
    'click a' : function(evt){
        globalmenuClose();
        evt.preventDefault();


        Router.go($(evt.currentTarget).attr('href'));

    },
    //'touchstart'
    // Ensure that page does not reload on every touch event
    'touchstart a': function (evt) {
        globalmenuClose();

        var pointer = getPointerEvent(evt);
        ox = pointer.pageX;
        oy = pointer.pageY;


        evt.preventDefault();

        return false;
    },//*/
    'touchend a': function (evt) {

        var pointer = evt.originalEvent.changedTouches[0];
        var cx = pointer.pageX;
        var cy = pointer.pageY;

        evt.preventDefault();
        if(ox>cx-1 && ox<cx+1 && oy>cy-1 && oy<cy+1) {

            Router.go($(evt.currentTarget).attr('href'));

        }

    }

});

Template.menu.helpers({
    size4: function () {
        return [ 400, (window.innerHeight)]
    }
});

//default side menu tab space.
Template.MobileLayout.rendered = function () {
};

//Menu opening done in a non-reactive way in order to minimize
//use of Tracker callbacks to improve rendering performance

// Doesn't really help though
var Transform = famous.core.Transform;

globalmenu = null;
globalmenuOpen = false;
globalmenuClose = function() {
    globalmenu.modifier.setTransform(
        Transform.translate(0, 0)
    );
    globalmenuOpen = false;
};

globalmenuToggle = function() {
    if (globalmenuOpen) {
        globalmenuClose();
    } else {
        globalmenu.modifier.setTransform(
            Transform.translate(250, 0)
        );
        globalmenuOpen = true;
    }
};

//Menu tabs activity

Template.newsFeed.helpers({
    activity: function () {
       var menuActivity = Session.get('menuActivity')[0];
        return menuActivity;
    },
    cardSize: function () {
        var size = ((window.innerHeight-120)/6);
     /*   if (size > 67) {
            size = 67;
        } else {
            var tabSpace = Session.get('tabSpace');
            tabSpace[1] = size;
            Session.set('tabSpace', tabSpace);
        } */
        return [250,size];
    },
    menuSize: function(){
        return [250, 70];
    }
});

Template.newsContained.events({
    'click #news': function () {
        setCurrentMenu(0);
    }
});

Template.myEvents.helpers({
    activity: function () {
        var menuActivity = Session.get('menuActivity')[1];
        return menuActivity;
    },
    cardSize: function () {
        var size = ((window.innerHeight-120)/6);
   /*      if (size > 67) {
            size = 67;
        } else {
            var tabSpace = Session.get('tabSpace');
            tabSpace[2] = size;
            Session.set('tabSpace', tabSpace);
        } */
        return [250,size];
    }
});

Template.eventsContained.events({
    'click #events': function () {
        setCurrentMenu(1);
    }
});

Template.mosqueLocatorLink.helpers({
    activity: function () {
        var menuActivity = Session.get('menuActivity')[2];
        return menuActivity;
    },
    cardSize: function () {
        var size = ((window.innerHeight-120)/6);
    /*     if (size > 67) {
            size = 67;
        } else {
            var tabSpace = Session.get('tabSpace');
            tabSpace[3] = size;
            Session.set('tabSpace', tabSpace);
        } */
        return [250,size];
    }
});

Template.mosqueContained.events({
    'click #mosqueId': function () {
        setCurrentMenu(2);
    }
});

Template.qiblatDirection.helpers({
    activity: function () {
        var menuActivity = Session.get('menuActivity')[3];
        return menuActivity;
    },
    cardSize: function () {
        var size = ((window.innerHeight-120)/6);
      /*   if (size > 67) {
            size = 67;
        } else {
            var tabSpace = Session.get('tabSpace');
            tabSpace[4] = size;
            Session.set('tabSpace', tabSpace);
        } */
        return [250,size];
    }
});

Template.qiblatContained.events({
    'click #qiblat': function () {
        setCurrentMenu(3)
    }
});

Template.prayerTimes.helpers({
    activity: function () {
        var menuActivity = Session.get('menuActivity')[4];
        return menuActivity;
    },
    cardSize: function () {
        var size = ((window.innerHeight-120)/6);
        /* if (size > 67) {
            size = 67;
        } else {
            var tabSpace = Session.get('tabSpace');
            tabSpace[5] = size;
            Session.set('tabSpace', tabSpace);
        } */
        return [250,size];
    }
});

Template.prayerContained.events({
    'click #prayer': function () {
        setCurrentMenu(4);
    }
});

Template.alQuran.helpers({
    activity: function () {
        var menuActivity = Session.get('menuActivity')[5];
        return menuActivity;
    },
    cardSize: function () {
        var size = ((window.innerHeight-120)/6);
    /*     if (size > 67) {
            size = 67;
        } else {
            var tabSpace = Session.get('tabSpace');
            tabSpace[6] = size;
            Session.set('tabSpace', tabSpace);
        }*/
        return [250,size];
    }
});

Template.alQuranContained.events({
    'click #alQuran': function () {
        setCurrentMenu(5);
    }
});

Template.profileBottom.helpers({
    cardSize: function () {
       // var size = ((window.innerHeight-80)/7);
        return [250,40];
    }
});


Template.profileHeaderView.events({
    'click #profileView': function () {
        setDefaultMenuActivity();
        Session.set('menuActivity', menuActivityArray);
    }
});


var setDefaultMenuActivity = function () {
    for ( var i = 0; i < 6; i++ ) {
        menuActivityArray[i] = 'strip';
    }
}

var setCurrentMenu = function(id) {
    setDefaultMenuActivity();
    menuActivityArray[id] = 'menuActive';
    Session.set('menuActivity', menuActivityArray);
};

// In the beginning, News feed is active.
setDefaultMenuActivity();
menuActivityArray[0] = 'menuActive';

Session.setDefault('menuActivity', menuActivityArray);

//Capture menu view to be stored in global scope
Template.menu.created = function() {
    var fview = FView.from(this);
    globalmenu = fview;
};

Template.menu.rendered = function () {
    // ...
     FView.from(this).modifierTransition = { curve: 'easeInOut', duration: 1000 };
};

Template.profileHeader.helpers({
    cardSize: function () {
       // var size = (window.innerHeight/8);
        return [250,80];
    }
});

Template.profileHeaderView.events({
    'click #profileView': function () {
        Session.set('menuTransition2', 'slideWindowLeft');
    }
});

Template.yieldContainer.rendered = function () {
    // ...
     FView.from(this).modifierTransition = { curve: 'easeOut', duration: 500 };

};
/*
Template.profileSpace.helpers({
    cardSize: function () {
        var tabSpace = Session.get('tabSpace'), sum = 0;
        for(var j=0 ; j < 8; j++) {
            sum += tabSpace[j];
        }
        return [250, (window.innerHeight - sum) ];
    }
});
*/