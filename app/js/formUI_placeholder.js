define(function(require, exports, module) {
  module.exports.init = function() {
    var supportPlaceholder = 'placeholder' in document.createElement('input'),
      placeholder = function(input) {
        var text = input.attr('placeholder'),
          value = input.value;
        if (!value) {

          input.val(text).addClass("phcolor");
        }
        input.focus(function() {
          if (input.val() == text) {
            $(this).val("");
          }
        });
        input.blur(function() {
          if (input.val() == "") {
            $(this).val(text).addClass("phcolor");
          }
        });
        //输入的字符不为灰色
        input.keydown(function() {
          $(this).removeClass("phcolor");
        });
      };

    //当浏览器不支持placeholder属性时，调用placeholder函数
    if (!supportPlaceholder) {
      $('input').each(function() {
        var that = $(this);
        text = that.attr("placeholder");
        if (that.attr("type") == "text") {
          placeholder(that);
        }
      });
    }
  }
});