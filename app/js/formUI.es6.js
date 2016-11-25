define(function(require, exports, module) {
  class Base {
    constructor() {

    }
    addChecked(name, checked) {

    }
  }
  // 简单的一对多或一对一
  class OneToMany extends Base {
    constructor() {
      // 一对多的关系
      super();
      this.one = '[data-one]';
      this.many = '[data-many]';
    }
    off() {
      $(document).off('change.bs.oneToMany');
    }
    on() {
      const one = this.one;
      const many = this.many;

      this.off();

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

      }).on("change.bs.oneToMany", many, function(ev) {

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

    }

  }

  // 组与节点的关系
  class GrouptoLeaf {
    constructor() {
      this.group = '[data-group]';
      this.leaf = '[data-leaf]';
    }
    off() {
      $(document).off('change.bs.grouptoLeaf');
    }
    on() {
      // 组与节点的关系
      var group = this.group;
      var leaf = this.leaf;

      this.off();

      $(document).on("change.bs.grouptoLeaf", group, function(ev) {
        var that = $(this);
        var checked = that.prop('checked');
        //判断是否有子节，如果没有写成<input data-gorup value="1" name="group"/>
        var leaf = that.data('group');
        var type = that.prop('type');
        var one = that.data('one');
        // 单选按钮点击时清楚其它单选按钮group和 leaf清空
        if (type == "radio") {
          var list = $('[data-one="' + one + '"]');
          list.each(function(i, child) {
            child = $(child);
            var leaf = child.data('group');
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

      }).on("change.bs.grouptoLeaf", leaf, function(ev) {
        var that = $(this);
        var checked = that.prop('checked');
        var group = that.data('leaf');

        var type = $('[data-group="' + group + '"]').attr('type');
        var one = $('[data-group="' + group + '"]').data('one');
        if (type == "radio") {
          // 单选集合
          var list = $('[data-one="' + one + '"]');

          list.each(function(i, child) {

            child = $(child);
            if (child.data('group') != group) {

              child
                .prop("checked", false)
                .parent()
                .toggleClass('active', false);

              var leaf = child.data('group');
              $('[data-leaf="' + leaf + '"]')
                .prop("checked", false)
                .parent()
                .toggleClass('active', false);
            }
          });
        }

        // 当前节点选中
        that.parent().toggleClass('active', checked);

        // leaf节点是否有选中的，如果有选中的就把group节点选中
        var checked = !!$('[data-leaf="' + group + '"]').filter(":checked").size();
        $('[data-group="' + group + '"]')
          .prop("checked", checked)
          .parent()
          .toggleClass('active', checked);

      });
    }
  }

  module.exports.init = function() {

    var oneToMany = new OneToMany();
    oneToMany.on();
    var grouptoLeaf = new GrouptoLeaf();
    grouptoLeaf.on();

  };
});