import Ember from "ember";

const {
  get,
  assert,
  Logger,
  isEqual,
  isEmpty,
  Component
} = Ember

let SummerNoteComponent = Component.extend({

  classNames: ['wysiwyg-editor'],
  btnSize: 'btn-xs',
  height: 120,
  focus: false,
  airMode: false,
  disabled: false,
  dialogsInBody: false,
  disabledOptions: {},
  callbacks: {},

  config: Ember.computed(function() {
    let applicationConfig = this.container.lookupFactory('config:environment');
    // Logger.debug(`applicationConfig.ember-cli-summernote: ${JSON.stringify(applicationConfig)}`);

    return applicationConfig;
  }),

  onChange(text) {
    Logger.debug(`onChange callback. text: ${text}`);
    let _onContentChange = this.get('onContentChange');
    if (!isEmpty(_onContentChange)) {
      _onContentChange(text);
    }
  },

  willDestroyElement: function() {
    this.$('#summernote').summernote('destroy');
    // Logger.debug('summernote("destroy")');
  },

  didInsertElement: function() {
    let _btnSize = this.get('btnSize');
    let _height = this.get('height');
    let _focus = this.get('focus');
    let _airMode = this.get('airMode');
    let _dialogsInBody = this.get('dialogsInBody');
    let _lang = get(this, 'config')['ember-cli-summernote'].lang;
    let _toolbar = this.getToolbarOptions(this.get('disabledOptions'));
    let _callbacks= this.get('callbacks');
    _callbacks.onChange = this.get('onChange').bind(this);

    //
    // Ensure summernote is loaded
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

    let _content = this.get('content');
    this.$('#summernote').summernote('code', _content);
  },

  didUpdate() {
    let _editorText = this.$('#summernote').summernote('code');
    let _newText = get(this, 'content');

    if (!isEqual(_editorText, _newText)) {
      this.$('#summernote').summernote('code', _newText);
    }
  },

  setHeight: Ember.observer('height', function(/*sender, key, value, rev*/) {
    this.$().find('.note-editable').css('height', this.get('height')); //use css height, as jQuery heigth/outerHeight does add the padding+margin
  }),

  setContentEditable: Ember.observer('disabled', function(/*sender, key, value, rev*/) {
    this.$().find('.note-editable').attr('contenteditable', !this.get('disabled'));
  }),

  getToolbarOptions: function(disabledOptions) {
    let availableOptions = {
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
    let _toolbar = [];

    //disable Options
    for (let key in availableOptions) {
      let arr = [];
      if(disabledOptions === undefined || disabledOptions === null ||disabledOptions[key] !== false) {
        arr.push(key);
        let arr2 = [];
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
