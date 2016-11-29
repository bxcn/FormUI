;
(function(global, factory) {
 if(typeof exports === 'object') {
    module.exports = factory();
  } else {
    factory(global);
  }
}(typeof window !== "undefined" ? window : this, function(window) {
  	
   <%= contents %>

   window.<%= namespace %> = <%= exports %>;
   if (typeof define === 'function' && (define.amd)) { // AMD Module
    define(function(require){
    	
    	return <%= exports %>;
    });

  } else if ( typeof define === 'function' && define.cmd) {  // CMD Module
  	define(function(require, exports, module) {
  		return <%= exports %>;
  	});
  } else {
  	return <%= exports %>;
  }

  
}));