import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('fillInSummernote', function(app, selector, html) {
  return fillInSummernote(selector, html);
});

export function fillInSummernote(selector='body', html) {
  let $editor = find('#summernote', selector);
  // SafeString support
  html = html && typeof html.toString === 'function' ? html.toString() : '';
  console.log('html: ', html);
  Ember.run(() => $editor.summernote('code', html));
}
