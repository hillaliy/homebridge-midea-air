node-tunnel
-----------

[![npm version](https://badge.fury.io/js/node-tunnel.svg)](http://npmjs.org/package/node-tunnel)
[![dependencies](https://david-dm.org/balena-io-modules/node-tunnel.png)](https://david-dm.org/balena-io-modules/node-tunnel.png)

HTTP tunneling proxy library.

Installation
------------

Install `node-tunnel` by running:

```sh
$ npm install node-tunnel
```

Documentation
-------------


* [Tunnel](#tunnel)
  * [.connect(port, host, client, req)](#tunnel.connect)
  * [.use( function(req, cltSocket, head, next) )](#tunnel.use)
  * [.listen(port)](#tunnel.listen)
* [basicAuth(req, cltSocket, head, next)](#basic_auth)

<a name="tunnel"></a>
### Tunnel

<a name="tunnel.connect"></a>
### Tunnel.connect(port, host, client, req)
Function that creates a connection between the tunnel and the target server.
It defaults to `Promise.method(net.connect)` which returns `Promise<net.Socket>`.

**Kind**: method of <code>[Tunnel](#tunnel)</code>  
**Summary**: Establish the upstream connection.  
**Access:** public  

**Example**
```js
// Create a tunnel with a custom connect method
tunnel = new Tunnel();
tunnel.connect = (port, host, client, req) => {
  console.log(`Establishing tunnel to ${host}:${port}...`);
  return Promise.method(net.connect);
};
```

<a name="tunnel.use"></a>
### Tunnel.use( function(req, cltSocket, head, next) ) 
Use a middleware function for rewriting request destination (by changing req.url),
add authorization or filter connections to only certain hosts and ports.

The parameters are the same as the [http](https://nodejs.org/api/http.html#http_event_connect) module passes on "connect" event,
plus a callback function similar to [express](http://expressjs.com) middleware.

Keep in mind that express middleware do not work with in conjunction with this module.

**Kind**: method of <code>[Tunnel](#tunnel)</code>  
**Summary**: Use a middleware.  
**Access:** public  

**Example**  
```js
// Start a tunneling proxy on port 3128
tunnel = new Tunnel();
tunnel.use( function(req, cltSocket, head, next) {
	// Send all connections to port 80 of localhost.
	req.url = "http://localhost:80";
	next();
} );
tunnel.listen(3128)
```
<a name="tunnel.listen"></a>
### Tunnel.listen(port, [cb])
Start listening on the given port. An optional callback function is called when tunnel is ready to listen.

**Kind**: method of <code>[Tunnel](#tunnel)</code>  
**Summary**: Start listening.  
**Access:** public  
**Example**  
```js
tunnel = new Tunnel();
tunnel.listen(3128, function() {
	console.log("Tunnel listening on port 3128");
});
```

<a name="basic_auth"></a>
### basicAuth(req, cltSocket, head, next)
Parses Proxy-Authorization header and sets req.auth.username and req.auth.password properties.

Further middleware should be added to accept or reject connections based on this authentication information.
**Kind**: method of <code>[Tunnel](#tunnel)</code>	
**Summary**: Parse Proxy-Authorization header.
**Access:** public  
**Example**  
```js
tunnel = new Tunnel();
tunnel.use(basicAuth);
tunnel.use( function(req, cltSocket, head, next) {
	if (req.auth.username != "user" || req.auth.password != "password") {
		cltSocket.end() // close connection
		return; // no further middleware need to be called
	}
	next();
} );
tunnel.listen(3128, function() {
	console.log("Tunnel listening on port 3128");
});
```

Support
-------

If you're having any problem, please [raise an issue](https://github.com/balena-io-modules/node-tunnel/issues/new) on GitHub and the Balena team will be happy to help.

Tests
-----

Run the test suite by doing:

```sh
$ npm install && npm test
```

Contribute
----------

- Issue Tracker: [github.com/balena-io-modules/node-tunnel/issues](https://github.com/balena-io-modules/node-tunnel/issues)
- Source Code: [github.com/balena-io-modules/node-tunnel](https://github.com/balena-io-modules/node-tunnel)

Before submitting a PR, please make sure that you include tests, and that [coffeelint](http://www.coffeelint.org/) runs without any warning:

License
-------

The project is licensed under the MIT license.
