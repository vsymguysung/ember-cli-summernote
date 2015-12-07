import Ember from "ember";

var ExamplesController = Ember.Controller.extend({

  postContent: 'Hello, world!',

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
