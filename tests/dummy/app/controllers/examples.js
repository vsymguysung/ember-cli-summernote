import Ember from "ember";

const {
  set,
  Logger,
} = Ember


var ExamplesController = Ember.Controller.extend({

  postContent: 'Hello, world!',

  contentHeight: 100,

  editingDisabled: false,

  toolbarOptions: {
    style: false,
    insert: {
      picture: false
    },
    help: true
  },

  callbackOptions: {
    onInit: function() {
      Logger.debug('Summernote is launched');
    },
    onEnter: function() {
      Logger.debug('Enter/Return key pressed');
    },
    onPaste: function(e) {
      Logger.debug(`Called event paste e: ${JSON.stringify(e)}`);
    },
  },

  actions: {
    onContentChange(text) {
      Logger.debug(`onContentChange action... text:${text}`);
      set(this, 'postContent', text);
    },

    rerenderCheck(text) {
      Logger.debug(`rerenderCheck action... text:${text}`);
      set(this, 'postContent', text);
    }
  }

});

export default ExamplesController;
