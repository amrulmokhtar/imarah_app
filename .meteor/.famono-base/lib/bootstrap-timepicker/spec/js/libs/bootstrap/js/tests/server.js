Famono.scope('bootstrap-timepicker/spec/js/libs/bootstrap/js/tests/server', ["connect","http","fs"], function(require, define, exports, module) {
define(function(require, exports, module) {
/*
 * Simple connect server for phantom.js
 * Adapted from Modernizr
 */

var connect = require('connect')
  , http = require('http')
  , fs   = require('fs')
  , app = connect()
      .use(connect.static(__dirname + '/../../'));

http.createServer(app).listen(3000);

fs.writeFileSync(__dirname + '/pid.txt', process.pid, 'utf-8')
});
});