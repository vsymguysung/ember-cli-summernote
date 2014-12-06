/* jshint node: true */
'use strict';

module.exports = {

  name: 'ember-cli-summernote',


  included: function(app) {
    this._super.included(app);

    // jQuery
    app.import(app.bowerDirectory + '/jquery/dist/jquery.js'); // jquery.min.js is not working...

    // Bootstrap
    app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.min.css');
    app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.min.js');

    // font awesome
    app.import(app.bowerDirectory + '/fontawesome/css/font-awesome.min.css');
    app.import(app.bowerDirectory + '/fontawesome/fonts/fontawesome-webfont.eot', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/fontawesome/fonts/fontawesome-webfont.svg', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/fontawesome/fonts/fontawesome-webfont.ttf', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/fontawesome/fonts/fontawesome-webfont.woff', { destDir: 'fonts' });
    app.import(app.bowerDirectory + '/fontawesome/fonts/FontAwesome.otf', { destDir: 'fonts' });

    // Summernote
    app.import(app.bowerDirectory + '/summernote/dist/summernote.css');
    app.import(app.bowerDirectory + '/summernote/dist/summernote.min.js');

  }
};
