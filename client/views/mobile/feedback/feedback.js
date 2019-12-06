/*****************************************************************************/
/* Feedback: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Feedback.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Feedback.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

feedbackFormConst = function(){
  return {
    event_id:Session.get('rating_event_id'),
    mosque_id:Session.get('rating_mosque_id'),
    imam_ids:Session.get('rating_imam_id'),
    event_feedback:{
      for:'event',
      rating:null,
      comments:''
    },
    mosque_feedback:{
      for:'mosque',
      rating:null,
      comments:''
    },
    imam_feedback:{
      for:'feedback',
      rating:null,
      comments:''
    }
  }
};


var emo = [
  { 'img': 'rate1.png' , 'index': 0 },
  { 'img': 'rate2.png' , 'index': 1 },
  { 'img': 'rate3.png' , 'index': 2 },
  { 'img': 'rate4.png' , 'index': 3 },
  { 'img': 'rate5.png' , 'index': 4 }
],
    emoImg = [
  {'deselect': 'rate1.png', 'select': 'rate1-selected.png'},
  {'deselect': 'rate2.png', 'select': 'rate2-selected.png'},
  {'deselect': 'rate3.png', 'select': 'rate3-selected.png'},
  {'deselect': 'rate4.png', 'select': 'rate4-selected.png'},
  {'deselect': 'rate5.png', 'select': 'rate5-selected.png'}
],

    feedbackForm = feedbackFormConst();

Session.set('feedbackEmoticon', emo);
Session.set('btnStatus', 'Next');
Session.set('page','event');

Template.feedbackHeader.events({

  'click #backButton1': function () {

    var page = Session.get('page');
    feedbackForm[page+'_feedback'].comments = $('#comment_2').val();
  //Empy comment Box
  //document.getElementById('comment_2').value = '';

    if (page == 'event') {
      Router.go('/notification');
    } else if (page == 'mosque') {
      Session.set('page','event');
      //Set transition and current page
      Session.set('feedMenuTrans', 'slideWindowRight');
      Session.set('feedMenuTemplate', 'eventSurface');
      Session.set('btnStatus', 'Next');

    } else if (page == 'imam') {
      Session.set('page','mosque');
      Session.set('btnStatus', 'Next');
      Session.set('feedMenuTrans', 'slideWindowRight');
      Session.set('feedMenuTemplate', 'mosqueSurface');
    }
    //Set Emoticons to default on page transition
    var emo = Session.get('feedbackEmoticon');

    //Set default emoticon status
    var emo = setDefaultEmoticon(emo);

    Session.set('feedbackEmoticon', emo);

  }, 
  'click #nextChooser': function () {
    var page = Session.get('page');
    //Empy comment Box
    feedbackForm[page+'_feedback'].comments = $('#comment_2').val();
    //document.getElementById('comment_2').value = '';

    if (page=='event') {

      Session.set('page','mosque');
      Session.set('feedMenuTrans', 'slideWindowLeft');
        Session.set('feedMenuTemplate', 'mosqueSurface');
      Session.set('btnStatus', 'Next');


    } else if (page=='mosque') {

      Session.set('page','imam');
      Session.set('feedMenuTrans', 'slideWindowLeft');
      Session.set('feedMenuTemplate', 'imamSurface');

      Session.set('btnStatus', 'Submit');

    } else if (page=='imam') {
      var meta = {
        user_name: Meteor.user().profile.name,
        user_id: Meteor.userId(),
        imam_id : Session.get('rating_imam_id'),
        imam_name: Session.get('eventBy'),
        event_id : Session.get('rating_event_id'),
        event_name: Session.get('eventName'),
        mosque_id : Session.get('rating_mosque_id'),
        mosque_name: Session.get('eventAt'),
        date : new Date()
      };

      var imam_feedback = feedbackForm.imam_feedback;
      _.extend(imam_feedback,meta);
      var mosque_feedback = feedbackForm.mosque_feedback;
      _.extend(mosque_feedback,meta);
      var event_feedback = feedbackForm.event_feedback;
      _.extend(event_feedback,meta);

      Feedback.insert(imam_feedback);
      Feedback.insert(mosque_feedback);
      Feedback.insert(event_feedback);
      Router.go('/thankyou');
    }

    //Set Emoticons to default on page transition
    var emo = Session.get('feedbackEmoticon');
    //Set default emoticon status
    var emo = setDefaultEmoticon(emo);

    Session.set('feedbackEmoticon', emo);
  }
});

Template.feedbackHeader.helpers({
  btnStatus: function () {
    return Session.get('btnStatus');
  } 
});


Template.feedbackRenderer.created = function(){

//Set Defaults
    Session.set('btnStatus', 'Next');
    Session.set('feedMenuTrans', 'slideWindowLeft');
    Session.set('feedMenuTemplate', 'eventSurface');
    feedbackForm = feedbackFormConst();
}

Template.feedbackRenderer.helpers({
  feedMenuTrans: function () {
    return Session.get('feedMenuTrans');
  },
  feedMenuTemplate: function () {
    return Template[Session.get('feedMenuTemplate')];
  }
});

Template.eventSurface.helpers({
  emoticon: function () {
    return Session.get('feedbackEmoticon');
  } 
});

Template.eventSurfaceComment.helpers({
  comments: function() {
    return feedbackForm.event_feedback.comments;
  }
});

Template.mosqueSurface.helpers({
  emoticon: function () {
    return Session.get('feedbackEmoticon');
  }
});

Template.mosqueSurfaceComment.helpers({
  comments: function() {
    return feedbackForm.mosque_feedback.comments;
  }
});

Template.imamSurface.helpers({
  emoticon: function () {
    return Session.get('feedbackEmoticon');
  }
});

Template.imamSurfaceComment.helpers({
  comments: function() {
    return feedbackForm.imam_feedback.comments;
  }
});

var setDefaultEmoticon = function(emo) {

  for(var t = 0; t < emo.length ; t++) {
    emo[t]['img'] = emoImg[t]['deselect']; 
  }
  var page = Session.get('page');
  var prevValue = feedbackForm[page+'_feedback'].rating;
  if(prevValue){
    emo[prevValue-1]['img'] = emoImg[prevValue-1]['select'];
  }
  return emo;
};

var setEmoticonFunc = function (index) {
  var emo = Session.get('feedbackEmoticon');
  var page = Session.get('page');
  feedbackForm[page+'_feedback'].rating = index + 1;
  //Set default emoticon status
  var emo = setDefaultEmoticon(emo);

  emo[index]['img'] = emoImg[index]['select'];

  Session.set('feedbackEmoticon', emo);
};

Template.emoticonType.events({
  'click': function (evt, tpl) {
    var index = tpl['data']['index'];
      setEmoticonFunc(index);
  }
});

/*****************************************************************************/
/* Feedback: Lifecycle Hooks */
/*****************************************************************************/
Template.Feedback.created = function () {
};

Template.Feedback.rendered = function () {
};

Template.Feedback.destroyed = function () {
};
