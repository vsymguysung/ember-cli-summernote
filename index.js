/* jshint node: true */
'use strict';

module.exports = {

  name: 'ember-cli-summernote',


  included: function(app) {
    this._super.included(app);

    // Summernote
    app.import(app.bowerDirectory + '/summernote/dist/summernote.css');
    app.import(app.bowerDirectory + '/summernote/dist/summernote.min.js');

  }
};
