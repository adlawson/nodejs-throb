# Throb #

<img src="http://stream1.gifsoup.com/view2/3611809/heartbeat-o.gif" alt="Throb" align="right" width=280/>

**Version:** *0.1.0*<br/>
**Master build:** [![Master branch build status][travis-master]][travis]<br/>
**Develop build:** [![Develop branch build status][travis-develop]][travis]


This library gives you the tools to run a really lightweight heartbeat or ping server.
It's useful for servers monitored by load balancers or services like [Pingdom][pingdom].<br/>
It can be installed in whichever way you prefer, but I recommend [NPM][npm].


### Command line ###
```bash
$ throb -p 3000
```
```bash
$ throb -h

  Usage: throb [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -H, --hostname [hostname]  server hostname
    -p, --port [port]          server port
    -t, --tls                  use TLS (SSL)
    -v, --verbose              output request log
```


### Custom server ###
You can use this library with your own `http` or `https` server.

```js
var throb = require('throb');
var http = require('http');

var server = http.createServer().listen(3000);
throb(server, function(req, res, next) {
    // optional callback
    next();
});
```


### Custom URLs ###
You can even define your own endpoint URLs. You should define them as regular expressions.

```js
var throb = require('throb');
var http = require('http');

var options = {
    heartbeat: /^\/heartbeat/,
    ping: /^\/ping/
};

var server = http.createServer().listen(3000);
throb(server, options, function(req, res, next) {
    // optional callback
    next();
});
```


### 404 Not Found ###
The default behaviour of the server is to respond with a `404 Not Found` response
if a request is made to an invalid endpoint. This behaviour can be modified or even disabled entirely.
```js
var throb = require('throb');
var http = require('http');

var options = {
    notFoundCallback: function(req, res) {
        // Handle 404s yourself
    }
};

var server = http.createServer().listen(3000);
throb(server, options);
```


### Requests ###
The server handles two types of request. Typically you would only use one of them.
 - **Heartbeat** simply returns `200 OK` on success.
 - **Ping** returns `200 OK` and `Pong` as a plain text body.

```bash
# Request ----->
GET /heartbeat HTTP/1.1
Host: localhost:3000

# Response <-----
HTTP/1.1 200 OK
```

```bash
# Request ----->
GET /ping HTTP/1.1
Host: localhost:3000

# Response <-----
HTTP/1.1 200 OK
Content-Type: text/plain

Pong
```


### Contributing ###
I accept contributions to the source via Pull Request,
but passing unit tests must be included before it will be considered for merge.
Given the early stage of this project and the severe lack of current tests,
this is a little hypocritical; but start as you mean to go on, etc.
```bash
$ make install
$ make tests
```

If you have [Vagrant][vagrant] installed, you can build the dev environment to assist development.
The repository will be mounted in `/srv`.
```bash
$ vagrant up
$ vagrant ssh

Welcome to Ubuntu 12.04 LTS (GNU/Linux 3.2.0-23-generic x86_64)
$ cd /srv
```


### License ###
The content of this library is released under the **MIT License** by **Andrew Lawson**.<br/>
You can find a copy of this license at http://www.opensource.org/licenses/mit or in [`LICENSE`][license]


<!-- Links -->
[travis]:         https://travis-ci.org/adlawson/throb
[travis-develop]: https://travis-ci.org/adlawson/throb.png?branch=develop
[travis-master]:  https://travis-ci.org/adlawson/throb.png?branch=master
[npm]:            https://npmjs.org/package/throb
[vagrant]:        http://vagrantup.com
[license]:        /LICENSE
[pingdom]:        https://www.pingdom.com
[expressjs]:      http://expressjs.com
[hapi]:           http://hapijs.com
