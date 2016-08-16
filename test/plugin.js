import test from 'ava';
import VueBrunch from '../source';

const instance = new VueBrunch;

test('can compile', t => {

    const file = {data: '<template><h1>Hello World!</h1></template>', path: 'views/test.vue'};

    return instance.compile(file).then((result) => {
        t.true(result.length > 0);
    });
});
