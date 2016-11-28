

define('oneToMany',['require','exports','module'],function (require, exports, module) {
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


define('groupToLeaf',['require','exports','module'],function (require, exports, module) {
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


define('formUI',['require','exports','module','oneToMany','groupToLeaf'],function (require, exports, module) {

  module.exports.init = function () {

    /** 自定义，如： 默认的 checkbox、radio的样式不能满足需要可以用这种方式
    <div>
      <h2>请选择性别：</h2>
      <div class="jradio ">
        <input type="radio" name="radio" data-one="radio"  value="1" /> 男
      </div>
      <div class="jradio">
        <input type="radio" name="radio" data-one="radio" value="0" /> 女
      </div>
    </div>
     */
    // 一对多的关系
    require('oneToMany').init();
    // 组写叶节点的关系
    require('groupToLeaf').init();

    /** 
     验证动态加载皮肤, 默认建议用这种方式
     jcheckbox jradio
     <div>
      <h2>是否全选：</h2>
      <input type="radio" name="radio1" data-component="leaf1" data-one="isRadio0"   value="1"  data-label="选择1"/>
      <input type="checkbox" data-leaf="leaf1" value="1"  data-label="JavaScript工程师"/>
      <input type="checkbox" data-leaf="leaf1" value="1"  data-label="PHP工程师"/>
      <input type="checkbox" data-leaf="leaf1" value="1"  data-label="Web前端工程师"/>
      <br>
      <input type="radio" name="radio1" data-component="leaf2"  data-one="isRadio0" value="1"  data-label="选择2"/>
      <input type="checkbox" data-leaf="leaf2" value="1"  data-label="JavaScript工程师"/>
      <input type="checkbox" data-leaf="leaf2" value="1"  data-label="PHP工程师"/>
      <input type="checkbox" data-leaf="leaf2" value="1"  data-label="Web前端工程师"/>
    </div>
     */
    $(document).find("[data-one][data-label],[data-many][data-label],[data-leaf][data-label]").each(function () {
      var jcheckbox = 'jcheckbox',
          jradio = 'jradio',
          child = $(this),
          isParent = child.parent('label.formUI').length;

      // 解决加载多次 require('formUI').init();
      if (isParent) {
        return false;
      }
      var checked = child.prop('checked');
      var active = checked ? 'active' : '';
      var label = child.data('label');
      var type = child.attr('type');
      var className = type == "checkbox" ? jcheckbox : jradio;
      child.wrap(function (i, input) {
        return '<label class="formUI ' + className + ' ' + active + '">' + label + '</label>';
      });
    });
  };
});
