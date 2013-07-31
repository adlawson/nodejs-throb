(function() {

    var throb = require('../../../src/throb');
    var assert = require('chai').assert;

    suite('throb:', function() {
        test('`throb` is a function', function() {
            assert.isFunction(throb);
        });

    });

})();
