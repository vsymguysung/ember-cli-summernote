/* eslint-env node */
'use strict';

var path = require('path');

module.exports = {

  name: 'ember-cli-summernote',

  included: function(app) {
    this._super.included(app);

    var summernotePath   = path.join(app.bowerDirectory,'/summernote/dist/');
    var bootstrapPath   = path.join(app.bowerDirectory,'/bootstrap/dist/');

    // DBG.
    var options         = app.options['ember-cli-summernote'] || {};  // This options are from the ember-cli-build.js
    // console.log(`index.js: options: ${JSON.stringify(app.options['ember-cli-summernote'])}`);

    var projectConfig = this.project.config(app.env); // This projectConfig is from the consuming app's environment.js
    var config = projectConfig['ember-cli-summernote'] || { importBootstrapCSS: false, importBootstrapJS: false, lang: 'en-US' };
    // console.log(`index.js: config: ${JSON.stringify(config)}`);

    // Import Bootstrap
    if (config.importBootstrapCSS) {
      app.import(path.join(bootstrapPath, '/css/bootstrap.min.css'));
    }

    if (config.importBootstrapJS && !process.env.EMBER_CLI_FASTBOOT) {
      app.import(path.join(bootstrapPath, '/js/bootstrap.min.js'));
    }

    // Include Summernote.
    app.import(path.join(summernotePath, 'summernote.css'));
    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import(path.join(summernotePath, 'summernote.min.js'));
    }
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
