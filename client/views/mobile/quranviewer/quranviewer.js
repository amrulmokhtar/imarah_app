/*****************************************************************************/
/* Quranviewer: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Quranviewer.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.Quranviewer.helpers({
    /*
     * Example:
     *  items: function () {
     *    return Items.find();
     *  }
     */
});

var tabs = {};
Session.setDefault('bookmarkedItems', tabs);

Template.surahContent.helpers({
    cards: function (sura) {
        sura = sura -1;
        //console.log(this.params.index)
        //var sura = this.params.index;
        //localStorage.getItem('alquranCurrentTarget'),
        var text = QuranData.Sura[parseInt(sura)+1][5]
        //localStorage.getItem('alquranTargetText'),
        var startOffset = Session.get('ayaOffset');
        var endOffset = startOffset + 15;
        var currentAya = startOffset;
        var cards = []
        //if (sura) {
            Quran.sura[sura].aya.slice(startOffset,endOffset).forEach(function(aya) {
                var card = {};
                card.arText = aya.text;
                card.text = QuranEn.sura[sura].aya[currentAya].text;
                card.myText = QuranMy.sura[sura].aya[currentAya].text;
                card.surahIndex = text.toUpperCase() + ' ' + (parseInt(sura)+1) + ':' + parseInt(currentAya + 1);

                //QuranEn.sura[sura].aya[currentAya].arText = aya.text;
                //QuranEn.sura[sura].aya[currentAya].myText = ;
                //QuranEn.sura[sura].aya[currentAya].surahIndex = text.toUpperCase() + ' ' + parseInt(sura + 1) + ':' + parseInt(currentAya + 1)
                var bItem = JSON.parse(window.localStorage.getItem('bookmarkedItems'));
                if(!bItem){
                    bItem = {};
                }
                if(bItem[QuranEn.sura[sura].aya[currentAya].myText] != undefined) {
                    card.bookMarkSign = 'fa-bookmark';
                } else {
                   card.bookMarkSign = 'fa-bookmark-o';
                }
                ++currentAya;
                cards.push(card);
            });
            return cards; //QuranEn.sura[sura].aya;
        /*} else {
            alert('link couldnt be saved');
            return null;
        }*/
    }
});

Template.surahCards.events({
    'click .bookmark': function (evt,tpl) {
        if ($(event.target).hasClass('fa-bookmark-o')) {

            $(event.target).removeClass('fa-bookmark-o');
            $(event.target).addClass('fa-bookmark');
            tabs = JSON.parse(window.localStorage.getItem('bookmarkedItems'));
            if(!tabs){
                tabs = {};
            }
            tabs[tpl['data']['var2']] = tpl['data'];
            window.localStorage.setItem('bookmarkedItems', JSON.stringify(tabs));

        } else if ($(event.target).hasClass('fa-bookmark')) {

            $(event.target).removeClass('fa-bookmark');
            $(event.target).addClass('fa-bookmark-o');
            tabs = JSON.parse(window.localStorage.getItem('bookmarkedItems'));
            if(!tabs){
                tabs = {};
            }
            delete tabs[tpl['data']['var2']];
            window.localStorage.setItem('bookmarkedItems', JSON.stringify(tabs));

        }

    }
});

Template.quranViewerHeader.events({
    'click #backButton1': function () {
        window.history.back();
    }
});

Template.quranViewerHeader.helpers({
    surah: function (index) {
        var text = QuranData.Sura[parseInt(index)][5]
        return 'Surah' + ' ' + text;
    }
});

/*****************************************************************************/
/* Quranviewer: Lifecycle Hooks */
/*****************************************************************************/
Template.Quranviewer.created = function () {
};

Template.Quranviewer.rendered = function () {
};

Template.Quranviewer.destroyed = function () {
};
