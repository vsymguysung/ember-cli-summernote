import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('getContentFromSummernote', function(app, selector) {
  return getContentFromSummernote(selector);
});

export function getContentFromSummernote(selector) {
  let $editor = find('#summernote', selector);
  let content = $editor.summernote('code');
  return Ember.run(() => content);
}
