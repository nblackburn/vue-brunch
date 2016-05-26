module.exports = function (wallaby) {

    return {

        debug: true,
        testFramework: 'ava',

        files: [
            'source/**/*.js'
        ],

        tests: [
            'test/**/*.js'
        ],

        env: {
            type: 'node',
            runner: 'node'
        },

        compilers: {
            '**/*.js': wallaby.compilers.babel()
        },

        setup: function () {
            require('babel-polyfill');
        }
    };
};
