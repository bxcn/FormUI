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
  this.container = container;
  // 继承
  this.options = $.extend({}, defaults, options );
  //初始化
  this.init();
}

JTheme.prototype = {
  constructor: JTheme,
  init: function() {
    var self = this;
    var isIE8 = self.isIE8();

    return this.container.each(function(){
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
    var trim_Version=version[1].replace(/[ ]/g,"");

    if ( trim_Version == 'MSIE6.0' ||
      trim_Version == 'MSIE7.0' ||
      trim_Version == 'MSIE8.0') {

      return true;
    }

    return false;
  },
  setContainerSize: function(that) {
    // 设置容器尺寸
    that = $(that);
    var containerWidth = that.css("width");
    var containerHeight= that.css("height");
    that.css({"width": containerWidth, "height": containerHeight});
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

  }


}

;(function(){
/*

    $.fn.jComponent = function( options ) {

        var defaults = {
            setting : {
                iconSize:16,
                backgroundImage:"", // ICON图片
                position:[0,0], // ICON图片定位
                addInputClass: "radio16"
            }
        };

        var browser=navigator.appName;
        var b_version=navigator.appVersion;
        var version=b_version.split(";");
        var trim_Version=version[1].replace(/[ ]/g,"");
        var ltIE8 = false;

        if ( trim_Version == 'MSIE6.0' ||  trim_Version == 'MSIE7.0' ||  trim_Version == 'MSIE8.0') {
            ltIE8 = true;
        }

        var params = $.extend({},defaults.setting, options);

        return this.each(function(){
            var that = $(this);
            var inputElement = that.find("input");
            var inputType = $.trim(inputElement.attr("type"))
            var inputName = $.trim(inputElement.attr("name"));
            var jComponentLabel = that.find("label");

/!*            //  指定容器
            if ( !that.hasClass("jComponentContainer")) {
                that.addClass("jComponentContainer");
            }

            // 设置容器尺寸
            var containerWidth = that.css("width");
            var containerHeight= that.css("height");
            that.css({"width": containerWidth, "height": containerHeight});*!/

            // 给input元素添加 jComponent
            // 在input 元素下面插入一个HTML元素：<i class='jComponentIcon'></i>
            // 并且返回这个新插入的HTML元素
            var jComponentIcon = inputElement.addClass("jComponent")
                                              .addClass(params.addInputClass)
                                              .after("<i class='jComponentIcon'></i>")
                                              .next(".jComponentIcon");

/!*            // icon尺寸大小
            jComponentIcon.width(params.iconSize[0] + "px");
            jComponentIcon.height(params.iconSize[1] + "px");

            if ( params.backgroundImage != '' ) {
                jComponentIcon.css({"background-image": "url('" + params.backgroundImage + "')"});
            }*!/

            // 设置文本尺寸
            var jComponentLabelWidth = jComponentLabel.css("width");
            var jComponentLabelHeight= jComponentLabel.css("height");
            jComponentLabel.css({"width": jComponentLabelWidth, "height": jComponentLabelHeight});

            // 解决IE8中的默认选中的效果
            function changeClickState( _that ) {

                var left = params.position[0];
                var top = params.position[1];

               if ( _that.prop("checked") ) {

                   /!**
                    * 每次有新的选中状态时就清除所有已选中的radio
                    *!/
                   if ( inputType == "radio" ) {
                       // 清除所有的样式
                       inputElement.closest("form,body")
                           .find("input[name='" + inputName + "']")
                           .next(".jComponentIcon")
                           .css({"background-position":  left + "px "+ top +"px"});
                   }


                   _that.next().css({"background-position": "-16px " +  top +"px"});
                   // 此代码在ie8浏览器下无效（不支持动态添加class中的图片），但在兼容模式下可以，
                   // jComponentIcon.addClass("jComponentChecked");
               } else {
                   _that.next().css({"background-position": left + "px "+  top +"px"});
               }
           }

            // 支持 IE8 以下浏览器
            if ( ltIE8 ) {
                inputElement.change(function(){
                    changeClickState($(this));
                });
                //初始化
                changeClickState(inputElement);
            }

        });
    }

  ;
*/


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

    options = options || {};
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
