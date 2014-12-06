/* jshint node: true */
'use strict';

module.exports = {

  name: 'ember-cli-summernote',


  included: function(app) {
    this._super.included(app);

    // <!-- include libraries(jQuery, bootstrap, fontawesome) -->
    app.import(app.bowerDirectory + '/jquery/dist/jquery.min.js');
    app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.min.css');
    app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.min.js');
    app.import(app.bowerDirectory + '/fontawesome/css/font-awesome.min.css');

    // <!-- include summernote css/js-->
    app.import(app.bowerDirectory + '/summernote/dist/summernote.css');
    app.import(app.bowerDirectory + '/summernote/dist/summernote.js');

  }
};
