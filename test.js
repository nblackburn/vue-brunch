/* eslint-env mocha */
/* eslint no-unused-expressions: off */

'use strict';

const expect = require('chai').expect;
const VueBrunch = require('.');

describe('vue-brunch', () => {
  let plugin;

  beforeEach(() => {
    plugin = new VueBrunch({
      plugins: {},
    });
  });

  it('should be an object', () => {
    expect(plugin).to.be.an.instanceof(VueBrunch);
  });

  it('should have #compile method', () => {
    expect(plugin).to.respondTo('compile');
  });

  it('should compile a Vue template with no css', () => {
    const file = {
      data: '<template><h1>Hello World!</h1></template><script>export default {name: "hello"};</script>',
      path: 'Test.vue',
    };

    return plugin.compile(file).then(result => {
      expect(result.length > 0);
    });
  });

  it('should compile a Vue template with css', () => {
    const file = {
      data: '<style>h1 {color: red;}</style><template><h1>Hello World!</h1></template><script>export default {name: "hello"};</script>',
      path: 'Test.vue',
    };

    return plugin.compile(file).then(result => {
      expect(result.length > 0);
    });
  });
});
