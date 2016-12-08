;
( function ( global, factory ) {
  'use strict';
  if ( typeof define === 'function' && (define.amd || define.cmd) ) {
    // AMD\CMD. Register as an anonymous module.
    define( function ( require, exports, module ) {
      return factory( global );
    } );

  } else if ( typeof exports === 'object' ) {
    module.exports = factory();
  } else {
    global.
    formUI = factory( global );
  }
}( typeof window !== "undefined" ? window : this, function ( window ) {

  ;

var formUI = formUI || {};
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
      isParent = child.parent('div.formUI').length;
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
    return '<div class="formUI ' + className + ' ' + active + '">' + label + '</div>';
  });
});
;

// 组与节点的关系
var component = '[data-component]';
var leaf = '[data-leaf]';

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
;

// 一对多的关系
var one = '[data-one]';
var many = '[data-many]';

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
;

var supportPlaceholder = 'placeholder' in document.createElement('input'),
    placeholder = function placeholder(input) {
  var text = input.attr('placeholder'),
      value = input.value;
  if (!value) {

    input.val(text).addClass("phcolor");
  }
  input.focus(function () {
    if (input.val() == text) {
      $(this).val("");
    }
  });
  input.blur(function () {
    if (input.val() == "") {
      $(this).val(text).addClass("phcolor");
    }
  });
  //输入的字符不为灰色
  input.keydown(function () {
    $(this).removeClass("phcolor");
  });
};

//当浏览器不支持placeholder属性时，调用placeholder函数
if (!supportPlaceholder) {
  $('input').each(function () {
    var that = $(this);
    text = that.attr("placeholder");
    if (that.attr("type") == "text") {
      placeholder(that);
    }
  });
}
"use strict";

$('[data-select]').each(function () {
  var html = $(this).html().replace(/(option)/gi, "li");
  //console.log(html);
  $(this).wrap(function () {
    return "\n        <div class=\"formUI_select\">\n          <div class=\"formUI_slected_name\">\u8BF7\u9009\u62E9</div>\n          <ul class=\"formUI_select_list\">" + html + " </ul>\n        </div>\n      ";
  });
});

$(document).on("mouseover.bs.select", '.formUI_select', function () {
  var that = $(this);
  that.find('.formUI_select_list').show();
}).on("mouseout.bs.select", '.formUI_select', function () {
  var that = $(this);
  that.find('.formUI_select_list').hide();
}).on("click.bs.select", '.formUI_select li', function () {
  var that = $(this);
  var selectName = that.closest('.formUI_select').find('.formUI_slected_name');
  selectName.text(that.text());
  that.parent().hide();
});
"use strict";

  return formUI;

} ) );
