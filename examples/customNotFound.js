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

/**
 * Log invalid requests
 */
var throb = require('../src/throb');
var http = require('http');

var options = {
    notFoundCallback: function(req, res) {
        console.log('Log invalid request');
        res.writeHead(404);
        res.end();
    }
}

var server = http.createServer().listen(3000);
throb(server, options);
