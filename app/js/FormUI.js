define(function(require, exports, module) {
  module.exports.init = function() {
    // 一对多的关系
    var checkBoxOne = checkBoxOne || '[data-checkbox-one]';
    var checkBoxMany = checkBoxMany || '[data-checkbox-many]';

    $(document).on("change.bs.checkbox", checkBoxOne, function(ev) {
        var that = $(this);
        var checked = that.prop('checked');
        // 打上对勾
        that.parent().toggleClass('active', checked);
        // 关联对象
        var contact = that.attr('data-checkbox-one');
        if (contact) {
          $('[data-checkbox-many="' + contact + '"]')
            .prop("checked", checked)
            .parent()
            .toggleClass('active', checked);
        }

      })
      .on("change.bs.checkbox", checkBoxMany, function(ev) {

        var that = $(this);
        var checked = that.prop('checked');
        // 打上对勾
        that.parent().toggleClass('active', checked);
        // 关联对象
        var contact = that.attr('data-checkbox-many');
        if (contact) {
          var checkBoxManyAll = $('[data-checkbox-many="' + contact + '"]');
          var checkBoxManyCheckedAll = checkBoxManyAll.filter(":checked");
          // 多的一方是不是全部选中
          checked = checkBoxManyAll.size() == checkBoxManyCheckedAll.size();

          $('[data-checkbox-one="' + contact + '"]')
            .prop("checked", checked)
            .parent()
            .toggleClass('active', checked);
        }

      });
  };
});