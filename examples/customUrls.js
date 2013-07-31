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
 * Use custom endpoint URLs
 */
var throb = require('../src/throb');
var http = require('http');

var options = {
    heartbeat: /^\/throb/,
    ping: /^\/ping\?someRequestSig=(.+)/
}

var server = http.createServer().listen(3000);
throb(server, options);
