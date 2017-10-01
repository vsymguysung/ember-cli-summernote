import Ember from "ember";

const {
  get,
  assert,
  Logger,
  getOwner,
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
  toolbarOptions: {},
  callbacks: {},

  config: Ember.computed(function() {
    //let applicationConfig = this.container.lookupFactory('config:environment');
    let applicationConfig = getOwner(this).resolveRegistration('config:environment');
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
    let _btnSize        = get(this, 'btnSize');
    let _height         = get(this, 'height');
    let _focus          = get(this, 'focus');
    let _airMode        = get(this, 'airMode');
    let _dialogsInBody  = get(this, 'dialogsInBody');
    let _lang           = get(this, 'config')['ember-cli-summernote'].lang;
    let _toolbar        = this.getToolbarOptions(this.get('toolbarOptions'));
    let _callbacks      = get(this, 'callbacks');
    _callbacks.onChange = this.get('onChange').bind(this);

    let _customButtons = {};
    let arrayOfCustomButtons = get(this, 'customButtons');
    if (arrayOfCustomButtons) {
      arrayOfCustomButtons.forEach(function (item, i, arr) {
        _customButtons['myButton' + i] = item;
        _toolbar.push(['myButton' + i, ['myButton' + i]]);
      });
    }

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
      buttons: _customButtons
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

  getToolbarOptions: function(toolbarOptions) {
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
      if(toolbarOptions === undefined || toolbarOptions === null ||toolbarOptions[key] !== false) {
        arr.push(key);
        let arr2 = [];
        for (var subKey in availableOptions[key]) {
          if(toolbarOptions === undefined || toolbarOptions === null || toolbarOptions[key] === undefined || toolbarOptions[key] === null || toolbarOptions[key][subKey] !== false) {
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
