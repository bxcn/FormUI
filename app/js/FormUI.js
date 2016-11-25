define(function(require, exports, module) {
  
  module.exports.init = function() {
    
    require('oneToMany').init();

    require('groupToLeaf').init();

  };
});