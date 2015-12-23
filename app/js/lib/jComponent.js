/**
 * Created by Administrator on 2015/12/22.
 */
;(function(){

    $.fn.jComponent = function( options ) {

        var defaults = {
            setting : {
                iconSize:16,
                backgroundImage:"", // ICON图片
                position:[0,0], // ICON图片定位
                addInputClass: "radio16"
            }
        };

        var browser=navigator.appName
        var b_version=navigator.appVersion
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
                                              .addClass(params.addInputClass+params.iconSize[0])
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
                    jComponentSelectList.show();
                    jComponentSelectIcon.addClass("jComponentSelectIconOpen");
                } else {
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