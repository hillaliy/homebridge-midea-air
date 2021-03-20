/*
   Copyright 2018 Balena Ltd.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
import * as Promise from 'bluebird';
import { expect } from 'chai';
import * as net from 'net';
import * as rp from 'request-promise';

Promise.config({
	longStackTraces: true,
});

const request = rp.defaults({
	resolveWithFullResponse: true,
	simple: false,
});

import * as nodeTunnel from '../src/index';

const PORT = '3128';

describe('tunnel', function() {
	describe('proxy', function() {
		// Sometimes connection takes a few seconds to be established and tests fail,
		// so set a generous timeout here.
		this.timeout(10000);
		before(function(done) {
			this.tunnel = new nodeTunnel.Tunnel();
			return this.tunnel.listen(PORT, done);
		});

		after(function() {
			return this.tunnel.close();
		});

		return it('should proxy http requests', function() {
			const opts = {
				url: 'https://api.balena-cloud.com/ping',
				proxy: `http://localhost:${PORT}`,
				tunnel: true,
			};

			return request.get(opts).then(res => {
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.equal('OK');
			});
		});
	});

	describe('events', function() {
		// Some systems have huge dns lookup timeout, so set a timeout of 1 minute.
		// I suggest you have options timeout:1 on /etc/resolv.conf so this test runs faster.
		this.timeout(60000);

		before(function(done) {
			this.tunnel = new nodeTunnel.Tunnel();
			this.events = [];
			this.tunnel.on('connect', (...args: any[]) =>
				this.events.push({
					name: 'connect',
					data: args,
				}),
			);
			this.tunnel.on('error', (...args: any[]) =>
				this.events.push({
					name: 'error',
					data: args,
				}),
			);
			return this.tunnel.listen(PORT, done);
		});

		after(function() {
			return this.tunnel.close();
		});

		it('should generate connect event on success', function() {
			this.events = [];

			const opts = {
				url: 'https://api.balena-cloud.com/ping',
				proxy: `http://localhost:${PORT}`,
				tunnel: true,
			};

			return request(opts)
				.promise()
				.delay(500)
				.then(() => {
					expect(this.events.length).to.equal(1);
					expect(this.events[0])
						.to.have.property('name')
						.that.equals('connect');
					expect(this.events[0]).to.have.property('data');
					expect(this.events[0].data.length).to.equal(3);
					expect(this.events[0].data[0]).to.equal('api.balena-cloud.com');
					expect(this.events[0].data[1]).to.equal('443');
					expect(this.events[0].data[2]).to.be.instanceof(Buffer);
				});
		});

		return it('should generate connect and error events on error', function() {
			this.events = [];

			const opts = {
				url: 'https://api.balenanosuchdomain.error/ping',
				proxy: `http://localhost:${PORT}`,
				tunnel: true,
			};

			return request(opts).catch(() => {
				expect(this.events.length).to.equal(1);
				expect(this.events[0])
					.to.have.property('name')
					.that.equals('error');
				expect(this.events[0]).to.have.property('data');
				expect(this.events[0].data.length).to.equal(1);
				expect(this.events[0].data[0]).to.be.instanceof(Error);
			});
		});
	});

	return describe('half-close connections between tunnel and server', function() {
		// The test server listening on 8080 does not send a FIN packet back when it receives
		// one from VPN tunnel (allowHalfOpen setting). The VPN tunnel should anyway close the
		// connection fully from its side, or else the connection it will remain bound, indefinitely,
		// to the node process with a FIN_WAIT_2 state, therefore wasting resources.
		//
		// If the timeout is hit during tests then the VPN tunnel can potentially leak connections.
		this.timeout(5000);

		// tunnel <-> server connection socket
		let sock: net.Socket;
		const serverPort = 8080;
		const connectStr = `CONNECT localhost:${serverPort} HTTP/1.0\r\nHost: localhost:${serverPort}\r\n\r\n`;

		beforeEach(function(done) {
			this.tunnel = new nodeTunnel.Tunnel();
			this.tunnel.connect = (port: number, host: string) => {
				sock = net.connect(port, host);
				return new Promise((resolve, reject) =>
					sock.on('connect', resolve).on('error', reject),
				).return(sock);
			};
			this.tunnel.listen(PORT, done);
		});

		afterEach(function() {
			this.tunnel.close();
			this.server.close();
		});

		it('should be fully closed when client sends FIN', function(done) {
			this.server = net.createServer({ allowHalfOpen: true }, () =>
				// tunnel <-> server connection properly closed from the tunnel side
				sock.on('close', done),
			);

			this.server.listen(serverPort, () => {
				net.createConnection(PORT, function(this: net.Socket) {
					this.write(connectStr);
					this.on('data', () =>
						// send FIN to tunnel server
						this.end(),
					);
				});
			});
		});

		it('should be fully closed when server sends FIN', function(done) {
			this.server = net.createServer({ allowHalfOpen: true }, socket => {
				// tunnel <-> server connection properly closed from the tunnel side
				sock.on('close', done);
				// send FIN to tunnel server
				socket.end();
			});

			this.server.listen(serverPort, () =>
				net.createConnection(PORT, function(this: net.Socket) {
					this.write(connectStr);
				}),
			);
		});
	});
});
