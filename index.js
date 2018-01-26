/* eslint-env node */
'use strict';

var FastbootTransform = require('fastboot-transform');

module.exports = {
    name: 'ember-cli-summernote',
    options: {
      nodeAssets: {
        'popper.js': {
          import: ['dist/umd/popper.js'],
          processTree(input) {
           return FastbootTransform(input);
          }
        },
        bootstrap: {
          import: [
            'dist/css/bootstrap.css',
            'dist/js/bootstrap.js'
          ],
          processTree(input) {
           return FastbootTransform(input);
          }
        },
        summernote: {
          srcDir: 'dist',
          destDir: 'assets',
          import: [
            'summernote-bs4.css',
            'summernote-bs4.js',
            'font/summernote.eot',
            'font/summernote.ttf',
            'font/summernote.woff'
          ],
          processTree(input) {
           return FastbootTransform(input);
          }
        }
      }
    }
  };