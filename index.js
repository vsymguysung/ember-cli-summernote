/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {

  name: 'ember-cli-summernote',


  included: function(app) {
    this._super.included(app);

    var summernotePath   = path.join(app.bowerDirectory,'/summernote/dist/');
    var bootstrapPath   = path.join(app.bowerDirectory,'/summernote/dist/');
    var fontawesomePath   = path.join(app.bowerDirectory,'/fontawesome/');
    var options         = app.options['ember-bootstrap-datetimepicker'] || {};


    // Import Bootstrap
    if (options.importBootstrapCSS) {
      app.import(path.join(bootstrapPath, '/css/bootstrap.min.css'));
    }

    if (options.importBootstrapJS) {
      app.import(path.join(bootstrapPath, '/js/bootstrap.min.js'));
    }

    // Import css and glyphicons from FontAwesome
    if (options.importFontawesomeCSS) {
      app.import(fontawesomePath, '/css/font-awesome.min.css');
      app.import(fontawesomePath, '/fonts/fontawesome-webfont.eot', { destDir: 'fonts' });
      app.import(fontawesomePath, '/fonts/fontawesome-webfont.svg', { destDir: 'fonts' });
      app.import(fontawesomePath, '/fonts/fontawesome-webfont.ttf', { destDir: 'fonts' });
      app.import(fontawesomePath, '/fonts/fontawesome-webfont.woff', { destDir: 'fonts' });
      app.import(fontawesomePath, '/fonts/FontAwesome.otf', { destDir: 'fonts' });
    }

    // Include Summernote.
    app.import(path.join(summernotePath, '/summernote.css'));
    app.import(path.join(summernotePath, '/summernote.min.js'));

  }
};
