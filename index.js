/* eslint-env node */
'use strict';

var path = require('path');

module.exports = {

  name: 'ember-cli-summernote',

  included: function(app) {
    this._super.included(app);

    var summernotePath   = path.join(app.bowerDirectory,'/summernote/dist/');
    var bootstrapPath   = path.join(app.bowerDirectory,'/bootstrap/dist/');
    var fontawesomePath   = path.join(app.bowerDirectory,'/font-awesome/');

    // DBG.
    var options         = app.options['ember-cli-summernote'] || {};  // This options are from the ember-cli-build.js
    // console.log(`index.js: options: ${JSON.stringify(app.options['ember-cli-summernote'])}`);

    var projectConfig = this.project.config(app.env); // This projectConfig is from the consuming app's environment.js
    var config = projectConfig['ember-cli-summernote'] || { importBootstrapCSS: false, importBootstrapJS: false, importFontawesomeCSS: false, lang: 'en-US' };
    const config = projectConfig['ember-cli-notifications'] || { includeFontAwesome: false };
    // console.log(`index.js: config: ${JSON.stringify(config)}`);

    // Import Bootstrap
    if (config.importBootstrapCSS) {
      app.import(path.join(bootstrapPath, '/css/bootstrap.min.css'));
    }

    if (config.importBootstrapJS) {
      app.import(path.join(bootstrapPath, '/js/bootstrap.min.js'));
    }

    // Import css and glyphicons from FontAwesome
    if (config.importFontawesomeCSS) {
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

    // Include Summernote Lang file.
    if (config.lang) {
      if (config.lang === 'en-US') {
        return;
      }
      app.import(path.join(summernotePath, `lang/summernote-${config.lang}.js`));
    }

  }

};
