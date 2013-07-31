/*
 * This file is part of Throb
 *
 * Copyright (c) 2013 Andrew Lawson <http://adlawson.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @see  http://github.com/adlawson/throb/blob/master/LICENSE
 * @link http://github.com/adlawson/throb
 */
(function() {

    'use strict';

    module.exports = function(server, opts, fn) {
        var opts = opts || {};
        var heartbeatUrl = opts.heartbeat || /^\/heartbeat(\?(.*))?$/;
        var pingUrl = opts.ping || /^\/ping(\?(.*))?$/;

        if (typeof opts === 'function') {
            fn = opts;
        }
        if (typeof opts.notFoundCallback === 'undefined') {
            opts.notFoundCallback = onOther;
        }
        if (typeof fn === 'undefined') {
            fn = function(req, res, next) {
                next();
            }
        }

        server.on('request', function(req, res) {
            if (heartbeatUrl.test(req.url)) {
                onHeartbeat(req, res, fn);
            } else if (pingUrl.test(req.url)) {
                onPing(req, res, fn);
            } else if (typeof opts.notFoundCallback === 'function') {
                opts.notFoundCallback(req, res);
            }
        });
    };

    function onHeartbeat(req, res, fn) {
        res.writeHead(200);
        respond(req, res, fn);
    };

    function onPing(req, res, fn) {
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200);
        res.write('Pong');
        respond(req, res, fn);

    };

    function onOther(req, res) {
        res.writeHead(404);
        res.end();
    };

    function respond(req, res, fn) {
        fn(req, res, function(err) {
            if (!err) {
                res.end();
            }
        });
    };

})();
