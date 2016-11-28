define(function(require, exports, module) {

  module.exports.init = function() {

    // 一对多的关系
    var one = one || '[data-one]';
    var many = many || '[data-many]';
    $(document).off("change.bs.oneToMany");

    $(document).on("change.bs.oneToMany", one, function(ev) {
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
          $('[data-many="' + contact + '"]')
            .prop("checked", checked)
            .parent()
            .toggleClass('active', checked);
        }

      })
      .on("change.bs.oneToMany", many, function(ev) {

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

          $('[data-one="' + contact + '"]')
            .prop("checked", checked)
            .parent()
            .toggleClass('active', checked);
        }

      });

    // 组与节点的关系
    var component = component || '[data-component]';
    var leaf = leaf || '[data-leaf]';

    $(document).off('change.bs.componenttoLeaf');

    $(document).on("change.bs.componenttoLeaf", component, function(ev) {
      var that = $(this);
      var checked = that.prop('checked');
      //判断是否有子节，如果没有写成<input data-gorup value="1" name="component"/>
      var leaf = that.data('component');
      var type = that.prop('type');
      var one = that.data('one');
      // 单选按钮点击时清楚其它单选按钮component和 leaf清空
      if (type == "radio") {
        const list = $('[data-one="' + one + '"]');
        list.each(function(i, child) {
          child = $(child);
          const leaf = child.data('component');
          $('[data-leaf="' + leaf + '"]')
            .prop("checked", false)
            .parent()
            .toggleClass('active', false);
        });
      }

      // 当前节点选中
      that.parent().toggleClass('active', checked);
      // 关联对象
      if (leaf) {
        $('[data-leaf="' + leaf + '"]')
          .prop("checked", checked)
          .parent()
          .toggleClass('active', checked);
      }

    }).on("change.bs.componenttoLeaf", leaf, function(ev) {
      var that = $(this);
      var checked = that.prop('checked');
      var component = that.data('leaf');

      var type = $('[data-component="' + component + '"]').attr('type');
      var one = $('[data-component="' + component + '"]').data('one');
      if (type == "radio") {
        // 单选集合
        const list = $('[data-one="' + one + '"]');

        list.each(function(i, child) {

          child = $(child);
          if (child.data('component') != component) {

            child
              .prop("checked", false)
              .parent()
              .toggleClass('active', false);

            const leaf = child.data('component');
            $('[data-leaf="' + leaf + '"]')
              .prop("checked", false)
              .parent()
              .toggleClass('active', false);
          }
        });
      }

      // 当前节点选中
      that.parent().toggleClass('active', checked);

      // leaf节点是否有选中的，如果有选中的就把component节点选中
      var checked = !!$('[data-leaf="' + component + '"]').filter(":checked").size();
      $('[data-component="' + component + '"]')
        .prop("checked", checked)
        .parent()
        .toggleClass('active', checked);

    });

    $(document).find("[data-one][data-label],[data-many][data-label],[data-leaf][data-label]").each(function() {
      const jcheckbox = 'jcheckbox',

        jradio = 'jradio',

        child = $(this),

        isParent = child.parent('div.formUI').length;

      // 解决加载多次 require('formUI').init();
      if (isParent) {
        return false;
      }
      const checked = child.prop('checked');
      const active = checked ? 'active' : '';
      const label = child.data('label');
      const type = child.attr('type');
      const className = type == "checkbox" ? jcheckbox : jradio;
      child.wrap(function(i, input) {
        return '<div class="formUI ' + className + ' ' + active + '">' + label + '</div>';
      });
    });
  };
});
