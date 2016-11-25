'use strict';

define(function (require, exports, module) {
  module.exports.init = function () {

    // 组与节点的关系
    var group = group || '[data-group]';
    var leaf = leaf || '[data-leaf]';

    $(document).off('change.bs.grouptoLeaf');

    $(document).on("change.bs.grouptoLeaf", group, function (ev) {
      var that = $(this);
      var checked = that.prop('checked');
      //判断是否有子节，如果没有写成<input data-gorup value="1" name="group"/>
      var leaf = that.data('group');
      var type = that.prop('type');
      var one = that.data('one');
      // 单选按钮点击时清楚其它单选按钮group和 leaf清空
      if (type == "radio") {
        var list = $('[data-one="' + one + '"]');
        list.each(function (i, child) {
          child = $(child);
          var leaf = child.data('group');
          $('[data-leaf="' + leaf + '"]').prop("checked", false).parent().toggleClass('active', false);
        });
      }

      // 当前节点选中
      that.parent().toggleClass('active', checked);
      // 关联对象
      if (leaf) {
        $('[data-leaf="' + leaf + '"]').prop("checked", checked).parent().toggleClass('active', checked);
      }
    }).on("change.bs.grouptoLeaf", leaf, function (ev) {
      var that = $(this);
      var checked = that.prop('checked');
      var group = that.data('leaf');

      var type = $('[data-group="' + group + '"]').attr('type');
      var one = $('[data-group="' + group + '"]').data('one');
      if (type == "radio") {
        // 单选集合
        var list = $('[data-one="' + one + '"]');

        list.each(function (i, child) {

          child = $(child);
          if (child.data('group') != group) {

            child.prop("checked", false).parent().toggleClass('active', false);

            var _leaf = child.data('group');
            $('[data-leaf="' + _leaf + '"]').prop("checked", false).parent().toggleClass('active', false);
          }
        });
      }

      // 当前节点选中
      that.parent().toggleClass('active', checked);

      // leaf节点是否有选中的，如果有选中的就把group节点选中
      var checked = !!$('[data-leaf="' + group + '"]').filter(":checked").size();
      $('[data-group="' + group + '"]').prop("checked", checked).parent().toggleClass('active', checked);
    });
  };
});