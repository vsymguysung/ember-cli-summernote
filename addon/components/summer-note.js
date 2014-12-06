import Ember from "ember";

var get = Ember.get;


var SummerNoteComponent = Ember.Component.extend({

  classNames: ['wysiwyg-editor'],
  btnSize: 'btn-xs',
  height: 120,

  willDestroyElement: function() {
    this.$('textarea').destroy();
  },

  didInsertElement: function() {
    var _this = this;
    var btnSize = this.get('btnSize');
    var height = this.get('height');

    // ensure summernote is loaded
    // summernote 0.6.0 is not working as of this code written.
    // 0.5.10 is working version.
    Ember.assert("summernote has to exist on Ember.$.fn.summernote", Ember.$.fn.summernote);
    Ember.assert("tooltip has to exist on Ember.$.fn.tooltip", Ember.$.fn.tooltip);

    // this.$('textarea').summernote({
    this.$('textarea').summernote({
      height: height,
      // toolbar: [
      //   ['style', ['bold', 'italic', 'underline', 'clear']],
      //   ['fontsize', ['fontsize']],
      //   ['color', ['color']],
      //   ['para', ['ul', 'ol', 'paragraph']],
      //   ['height', ['height']],
      //   ['insert', ['link']],
      //   ['table', ['table']],
      //   ['help', ['help']]
      // ]
      toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
        ['fontname', ['fontname']],
        // ['fontsize', ['fontsize']], // Still buggy
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['link', 'picture', 'video', 'hr']],
        ['view', ['fullscreen', 'codeview']],
        ['help', ['help']]
      ],
      // airMode: true
    });

    var content = this.get('content');
    this.$('textarea').code(content);
    this.$('.btn').addClass(btnSize);
  },
  
  keyUp: function() {
    this.doUpdate();
  },

  click: function() {
    this.doUpdate();
  },

  doUpdate: function() {
    var content = this.$('.note-editable').html();
    this.set('content', content);
  }

});

export default SummerNoteComponent;
