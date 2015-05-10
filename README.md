# Ember-cli-summernote

[![Build Status](https://travis-ci.org/vsymguysung/ember-cli-summernote.svg)](http://travis-ci.org/vsymguysung/ember-cli-summernote)
[![NPM Downlaads](https://img.shields.io/npm/dm/ember-cli-summernote.svg)](https://www.npmjs.org/package/ember-cli-summernote)

## Description
Ember-cli-summernote is an Ember CLI add-on. This addon actually converts summernote to an Ember component which is
a re-usable unit. This is still a work in progress. Pull requests are welcome.

## Installation
```
# install via npm
$ npm install ember-cli-summernote --save-dev
# make ember-cli fetch internal dependencies
$ ember g ember-cli-summernote
```

## Basic Usage

### Handlebar Template
```
import Ember from 'ember';

export default Ember.ObjectController.extend({
  contentHeight: 200,
  postContent: "Some intial contents go here. Lorem Ipsum is simply dummy text of the printing.",
  editingDisabled: false,
  
  actions: {
    changeHeight(someObject) {
      var height = someObject.doSomeCalculationToGetHeight();
       this.set('contentHeight', heigth)
    }
  }
});

{{summer-note height=contentHeight btnSize=bs-sm content=postContent focus=false header="Example" disabled=editingDisabled}}

```

### Brocfile.js ###
The bootstrap and fontAwesome resources will not be imported to your resources by default. 

If you want the add-on to add it selectively you have to specify it in the `Brocfile.js`
(No option means false by default)

```
var app = new EmberAddon({
  'ember-cli-summernote': {
    "importBootstrapCSS": true,
    "importBootstrapJS": true,
    "importFontawesomeCSS": true
  }
});
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
## ToDOs / Known Issues
* Known issue: airMode is not working somehow.

* Need to implement toolbar buttons customizing feature in the component. 



#### Inspired by

* Summernote(Super simple WYSIWYG Editor) (https://github.com/summernote/summernote) 

* Heather Brysiewicz's blog post (http://hbrysiewicz.github.io/2014-04-18-summernote-ember-wysiwyg.html)


#### License
MIT license.
