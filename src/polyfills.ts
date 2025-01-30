/**
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js';

(window as any).global = window;
global.Buffer = global.Buffer || require('buffer').Buffer;
(window as any).process = {
  env: { DEBUG: undefined },
  version: '',
  nextTick: function(fn: () => void) {
    setTimeout(fn, 0);
  }
};