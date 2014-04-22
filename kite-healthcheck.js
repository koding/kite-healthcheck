argv = require('minimist')(process.argv);
Kite = require('kite.js/promises');

new Kite(argv.u)
  .on('error', fail)
  .on('info', argv.v ? info : noop)
  .tell('kite.heartbeat', 10000 /* arbitrary large number */)
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
