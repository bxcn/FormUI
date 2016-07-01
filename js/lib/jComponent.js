/**
 * Created by Administrator on 2015/12/22.
 */

function JTheme(container, options) {
  var defaults = {
    style: "radioOrange",
    top: 0,
    left: 0,
    width: 16,
    height: 16
  };
  // jquery匹配的窗口
  this.container = $(container);
  this.checkbox = this.container.find("input[type='checkbox']");
  // 继承
  this.options = $.extend({}, defaults, options);
  //初始化
  this.init();

  return this;
}

JTheme.prototype = {
  constructor: JTheme,
  init: function() {
    var self = this;

    return self.container.each(function() {
      var that = $(this);
      var inputElement = that.find("input");

      if (!that.hasClass("jComponentContainer")) {
        that.addClass("jComponentContainer");
      }

      inputElement.addClass("jComponent").addClass(self.options.style);

      // 防止对同一个container窗口多次定义，产生的多个i标签
      if (that.find("i").size() == 0) {
        inputElement.after("<i class='jComponentIcon'></i>");
        inputElement.next("i").css({
          "width": self.options.width,
          "height": self.options.height
        });
      }

      // 定义container窗口的大小
      // self.setContainerSize( that );

      inputElement.change(function() {
        self.hackIE(inputElement);
      });
      //初始化
      self.hackIE(inputElement);


    });
  },
  setContainerSize: function(container) {
    // 设置容器尺寸
    container = $(container);
    var containerWidth = container.css("width");
    var containerHeight = container.css("height");
    container.css({
      "width": containerWidth,
      "height": containerHeight
    });
  },
  hackIE: function(that) {

    var self = this;
    var left = self.options.left;
    var top = self.options.top;

    if (that.prop("checked")) {

      /**
       * 每次有新的选中状态时就清除所有已选中的radio
       */
      if (that.attr("type") == "radio") {
        // 清除所有的样式
        $("input[name='" + that.attr("name") + "']").next("i").css({
          "background-position": left + "px " + top + "px"
        });
      }

      that.next().css({
        "background-position": left - self.options.width + "px " + top + "px"
      });

      // 此代码在ie8浏览器下无效（不支持动态添加class中的图片），但在兼容模式下可以，
      // _that.next("i").addClass("jComponentChecked");

    } else {
      that.next().css({
        "background-position": left + "px " + top + "px"
      });
    }

  },
  addChecked: function() {
    this.checkbox.removeAttr("checked").click();
    return this;
  },
  removeChecked: function() {
    // 先增加checked属性 解决取消全选之前有未选中的checkbox，那么再点取消按钮时，未选中的元素选中，选中的则反之
    this.checkbox.prop("checked", true).click();
    return this;
  }

}

;
(function() {
  $.fn.radioOrange = function(options) {

    options = options || {};
    $.extend(options, {
      style: "radioOrange",
      top: -16,
      left: 0
    });
    return new JTheme(this, options)
  }

  $.fn.radioBlue = function(options) {

    options = options || {};
    $.extend(options, {
      style: "radioBlue",
      top: 0,
      left: 0
    });
    return new JTheme(this, options)
  }


  $.fn.checkboxOrange = function(options) {

    options = options || {}; -
    $.extend(options, {
      style: "checkboxOrange",
      top: -50,
      left: 0,
      width: 18,
      height: 18
    });
    return new JTheme(this, options)
  }

  $.fn.checkboxBlue = function(options) {

    options = options || {};
    $.extend(options, {
      style: "checkboxBlue",
      top: -32,
      left: 0,
      width: 18,
      height: 18
    });
    return new JTheme(this, options)
  }
})();