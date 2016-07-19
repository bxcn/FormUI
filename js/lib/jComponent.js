/**
 * Created by Administrator on 2015/12/22.
 */

function JTheme(container, settings) {
  var defaults = {
    addClass: "checkboxBlue",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    changed: function() {
      return true;
    }
  };
  // jquery匹配的窗口
  this.container = container;
  // 继承
  this.settings = $.extend({}, defaults, settings);

  //匹配的checkbox
  this.checkbox = this.container.find("input");
  //初始化
  this.init();
}

JTheme.prototype = {
  constructor: JTheme,
  init: function() {
    var self = this;

    this.container.delegate("input", "change", function(){
      self.change($(this));
    });

    return this.container.each(function() {
      var that = $(this);
      var inputElement = null;
      if (!that.hasClass("jComponentContainer")) {
        inputElement = that.find("input");
        that.addClass("jComponentContainer");
        inputElement.addClass("jComponent " + self.settings.addClass).after("<i class='jComponentIcon blur'></i>");
        if (self.settings.width && self.settings.width) {
          inputElement.next("i").css({
            "width": self.settings.width,
            "height": self.settings.height
          });
        }
        self.change(inputElement);
      }

    });
  },
  /*  setContainerSize: function(that) {
      // 设置容器尺寸
      that = $(that);
      var containerWidth = that.css("width");
      var containerHeight = that.css("height");
      that.css({
        "width": containerWidth,
        "height": containerHeight
      });
    },*/
  change: function(that) {

    var self = this;
    var left = self.settings.left;
    var top = self.settings.top;
    // 通过架设函数来判断是否可以选中
    var isAction = self.settings.changed(that, self.container.find(":checked").size());

    if (that.prop("checked") && isAction) {

      /**
       * 每次有新的选中状态时就清除所有已选中的radio
       */
      if (that.attr("type") == "radio") {
        // 清除所有的样式
        $("input[name='" + that.attr("name") + "']").next("i").removeClass("active");
      }

      that.next().addClass("active");

      // 此代码在ie8浏览器下无效（不支持动态添加class中的图片），但在兼容模式下可以，
      // _that.next("i").addClass("jComponentChecked");

    } else {
      that.prop("checked", false);
      that.next().removeClass("active");
    }

  },
  // 全部选中
  addSelected: function() {

    var self = this;
    var left = self.settings.left;
    var top = self.settings.top;
    this.checkbox.each(function(i, data) {
      var that = $(data);
      that.parent().find(".jComponentIcon").addClass("active");
      that.prop("checked", true);
    });
  },
  // 清空所有选中的
  removeSelected: function() {
    var self = this;
    var left = self.settings.left;
    var top = self.settings.top;
    this.checkbox.each(function(i, data) {
      var that = $(data);
      that.prop("checked", false);
      that.parent().find(".jComponentIcon").removeClass("active");
    });
  },
  // 默认加载项
  load: function(arr) {
    this.removeSelected();
    this.checkbox.each(function(i, data) {
      var that = $(data);
      var value = that.val();
      for (var i = 0, len = arr.length; i < len; i++) {
        if (value == arr[i]) {
          that.parent().find(".jComponentIcon").addClass("active");
          that.prop("checked", true);
        }
      }
    });
  },
  // 返回选中的值
  getValue: function() {
    var array = [];
    this.checkbox.each(function(i, data) {
      var that = $(data);
      if (that.prop("chekced")) {
        array.push(that.val());
      }
    });

    return array;
  }
};
(function() {
  $.fn.checkbox = $.fn.radio = function(settings) {
    var s = +(new Date());
    var jtheme =  new JTheme(this, settings);
    var e = +(new Date());
    console.log((e - s));
    return jtheme;
  }
})();