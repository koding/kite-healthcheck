#!/usr/bin/env node
var argv = require('minimist')(process.argv),
    Kite = require('kite.js/promises'),
    SockJs = require('node-sockjs-client')
;

new Kite({
  url: argv.u,
  transportClass: argv.sockjs ? SockJs : undefined // it'll default to WS
})
  .on('error', fail)
  .on('info', argv.v ? info : noop)
  .tell('kite.ping')
  .timeout(argv.t ? argv.t * 1000 : 10000)
  .then(succeed, fail)
;

function noop() {}

function info(info) {
  console.info(info);
}

function fail(error) {
  console.error(error);
  process.exit(1);
}

function succeed() {
  process.exit(0);
}
