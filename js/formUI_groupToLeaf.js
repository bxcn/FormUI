'use strict';

define(function (require, exports, module) {
  module.exports.init = function () {

    // 组与节点的关系
    var component = component || '[data-component]';
    var leaf = leaf || '[data-leaf]';

    $(document).off('change.bs.componenttoLeaf');

    $(document).on("change.bs.componenttoLeaf", component, function (ev) {
      var that = $(this);
      var checked = that.prop('checked');
      //判断是否有子节，如果没有写成<input data-gorup value="1" name="component"/>
      var leaf = that.data('component');
      var type = that.prop('type');
      var one = that.data('one');
      // 单选按钮点击时清楚其它单选按钮component和 leaf清空
      if (type == "radio") {
        var list = $('[data-one="' + one + '"]');
        list.each(function (i, child) {
          child = $(child);
          var leaf = child.data('component');
          $('[data-leaf="' + leaf + '"]').prop("checked", false).parent().toggleClass('active', false);
        });
      }

      // 当前节点选中
      that.parent().toggleClass('active', checked);
      // 关联对象
      if (leaf) {
        $('[data-leaf="' + leaf + '"]').prop("checked", checked).parent().toggleClass('active', checked);
      }
    }).on("change.bs.componenttoLeaf", leaf, function (ev) {
      var that = $(this);
      var checked = that.prop('checked');
      var component = that.data('leaf');

      var type = $('[data-component="' + component + '"]').attr('type');
      var one = $('[data-component="' + component + '"]').data('one');
      if (type == "radio") {
        // 单选集合
        var list = $('[data-one="' + one + '"]');

        list.each(function (i, child) {

          child = $(child);
          if (child.data('component') != component) {

            child.prop("checked", false).parent().toggleClass('active', false);

            var _leaf = child.data('component');
            $('[data-leaf="' + _leaf + '"]').prop("checked", false).parent().toggleClass('active', false);
          }
        });
      }

      // 当前节点选中
      that.parent().toggleClass('active', checked);

      // leaf节点是否有选中的，如果有选中的就把component节点选中
      var checked = !!$('[data-leaf="' + component + '"]').filter(":checked").size();
      $('[data-component="' + component + '"]').prop("checked", checked).parent().toggleClass('active', checked);
    });
  };
});