#!/usr/bin/env node
var argv = require('minimist')(process.argv),
    Kite = require('kite.js/promises'),
    SockJs = require('node-sockjs-client')
    logLevels = require('kite.js/logging').logLevels
;

//Some distros dont ship with RapidSSL CA Certs
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

if ('string' !== typeof argv.u) {
  fail(new Error("You must provide a url via the -u flag!"))
}

new Kite({
  url: argv.u,
  transportClass: argv.sockjs ? SockJs : undefined, // it'll default to WS
  logLevel: argv.v ? logLevels.DEBUG : logLevels.WARNING
})
  .on('error', fail)
  .tell('kite.ping')
  .timeout(argv.t ? argv.t * 1000 : 10000)
  .then(succeed, fail)
;

function fail(error) {
  console.error(error);
  if(argv.n) {
    console.log("CRITICAL cannot connect to " + argv.u)
  }
  process.exit(1);
}

function succeed() {
  if(argv.n) {
    console.log("OK connected to " + argv.u)
  }
  process.exit(0);
}
