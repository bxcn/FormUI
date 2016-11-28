'use strict';

define(function (require, exports, module) {

  module.exports.init = function () {
    require('lib/jquery');
    require('formUI').init();
  };
});