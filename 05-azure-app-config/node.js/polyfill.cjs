// Preload shim to ensure the built-in 'buffer' module exports a SlowBuffer
// property for older dependencies that expect it (Node 26 removed SlowBuffer).
try {
  var buf = require('buffer');
  if (typeof buf.SlowBuffer === 'undefined') {
    buf.SlowBuffer = buf.Buffer;
  }
} catch (e) {
  // ignore
}
module.exports = {};
