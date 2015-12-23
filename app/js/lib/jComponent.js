/**
 * Created by Administrator on 2015/12/22.
 */
$(function(){

    $.fn.jComponent = function( options ) {

        var defaults = {
            setting : {
                iconSize:16,
                backgroundImage:"", // ICON图片
                position:[0,0] // ICON图片定位
            }
        };

        var params = $.extend({},defaults.setting, options);

        return this.each(function(){
            var that = $(this);
            var inputElement = that.find("input");
            var inputType = $.trim(inputElement.attr("type"))
            var inputName = $.trim(inputElement.attr("name"));
            var jComponentLabel = that.find(".jComponentLabel");

            //  指定容器
            if ( !that.hasClass("jComponentContainer")) {
                that.addClass("jComponentContainer");
            }

            // 设置容器尺寸
            var containerWidth = that.css("width");
            var containerHeight= that.css("height");
            that.css({"width": containerWidth, "height": containerHeight});

            // 给input元素添加 jComponent
            // 在input 元素下面插入一个HTML元素：<i class='jComponentIcon'></i>
            // 并且返回这个新插入的HTML元素
            var jComponentIcon = inputElement.addClass("jComponent")
                                                   .after("<i class='jComponentIcon'></i>")
                                                   .next(".jComponentIcon");

            // icon尺寸大小
            jComponentIcon.width(params.iconSize[0] + "px");
            jComponentIcon.height(params.iconSize[1] + "px");

            if ( params.backgroundImage != '' ) {
                jComponentIcon.css({"background-image": "url('" + params.backgroundImage + "')"});
            }

            // 设置文本尺寸
            var jComponentLabelWidth = jComponentLabel.css("width");
            var jComponentLabelHeight= jComponentLabel.css("height");
            jComponentLabel.css({"width": jComponentLabelWidth, "height": jComponentLabelHeight});

            // 解决IE8中的默认选中的效果
            function changeClickState( _that ) {

                var left = params.position[0];
                var top = params.position[1];

               if ( _that.prop("checked") ) {

                   /**
                    * 每次有新的选中状态时就清除所有已选中的radio
                    */
                   if ( inputType == "radio" ) {
                       // 清除所有的样式
                       inputElement.closest("form,body")
                           .find("input[name='" + inputName + "']")
                           .next(".jComponentIcon")
                           .css({"background-position": left + "px "+ top +"px"});
                   }


                   _that.next().css({"background-position": (left - params.iconSize[0]) + "px " +  top +"px"});
                   // 此代码在ie8浏览器下无效（不支持动态添加class中的图片），但在兼容模式下可以，
                   // jComponentIcon.addClass("jComponentChecked");
               } else {
                   _that.next().css({"background-position": left + "px "+  top +"px"});
               }
           }

            inputElement.change(function(){
                changeClickState($(this));
            });

            //初始化
            changeClickState(inputElement);

        });
    }


    $(".sex").jComponent({
        inputName: "name",
        iconSize: [16,16],
        position: [0,0]
    });
    $(".checkbox").jComponent({
        inputName: "name",
        iconSize: [16,16],
        position: [0,-48]
    });
    $(".checkbox14").jComponent({
        inputName: "name",
        iconSize: [20,20],
        position: [0,-60],
        backgroundImage:"../images/jComponent/jComponent_icon_20X20.png"
    });
});