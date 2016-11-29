;
(function(global, factory) {
  if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    global = factory();
  }
}(typeof window !== "undefined" ? window : this, function(require) {
  <%= contents %>
  return <%= exports %>;
}));