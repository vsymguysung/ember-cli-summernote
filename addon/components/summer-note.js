import Ember from "ember";

const {
  get,
  assert,
  Logger,
  Component
} = Ember

var SummerNoteComponent = Component.extend({

  classNames: ['wysiwyg-editor'],
  btnSize: 'btn-xs',
  height: 120,
  focus: false,
  airMode: false,
  disabled: false,
  dialogsInBody: false,
  disabledOptions: {},
  callbacks:{},


  config: Ember.computed(function() {
    let applicationConfig = this.container.lookupFactory('config:environment');
    Logger.debug(`applicationConfig.ember-cli-summernote: ${JSON.stringify(applicationConfig)}`);

    return applicationConfig;
  }),

  willDestroyElement: function() {
    this.$('#summernote').summernote('destroy');
    Logger.debug('summernote("destroy")');
  },



  didInsertElement: function() {

    var _btnSize = this.get('btnSize');
    var _height = this.get('height');
    var _focus = this.get('focus');
    var _airMode = this.get('airMode');
    var _dialogsInBody = this.get('dialogsInBody');
    var _lang = get(this, 'config')['ember-cli-summernote'].lang;
    var _toolbar = this.getToolbarOptions(this.get('disabledOptions'));
    var _callbacks = this.get('callbacks');

    Logger.debug(`_lang:${JSON.stringify(_lang)}`);
    // ensure summernote is loaded
    // summernote 0.6.0 is not working as of this code written.
    // 0.5.10 is working version.
    assert("summernote has to exist on Ember.$.fn.summernote", typeof Ember.$.fn.summernote === "function" );
    assert("tooltip has to exist on Ember.$.fn.tooltip", typeof Ember.$.fn.tooltip === "function" );

    this.$('#summernote').summernote({
      height: _height,
      focus: _focus,
      lang: _lang,
      toolbar: _toolbar,
      airMode: _airMode,
      dialogsInBody: _dialogsInBody,
      callbacks: _callbacks,
    });

    this.$().find('.note-editable').attr('contenteditable', !this.get('disabled'));
    this.$('.btn').addClass(_btnSize);

    var _content = this.get('content');
    this.$('#summernote').summernote('code', _content);
  },

  keyUp: function() {
    this.doUpdate();
  },

  click: function() {
    this.doUpdate();
  },

  doUpdate: function() {
    var content = this.$('#summernote').summernote('code');
    this.set('content', content);
  },

  setHeight: Ember.observer('height', function(/*sender, key, value, rev*/) {
    this.$().find('.note-editable').css('height', this.get('height')); //use css height, as jQuery heigth/outerHeight does add the padding+margin
  }),

  setContentEditable: Ember.observer('disabled', function(/*sender, key, value, rev*/) {
    this.$().find('.note-editable').attr('contenteditable', !this.get('disabled'));
  }),

  getToolbarOptions: function(disabledOptions) {
    var availableOptions = {
      style: {
        style: true
      },
      font: {
        bold: true,
        italic: true,
        underline: true,
        superscript: true,
        subscript: true,
        strikethrough: true,
        clear: true
      },
      fontname: {
        fontname: true
      },
      fontsize: {
        fontsize: true
      },
      color: {
        color: true
      },
      para:  {
        ul: true,
        ol: true,
        paragraph: true
      },
      height: {
        height: true
      },
      table: {
        table: true
      },
      insert: {
        link: true,
        picture: true,
        video: true,
        hr: true
      },
      view: {
        fullscreen: true,
        codeview: true
      },
      help: {
        help: true
      }
    };
    var _toolbar = [];

    //disable Options
    for (var key in availableOptions) {
      var arr = [];
      if(disabledOptions === undefined || disabledOptions === null ||disabledOptions[key] !== false) {
        arr.push(key);
        var arr2 = [];
        for (var subKey in availableOptions[key]) {
          if(disabledOptions === undefined || disabledOptions === null || disabledOptions[key] === undefined || disabledOptions[key] === null || disabledOptions[key][subKey] !== false) {
            arr2.push(subKey);
          }
        }
        arr.push(arr2);
      }
      if(arr.length > 0) {
        _toolbar.push(arr);
      }
    }

    return _toolbar;
  }
});

export default SummerNoteComponent;
