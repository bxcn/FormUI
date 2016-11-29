;
(function(global, factory) {
 if(typeof exports === 'object') {
    module.exports = factory();
  } else {
    global.<%= namespace %> = factory();
  }
}(typeof window !== "undefined" ? window : this, function() {
  	<%= contents %>
	  
   if (typeof define === 'function' && (define.amd)) { // AMD Module
    define(function(require){
    	return <%= exports %>;
    });

  } else if ( typeof define === 'function' && define.cmd) {  // CMD Module
  	define(function(require, exports, module) {
  		return <%= exports %>;
  	});
  }

  return <%= exports %>;
}));