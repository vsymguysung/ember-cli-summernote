# Ember-cli-summernote

[![Build Status](https://travis-ci.org/vsymguysung/ember-cli-summernote.svg)](http://travis-ci.org/vsymguysung/ember-cli-summernote)
[![NPM Downlaads](https://img.shields.io/npm/dm/ember-cli-summernote.svg)](https://www.npmjs.org/package/ember-cli-summernote)
[![npm version](https://badge.fury.io/js/ember-cli-summernote.svg)](http://badge.fury.io/js/ember-cli-summernote)

[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-summernote.svg)](http://emberobserver.com/addons/ember-cli-summernote)


## Description
Ember-cli-summernote is an Ember CLI add-on. This addon actually converts summernote to an Ember component which is
a re-usable unit. This is still a work in progress. Pull requests are welcome.


[DEMO](http://vsymguysung.github.io/ember-cli-summernote/)

## Installation
```
# install via npm
$ npm install ember-cli-summernote --save-dev
# make ember-cli fetch internal dependencies
$ ember g ember-cli-summernote
```

## Basic Usage

### Handlebar Template

As of version `1.1.0`, the addon embraces `DDAU`.
The `content` property is readonly and `onContentChange` action is used for updated contents.


```javascript
import Ember from 'ember';

export default Ember.ObjectController.extend({
  contentHeight: 200,
  postContent: "Some intial contents go here. Lorem Ipsum is simply dummy text of the printing.",
  editingDisabled: false,

  actions: {
    onContentChange(text) {
      set(this, 'postContent', text);
    },

    changeHeight(someObject) {
      let height = someObject.doSomeCalculationToGetHeight();
      set(this, 'contentHeight', height)
    }
  }
});
```


As a result to follow `DDAU`, the summernote internall callback `onChange` will not be supported through the `callbacks` property in a consumming application.


```handlebars

{{summer-note height=contentHeight
              btnSize=bs-sm
              airMode=false
              focus=false
              header="Example"
              content=(readonly postContent)
              onContentChange=(action 'onContentChange')
              disabled=editingDisabled
              callbacks=callbackOptions
              toolbarOptions=toolbarOptions}}
```

Example of configuring the toolbar options.

```javascript

    toolbarOptions: {
      style: false,
      insert: {
        picture: false
      },
      help: false
    }
```


All callbacks except `onChange` are supported.

The `onChange` callback are used internally for the `onContentChange` action.

```javascript
    callbackOptions: {
      onInit: function() {
        console.log('Summernote is launched');
      },
      onEnter: function() {
        console.log('Enter/Return key pressed');
      },
      onPaste: function(e) {
        console.log('Called event paste');
      },
    },
```

### config/environment.js ###
The bootstrap resources will not be imported to your resources by default.

Also you can set `lang` option for the editor.

```
var ENV = {
  modulePrefix: 'dummy',
  environment: environment,
  ...
  'ember-cli-summernote': {
    "importBootstrapCSS": true,
    "importBootstrapJS": true,
    "lang": "en-US // "ru-RU" //"lang": "en-US"
  }
}

```

##Test Helper

This addon also provides a convenient test helper to interact with the editor
in acceptance tests. 

```js
fillInSummernote('.summernote-container', '<p>Test Text Entered.</p>');

getContentFromSummernote('.summernote-container');
```

## Demo
You can clone this repo and run the app

```
$ sudo npm install -g ember-cli

# clone the codebase
$ git clone http://github.com/vsymguysung/ember-cli-summernote.git
$ cd ember-cli-summernote

# install dependencies
$ npm install; bower install

# fire up local server
$ ember serve

# visit the page with the following url.
http://localhost:4200
```


#### Inspired by

* Summernote(Super simple WYSIWYG Editor) (https://github.com/summernote/summernote) 

* Heather Brysiewicz's blog post (http://hbrysiewicz.github.io/2014-04-18-summernote-ember-wysiwyg.html)


#### License
MIT license.
