/* eslint-env mocha */
/* eslint no-unused-expressions: off */

'use strict';

const test = require('ava').test;
const VueBrunch = require('.');

test.beforeEach(t => {
  t.context.plugin = new VueBrunch();
});

test('should be an object', t => {
  t.true(t.context.plugin instanceof VueBrunch);
});

test('should have #compile method', t => {
  t.true(t.context.plugin.compile && t.context.plugin.compile instanceof Function);
});

test('should compile a Vue template with no css', t => {
  const file = {
    data: '<template><h1>Hello World!</h1></template><script>export default {name: "hello"};</script>',
    path: 'Test.vue',
  };

  return t.context.plugin.compile(file).then(result => {
    t.true(result.length > 0);
  });
});

test('should compile a Vue template with css', t => {
  const file = {
    data: '<style>h1 {color: red;}</style><template><h1>Hello World!</h1></template><script>export default {name: "hello"};</script>',
    path: 'Test.vue',
  };

  return t.context.plugin.compile(file).then(result => {
    t.true(result.length > 0);
  });
});
