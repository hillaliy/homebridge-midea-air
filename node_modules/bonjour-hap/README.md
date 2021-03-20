# bonjour-hap

![NPM-Version](https://badgen.net/npm/v/bonjour-hap)
![NPM-Downloads](https://badgen.net/npm/dt/bonjour-hap)
![Node-CI](https://github.com/homebridge/bonjour/workflows/Node-CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/homebridge/bonjour/badge.svg?branch=master)](https://coveralls.io/github/homebridge/bonjour?branch=master)

A Bonjour/Zeroconf protocol implementation in pure JavaScript. Publish
services on the local network or discover existing services using
multicast DNS.

##Notice

The `bonjour-hap` library was used in [HAP-NodeJS](https://github.com/homebridge/HAP-NodeJS) in versions
prior to v0.8.0. 
`bonjour-hap` does NOT correctly implement mdns service discovery as it does not correctly implement
RFC 6762 or RFC 6763. The library heavily congest the network with unnecessary traffic, does not implement
certain features and does not behave as expected from a mdns responder (or querier).
It SHOULD NOT be used anymore. It is not maintained anymore. The code should not be taken as reference for anything.

`bonjour-hap` was replaced by the [ciao](https://github.com/homebridge/ciao) library, which is basically a rewrite 
and strongly adheres to the mentioned RFCs. Ciao is used in `HAP-NodeJS` since v0.8.0.

## Installation

```
npm install bonjour-hap
```

## Usage

```js
var bonjour = require('bonjour-hap')()

// advertise an HTTP server on port 3000
bonjour.publish({ name: 'My Web Server', type: 'http', port: 3000 })

// browse for all http services
bonjour.find({ type: 'http' }, function (service) {
  console.log('Found an HTTP server:', service)
})
```

## API

### Initializing

```js
var bonjour = require('bonjour-hap')([options])
```

The `options` are optional and will be used when initializing the
underlying multicast-dns server. For details see [the multicast-dns
documentation](https://github.com/mafintosh/multicast-dns#mdns--multicastdnsoptions).

### Publishing

#### `var service = bonjour.publish(options)`

Publishes a new service.

Options are:

- `name` (string)
- `host` (string, optional) - defaults to local hostname
- `port` (number)
- `type` (string)
- `subtypes` (array of strings, optional)
- `protocol` (string, optional) - `udp` or `tcp` (default)
- `txt` (object, optional) - a key/value object to broadcast as the TXT
  record

IANA maintains a [list of official service types and port
numbers](http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml).

#### `bonjour.unpublishAll([callback])`

Unpublish all services. The optional `callback` will be called when the
services have been unpublished.

#### `bonjour.destroy()`

Destroy the mdns instance. Closes the udp socket.

### Browser

#### `var browser = bonjour.find(options[, onup])`

Listen for services advertised on the network. An optional callback can
be provided as the 2nd argument and will be added as an event listener
for the `up` event.

Options (all optional):

- `type` (string)
- `subtypes` (array of strings)
- `protocol` (string) - defaults to `tcp`
- `txt` (object) - passed into [dns-txt
  module](https://github.com/watson/dns-txt) contructor. Set to `{
  binary: true }` if you want to keep the TXT records in binary

#### `var browser = bonjour.findOne(options[, callback])`

Listen for and call the `callback` with the first instance of a service
matching the `options`. If no `callback` is given, it's expected that
you listen for the `up` event. The returned `browser` will automatically
stop it self after the first matching service.

Options are the same as given in the `browser.find` function.

#### `Event: up`

Emitted every time a new service is found that matches the browser.

#### `Event: down`

Emitted every time an existing service emmits a goodbye message.

#### `browser.services`

An array of services known by the browser to be online.

#### `browser.start()`

Start looking for matching services.

#### `browser.stop()`

Stop looking for matching services.

#### `browser.update()`

Broadcast the query again.

### Service

#### `Event: up`

Emitted when the service is up.

#### `Event: error`

Emitted if an error occurrs while publishing the service.

#### `service.stop([callback])`

Unpublish the service. The optional `callback` will be called when the
service have been unpublished.

#### `service.start()`

Publish the service.

#### `service.updateTxt(object)`

Update the txt record of the service.

#### `service.name`

The name of the service, e.g. `Apple TV`.

#### `service.type`

The type of the service, e.g. `http`.

#### `service.subtypes`

An array of subtypes. Note that this property might be `null`.

#### `service.protocol`

The protocol used by the service, e.g. `tcp`.

#### `service.host`

The hostname or ip address where the service resides.

#### `service.port`

The port on which the service listens, e.g. `5000`.

#### `service.fqdn`

The fully qualified domain name of the service. E.g. if given the name
`Foo Bar`, the type `http` and the protocol `tcp`, the `service.fqdn`
property will be `Foo Bar._http._tcp.local`.

#### `service.txt`

The TXT record advertised by the service (a key/value object). Note that
this property might be `null`.

#### `service.published`

A boolean indicating if the service is currently published.

## License

MIT
