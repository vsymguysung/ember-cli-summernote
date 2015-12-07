import Ember from "ember";



var SummerNoteComponent = Ember.Component.extend({

  classNames: ['wysiwyg-editor'],
  btnSize: 'btn-xs',
  height: 120,
  focus: false,
  airMode: false,
  disabled: false,
  dialogsInBody: false,
  disabledOptions: {},

  willDestroyElement: function() {
    this.$('textarea').destroy();
  },

  didInsertElement: function() {
    var _btnSize = this.get('btnSize');
    var _height = this.get('height');
    var _focus = this.get('focus');
    var _airMode = this.get('airMode');
    var _dialogsInBody = this.get('dialogsInBody');
    var _toolbar = this.getToolbarOptions(this.get('disabledOptions'));

    // ensure summernote is loaded
    // summernote 0.6.0 is not working as of this code written.
    // 0.5.10 is working version.

    Ember.assert("summernote has to exist on Ember.$.fn.summernote", typeof Ember.$.fn.summernote === "function" );
    Ember.assert("tooltip has to exist on Ember.$.fn.tooltip", typeof Ember.$.fn.tooltip === "function" );

    this.$('textarea').summernote({
      height: _height,
      focus: _focus,
      toolbar: _toolbar,
      airMode: _airMode,
      dialogsInBody: _dialogsInBody,
      // airPopover: [
      //   ['color', ['color']],
      //   ['font', ['bold', 'underline', 'clear']],
      //   ['para', ['ul', 'paragraph']],
      //   ['table', ['table']],
      //   ['insert', ['link', 'picture']]
      // ]
    });

    this.$().find('.note-editable').attr('contenteditable', !this.get('disabled'));

    var _content = this.get('content');
    this.$('textarea').code(_content);
    this.$('.btn').addClass(_btnSize);
  },

  keyUp: function() {
    this.doUpdate();
  },

  click: function() {
    this.doUpdate();
  },

  doUpdate: function() {
    var content = this.$('textarea').code();
    this.set('content', content);
  },

  setHeight: function() {
    this.$().find('.note-editable').css('height', this.get('height')); //use css height, as jQuery heigth/outerHeight does add the padding+margin
  }.observes('height'),

  setContentEditable: function() {
    this.$().find('.note-editable').attr('contenteditable', !this.get('disabled'));
  }.observes('disabled'),

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
