import Ember from "ember";

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

  actions: {

  }

});

export default ExamplesController;
