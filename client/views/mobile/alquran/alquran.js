/*****************************************************************************/
/* Alquran: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.alquran.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Session.setDefault('quranTemplate', 'surahView');
Session.setDefault('quranTransition1', 'slideWindowLeft');
Session.setDefault('sura', 0);

var tabs = [
    {'status': 'quranTabActive', 'text': 'Surah', 'id': 'tab1'},
    {'status': '', 'text': 'Bookmarks', 'id': 'tab2'}
];

Session.setDefault('QuranTabsStatus', tabs);

var setActiveQuranTab = function (id) {
    var tabs = Session.get('QuranTabsStatus');
    switch(id) {
    case 0:
        tabs[0]['status'] = 'quranTabActive';
        tabs[1]['status'] = '';
        break;
    case 1:
        tabs[0]['status'] = '';
        tabs[1]['status'] = 'quranTabActive';
        break;
    }
    Session.set('QuranTabsStatus', tabs);
};

Template.alquran.helpers({
    'sura': function(sura) {
        return Session.get('sura');
    },
    size4: function () {
        var width = window.innerWidth,
        height = window.innerHeight;
        return [width, height];
    }
});

Template.alQuranHeaderBar.events({
    'click #tab1': function () {
        Session.set('quranTemplate', 'surahView');
        Session.set('quranTransition1', 'slideWindowRight');
        setActiveQuranTab(0);
    },
    'click #tab2': function () {
        Session.set('quranTemplate', 'bookmarkView');
        Session.set('quranTransition1', 'slideWindowLeft');
        setActiveQuranTab(1);
    }
});

Template.bookmarkView.helpers({
    booked: function () {
        var bookMarked = JSON.parse(
            window.localStorage.getItem('bookmarkedItems')) || {};
        arr = [];
        for(var r in bookMarked) {
            arr.push(bookMarked[r]);
        }
        return arr;
    }
});

Template.alQuranHeaderBar.helpers({
    tabs: function () {
        return Session.get('QuranTabsStatus');
    }
});

Template.quranRenderer.helpers({
    showQuranTemplate: function () {
        return Template[Session.get('quranTemplate')];
    },
    quranTransition1: function () {
        return Session.get('quranTransition1');
    },
    quranTemplate: function () {
        return Session.get('quranTemplate');
    }
});

Template.quranCards.events({
    'click': function (evt, tpl) {
        var index = tpl['data']['index'];
        //index = (parseInt(index.split('.')[0]) - 1);
        //localStorage.setItem('alquranCurrentTarget', index);
        //localStorage.setItem('alquranTargetText', tpl['data']['surahName']);
    }
});

Session.setDefault('surahOffset',0);

Template.surahView.helpers({
    quranCard: function () {
        var arr = [], index = 0;
        var offset = Session.get('surahOffset');
        for(var t =  offset; t < 20 + offset ; t++) {
        //    index = t+'.'
            arr.push({'index': t+1, 'surahName': QuranData.Sura[t+1][5] });
        }
        return arr; //QuranData;
    }
});

Session.setDefault('ayaOffset',0);
Template.quranViewer.helpers({

    'aya': function(sura) {
        var startOffset = Session.get('ayaOffset');
        var endOffset = startOffset + 15;
        var currentAya = startOffset;

        Quran.sura[sura].aya.slice(startOffset,endOffset).forEach(function(aya) {
            QuranEn.sura[sura].aya[currentAya].arText = aya.text;
            QuranEn.sura[sura].aya[currentAya].myText = QuranMy.sura[sura].aya[currentAya].text;
            ++currentAya;
        });
        // console.log(QuranData.Sura);
        return QuranEn.sura[sura].aya;
    }

});

Template.alQuranContainerHeader.helpers({
    'sura': function () {
        return Session.get('sura');
    }
});

Template.alQuranContainerHeader.events({

    'touchstart #backButton1': function (evt) {
        globalmenuToggle();
        evt.preventDefault();
    },
    'click #backButton1': function() {
        globalmenuToggle();
    },
    'change input': function(evt, tmpl) {
        Session.set('sura', evt.currentTarget.value);
    }
});

/*****************************************************************************/
/* alquran: Lifecycle Hooks */
/*****************************************************************************/
Template.alquran.created = function () {
};

Template.alquran.rendered = function () {
};

Template.alquran.destroyed = function () {
};
