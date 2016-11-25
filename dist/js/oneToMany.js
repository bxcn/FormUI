'use strict';

define(function (require, exports, module) {
  module.exports.init = function () {
    // 一对多的关系
    var one = one || '[data-one]';
    var many = many || '[data-many]';
    $(document).off("change.bs.oneToMany");

    $(document).on("change.bs.oneToMany", one, function (ev) {
      var that = $(this);
      var checked = that.prop('checked');
      var type = that.attr('type');
      var one_value = that.data('one');
      if (type == "radio") {
        $('[data-one="' + one_value + '"]').parent().toggleClass('active', false);
      }
      // 打上对勾
      that.parent().toggleClass('active', checked);
      // 关联对象
      var contact = that.attr('data-one');
      if (contact) {
        $('[data-many="' + contact + '"]').prop("checked", checked).parent().toggleClass('active', checked);
      }
    }).on("change.bs.oneToMany", many, function (ev) {

      var that = $(this);
      var checked = that.prop('checked');
      // 打上对勾
      that.parent().toggleClass('active', checked);
      // 关联对象
      var contact = that.attr('data-many');
      if (contact) {
        var manyAll = $('[data-many="' + contact + '"]');
        var manyCheckedAll = manyAll.filter(":checked");
        // 多的一方是不是全部选中
        checked = manyAll.size() == manyCheckedAll.size();

        $('[data-one="' + contact + '"]').prop("checked", checked).parent().toggleClass('active', checked);
      }
    });
  };
});