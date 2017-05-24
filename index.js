/* eslint-env node */
'use strict';

var path = require('path');

module.exports = {

  name: 'ember-cli-summernote',

  init: function() {

  },

  contentFor: function(type, config) {
    // Const
    let summernoteConfig = config['ember-cli-summernote'] || {};

    let summernotePath = 'bower_components/summernote/dist/';
    let summernoteLangFile = `lang/summernote-${summernoteConfig.lang}.js`;
    let summernoteLangFilePath = `${summernotePath}${summernoteLangFile}`;
    console.log(`summernoteLangFilePath:${summernoteLangFilePath}`);

  },

  included: function(app) {
    this._super.included(app);

    var summernotePath   = path.join(app.bowerDirectory,'/summernote/dist/');
    var bootstrapPath   = path.join(app.bowerDirectory,'/bootstrap/dist/');
    var fontawesomePath   = path.join(app.bowerDirectory,'/font-awesome/');
    var options         = app.options['ember-cli-summernote'] || {};


    // Import Bootstrap
    if (options.importBootstrapCSS) {
      app.import(path.join(bootstrapPath, '/css/bootstrap.min.css'));
    }

    if (options.importBootstrapJS) {
      app.import(path.join(bootstrapPath, '/js/bootstrap.min.js'));
    }

    // Import css and glyphicons from FontAwesome
    if (options.importFontawesomeCSS) {
      app.import(path.join(fontawesomePath, '/css/font-awesome.min.css'));
      app.import(path.join(fontawesomePath, '/fonts/fontawesome-webfont.eot'), { destDir: 'fonts' });
      app.import(path.join(fontawesomePath, '/fonts/fontawesome-webfont.svg'), { destDir: 'fonts' });
      app.import(path.join(fontawesomePath, '/fonts/fontawesome-webfont.ttf'), { destDir: 'fonts' });
      app.import(path.join(fontawesomePath, '/fonts/fontawesome-webfont.woff'), { destDir: 'fonts' });
      app.import(path.join(fontawesomePath, '/fonts/fontawesome-webfont.woff2'), { destDir: 'fonts' });
      app.import(path.join(fontawesomePath, '/fonts/FontAwesome.otf'), { destDir: 'fonts' });
    }

    // Include Summernote.
    app.import(path.join(summernotePath, 'summernote.css'));
    app.import(path.join(summernotePath, 'summernote.min.js'));
    app.import(path.join(summernotePath, 'font/summernote.eot'), { destDir: 'assets/font' });
    app.import(path.join(summernotePath, 'font/summernote.ttf'), { destDir: 'assets/font' });
    app.import(path.join(summernotePath, 'font/summernote.woff'), { destDir: 'assets/font' });

  }

};
