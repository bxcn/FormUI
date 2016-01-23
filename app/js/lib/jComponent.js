/**
 * Created by Administrator on 2015/12/22.
 */

function JTheme( container, options ) {
  var defaults = {
    style: "radioOrange",
    top:0,
    left:0,
    width:16,
    height:16
  };
  // jquery匹配的窗口
  this.container = $(container);
  this.checkbox = this.container.find("input[type='checkbox']");
  // 继承
  this.options = $.extend({}, defaults, options );
  //初始化
  this.init();

  return this;
}

JTheme.prototype = {
  constructor: JTheme,
  init: function() {
    var self = this;
    var isIE8 = self.isIE8();

    return self.container.each(function(){
      var that = $(this);
      var inputElement = that.find("input");

      if ( !that.hasClass("jComponentContainer")) {
        that.addClass("jComponentContainer");
      }

      inputElement.addClass("jComponent").addClass(self.options.style);

      // 防止对同一个container窗口多次定义，产生的多个i标签
      if ( that.find("i").size() == 0) {
        inputElement.after("<i class='jComponentIcon'></i>");
        inputElement.next("i").css({"width": self.options.width, "height": self.options.height});
      }

      // 定义container窗口的大小
      // self.setContainerSize( that );

      // 支持 IE8 以下浏览器
      if ( isIE8 ) {
        inputElement.change(function(){
          self.hackIE(inputElement);
        });
        //初始化
        self.hackIE(inputElement);
      }

    });
  },
  isIE8:function() {

    var version=navigator.appVersion.split(";");
    var trim_Version=(version[1]||"").replace(/[ ]/g,"");

    if ( trim_Version == 'MSIE6.0' ||
      trim_Version == 'MSIE7.0' ||
      trim_Version == 'MSIE8.0') {

      return true;
    }

    return false;
  },
  setContainerSize: function(container) {
    // 设置容器尺寸
    container = $(container);
    var containerWidth = container.css("width");
    var containerHeight= container.css("height");
    container.css({"width": containerWidth, "height": containerHeight});
  },
  hackIE: function( that ) {

    var self = this;
    var left = self.options.left;
    var top = self.options.top;

    if ( that.prop("checked") ) {

      /**
       * 每次有新的选中状态时就清除所有已选中的radio
       */
      if ( that.attr("type") == "radio" ) {
        // 清除所有的样式
        $("input[name='" + that.attr("name") + "']").next("i").css({"background-position": left + "px " +  top +"px"});
      }

      that.next().css({"background-position": left - self.options.width + "px " +  top +"px"});

      // 此代码在ie8浏览器下无效（不支持动态添加class中的图片），但在兼容模式下可以，
      // _that.next("i").addClass("jComponentChecked");

    } else {
      that.next().css({"background-position": left + "px " +  top +"px"});
    }

  },
  addChecked: function() {
    if ( this.isIE8() ) {
      // 先删除checked属性 解决全选之前有选中的checkbox，那么再点全选按钮时，选中的元素取消选中，未选中的则反之
      this.checkbox.removeAttr("checked").click();
    } else {
      this.checkbox.prop("checked", true);
    }
    return this;
  },
  removeChecked: function(){
    if ( this.isIE8() ) {
      // 先增加checked属性 解决取消全选之前有未选中的checkbox，那么再点取消按钮时，未选中的元素选中，选中的则反之
      this.checkbox.prop("checked", true).click();
    } else {
      this.checkbox.removeAttr("checked");
    }

    return this;
  }

}

;(function(){

  $.fn.radioOrange = function( options ){

    options = options || {};
    $.extend(options,{
      style: "radioOrange",
      top:-16,
      left:0
    });
    return new JTheme(this, options)
  }

  $.fn.radioBlue = function( options ){

    options = options || {};
    $.extend(options,{
      style: "radioBlue",
      top:0,
      left:0
    });
    return new JTheme(this, options)
  }


  $.fn.checkboxOrange = function( options ){

    options = options || {};-
    $.extend(options,{
      style: "checkboxOrange",
      top:-50,
      left:0,
      width:18,
      height:18
    });
    return new JTheme(this, options)
  }

  $.fn.checkboxBlue = function( options ){

    options = options || {};
    $.extend(options,{
      style: "checkboxBlue",
      top:-32,
      left:0,
      width:18,
      height:18
    });
    return new JTheme(this, options)
  }

})();

;(function($, window, document, undefined ){
    $.fn.jComponentSelect = function( options ) {


        var selectHTML = "";
        selectHTML += "<div class=\"jComponentSelect\">";
        selectHTML += "   <div class=\"jComponentSelectTitleBox\">";
        selectHTML += "     <div class=\"jComponentSelectTitle\" ></div>";
        selectHTML += "       <div class=\"jComponentSelectIcon\"></div>";
        selectHTML += "   </div>";
        selectHTML += "   <ul class=\"jComponentSelectList\"></ul>";
        selectHTML += "</div>";


        var defaults = {
            height:30
        };

        var settings = $.extend({},defaults, options);

        function render () {

        }

        function eventDom() {

        }

        return this.each(function(i, _that ){


            var that = $(_that);

            var optionHTML = that.find("option").map(function(i, data ) {
                var optionHTML = "<li class=\"option\" value=\"{optionValue}\">{optionName}</li>";
                var optionValue = $(data).val();
                var optionName = $(data).text();
                return optionHTML.replace("{optionValue}",optionValue).replace("{optionName}",optionName);
            }).toArray().join().replace(/\,/g,"");

            // console.log(optionHTML);

            that.before(selectHTML);

            var customeSelect = that.prev();

            // HTML select 添加到自定的select dev中
            customeSelect.append(that.hide()).find(".jComponentSelectList").html(optionHTML);

            var jComponentSelectTitleBox = customeSelect.find(".jComponentSelectTitleBox");
            var jComponentSelectTitle = customeSelect.find(".jComponentSelectTitle");
            var jComponentSelectList = customeSelect.find(".jComponentSelectList");
            var jComponentSelectIcon = customeSelect.find(".jComponentSelectIcon");
            var option = customeSelect.find(".option");

            /**
             * wrap Customer Select Div
             */
            customeSelect.width(settings.width).height(settings.height);
            jComponentSelectTitle.width(settings.width - settings.height - 2).height(settings.height).css({"line-height": settings.height+"px"});
            jComponentSelectIcon.width(settings.height).height(settings.height);

            jComponentSelectList.css({top: settings.height-1});

            option.width(settings.width).height(settings.height).css({"line-height": settings.height+"px"});




            function selectList() {
                if ( jComponentSelectList.css("display") == "none" ) {
                    customeSelect.addClass("zIndex100");
                    jComponentSelectList.show();
                    jComponentSelectIcon.addClass("jComponentSelectIconOpen");
                } else {
                    customeSelect.removeClass("zIndex100");
                    jComponentSelectList.hide();
                    jComponentSelectIcon.removeClass("jComponentSelectIconOpen");
                }
            }

            jComponentSelectTitleBox.click(function(){
                selectList();
            });


            function init() {
                var obj = that.find(":selected") || option.eq(0);
                var value = $.trim(obj.attr("value"));
                var name = $.trim(obj.html());

                jComponentSelectTitle.html(name).attr("title",name);
            }

            init();

            that.change(function(){
                init();
            });

            option.click(function(){

                var obj = $(this);
                var value = $.trim(obj.attr("value"));
                var name = $.trim(obj.html());
                jComponentSelectTitle.html(name).attr("title",name);
                that.find("option[value='" + value + "']").attr("selected","selected");

                selectList();
            });


        });
    };
})(jQuery, window, document )
