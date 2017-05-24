import Ember from "ember";

const {
  Logger,
} = Ember


var ExamplesController = Ember.Controller.extend({

  postContent: 'Hello, world!',

  contentHeight: 100,

  editingDisabled: false,

  disabledOptions: {
    style: false,
    insert: {
      picture: false
    },
    help: false
  },

  callbackOptions: {
    onInit: function() {
      Logger.debug('Summernote is launched');
    },
    onEnter: function() {
      Logger.debug('Enter/Return key pressed');
    },
    onPaste: function(e) {
      Logger.debug(`Called event paste e: ${e}`);
    },
  },

  actions: {

  }

});

export default ExamplesController;
