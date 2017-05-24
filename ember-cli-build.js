/* eslint-env node */
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    // Add options here
    //
    'ember-cli-summernote': {
      "importBootstrapCSS": true,
      "importBootstrapJS": true,
      "importFontawesomeCSS": true
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  // jQuery
  app.import(app.bowerDirectory + '/jquery/dist/jquery.js'); // jquery.min.js is not working...

  // Bootstrap
  app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.min.css');
  app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.min.js');

  // font awesome
  app.import(app.bowerDirectory + '/font-awesome/css/font-awesome.min.css');
  app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.eot', { destDir: 'fonts' });
  app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.svg', { destDir: 'fonts' });
  app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.ttf', { destDir: 'fonts' });
  app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.woff', { destDir: 'fonts' });
  app.import(app.bowerDirectory + '/font-awesome/fonts/fontawesome-webfont.woff2', { destDir: 'fonts' });
  app.import(app.bowerDirectory + '/font-awesome/fonts/FontAwesome.otf', { destDir: 'fonts' });

  return app.toTree();
};
