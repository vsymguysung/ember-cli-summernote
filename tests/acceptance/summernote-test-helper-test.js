import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { fillInSummernote } from 'dummy/tests/helpers/fill-in-summernote';
import { getContentFromSummernote } from 'dummy/tests/helpers/get-content-from-summernote';

moduleForAcceptance('Acceptance | Summernote test helper tests');

test('visiting /examples', function(assert) {
  assert.expect(2);
  visit('/examples');

  andThen(function() {
    assert.equal(currentURL(), '/examples', 'The examples page is loaded successfully.');
  });

  let testTxt = "The content has been typed in the wysiwyg editor.";

  andThen(function() {
    fillInSummernote('body', testTxt);
  });

  andThen(function() {
    let content = getContentFromSummernote('body');
    assert.equal(content, testTxt, 'The typed-in text is same as the actual text from the editor.');
  });
});
