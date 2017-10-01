import Ember from "ember";

const {
  set,
  Logger,
} = Ember


var ExamplesController = Ember.Controller.extend({

  postContent: 'Hello, world!',

  customButtons: [],

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

  init() {
    let _onNewBlock = this.get('onNewBlock').bind(this);

    let newBlockButton = function (context) {
			var ui = $.summernote.ui;

			var button = ui.button({
											contents: '<i class="fa fa-file-text-o"/> New div',
											tooltip: 'New div',
											click: _onNewBlock
			});

			return button.render();
    }

    this.customButtons.push(newBlockButton);
	},

	onNewBlock() {
    let blocks = '<div class="header" id="headerBlock"></div>';
    this.set('postContent', this.get('postContent') + blocks);
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
