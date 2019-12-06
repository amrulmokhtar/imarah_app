Template.layout.rendered = function() {
    // scroll to anchor

    $('body').on('click', 'a', function(e) {
        var href = $(this).attr("href");
        if(!href) {
            return;
        }
        if(href.length > 1 && href.charAt(0) == "#") {
            var hash = href.substring(1);
            if(hash) {
                e.preventDefault();

                var offset = $('*[id="' + hash + '"]').offset();

                if (offset) {
                    $('html,body').animate({ scrollTop: offset.top - 50 }, 400);
                }
            }
        } else {
            if(href.indexOf("http://") != 0 && href.indexOf("https://") != 0 && href.indexOf("#") != 0) {
                $('html,body').scrollTop(0);
            }
        }
    });
    /*TEMPLATE_RENDERED_CODE*/
};
Session.setDefault('menuOpen', false);
Template.layout.events({
    'click #main-menu-toggle':function(){
         $('#main-menu').toggleClass('current');
     	 $('.page-content').toggleClass('condensed');
        }
    });

Template.headerIcon.famousEvents({
    click: function(){
        Session.set('menuOpen',!Session.get('menuOpen'))
    }
})


Template.PrivateLayout.events({
    'click #dropdownMenu1': function(e,t) {

        t.find('#manualdropdown').css('display', function(displ){
            if (displ == 'none') {
                return 'block';
            } else {
                return 'none';
            }
        });
    }
})
Template.PublicLayout.helpers({
    contentPush: function(){
        if(Session.get('menuOpen'))
        {
            return[200, 50, 200]
        }else{
            return[0, 50, 200]
        }
    },
    menuTranslate: function(){
        if(Session.get('menuOpen'))
        {
            return[0, 50, 200]
        }else{
            return[-window.outerWidth, 50, 200]
        }
    }
})

Template.PublicLayoutHomeMenu.rendered = function() {

};

Template.PublicLayoutHomeMenu.events({

});

Template.PublicLayoutHomeMenu.helpers({

});

Template.PublicLayoutRightMenu.rendered = function() {

};

Template.PublicLayoutRightMenu.events({

});

Template.PublicLayoutRightMenu.helpers({

});

Template.PrivateLayoutLoggedInMenu.rendered = function() {

};

Template.PrivateLayoutLoggedInMenu.events({

});

Template.PrivateLayoutLoggedInMenu.helpers({

});

Template.PrivateLayoutRightMenu.rendered = function() {

};

Template.PrivateLayoutRightMenu.events({

});

Template.PrivateLayoutRightMenu.helpers({

});
