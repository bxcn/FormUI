;(function($, window, document, undefined ){

  function SelectUI( jSelect, settings ) {

    var time = +(new Date()).getTime();

    this.settings = settings;
    this.selectContainerUI = "selectContainerUI_" + time;
    this.selectOptionListContainer = "selectOptionListContainer_" + time;
    this.selectTitleContainerUI = "selectTitleContainerUI_" + time;
    this.selectIconUI = "selectIconUI_" + time;
    this.selectTitleUI = "selectTitleUI_" + time;
    this.jSelect = jSelect;
    this.jOptions = this.jSelect.find("option");
    this.jOptionUI = null;


    var selectHTML = "";
    selectHTML += "<div id='"+ this.selectContainerUI +"' class=\"selectUI " + settings.addClass + "\">";
    selectHTML += "   <div id='" + this.selectTitleContainerUI + "'  class=\"selectUITitleBox\">";
    selectHTML += "     <div id='" + this.selectIconUI + "' class=\"selectUIIcon\"></div>";
    selectHTML += "     <div id='" +this.selectTitleUI + "'  class=\"selectUITitle\" ></div>";
    selectHTML += "   </div>";
    selectHTML += "   <ul id='"+ this. selectOptionListContainer +"'  class=\"selectUIList\"></ul>";
    selectHTML += "</div>";

    // 渲染selectUI框架
    this.jSelect.before(selectHTML).hide();

    // selectUI Container
    this.jSelectContainerUI = $("#" +this.selectContainerUI );
    // selectUI 标题修改对象
    this.jSelectTitleUI = $("#" +this.selectTitleUI );
    // selectUI的下拉列表
    this.jSelectListUI = $("#" +this.selectOptionListContainer );
    //icon
    this.jSelectIconUI = $("#" + this.selectIconUI );

    this.init();
  }

  SelectUI.prototype = {
    constructor: SelectUI,
    init: function() {
      // 渲染optionUI
      this.render();
      // 绑定事件
      this.bindEvent();
    },
    renderHead: function( obj ) {

      var value = obj.attr("value");
      var name = obj.html();
      var dataIndex =obj.attr("data-index");

      // 修改原生select的选中项
      this.changeNativeSelect( dataIndex );

      this.jSelectTitleUI.html(name);

      this.close();
    },
    render: function() {

      // 给每个option加data-index索引
      var settings = this.settings;

      // 重新获取Option数据
      this.jOptions = this.jSelect.find("option");

      /** 初始化一些配置
       *  1、给select的option 增加序号
       *  2、回调函数init　对每一个option元素的操作
       */
      this.jOptions.map(function(i, data ){
        $(data).attr("data-index", i);
        settings.init.call(this, $(data));
      });

      // 渲染显示当前的样式 如果找不到selected，默认把第一个做了选中的
      // 渲染selectUI组件的标题及改变打开selectUI列表时的icon状态
      this.renderHead(this.getSelectedOption());

      this.jSelectContainerUI.width(settings.width).height(settings.height).css({"line-height": settings.height+"px"});
      this.jSelectIconUI.width(settings.height).height(settings.height);
      this.jSelectListUI.css({top: settings.height-1});
      this.jOptions.width(settings.width).height(settings.height);

      // 把select中的option转换成li元素
      var optionHTML = this.jSelect.html().replace(/(option)/gi,"li");

      this.jSelectListUI.html(optionHTML).css({"max-height": settings.height * 4});

    },
    // 修改原生select中的option
    changeNativeSelect: function( index ) {
      //this.jOptions.removeAttr("selected");
      this.jOptions.eq( index ).prop("selected",true);
    },
    open: function(  ) {
      this.jSelectListUI.show();
      this.jSelectIconUI.addClass("selectUIIconOpen");
    },
    close: function(  ) {
      this.jSelectListUI.hide();
      this.jSelectIconUI.removeClass("selectUIIconOpen");
    },
    bindEvent: function() {
      var that = this;

/*      $(".subAccount").hover(function(){
      $(".accountMangment").show();
    },
    function(){
      $(".accountMangment").hide();
    });*/
    var list = $("#" + that.selectOptionListContainer);

      $("#" + this.selectTitleContainerUI ).click(function() {
        list.show();
      });

      $("#" + this.selectContainerUI ).hover(function() {
      }, function(){
        list.hide();
      });

      this.jSelectListUI.on("click", "li", function(){
        var _that = $(this);
        var callback = that.settings.before.call(this, _that);
        if ( callback ) {
          that.renderHead(_that);
        }

        //select change执行，回调函数
        that.settings.after.call(this, _that);
      });


    },
    getSelectedOption: function() {
      // 返回选中的option
      var selectedArr = this.jSelect.find("option:selected");
      // 如果没有就返回第一个option
      return selectedArr.length > 0 ? selectedArr : this.jSelect.find("option").eq(0);
    }
  }

  $.fn.selectUI = $.fn.selectUI = function( options ) {

    var defaults = {
      height:30,
      init: function(){},
      before:function(option){
        // false是不可点的，true是可点的
        return true;
      },
      after: function(option) {
        // false是不可点的，true是可点的
        return true;
      }
    };

    // 如果没有找到元素就为0
    if ($(this).size() == 0 ) {
      return {};
    }

    var settings = $.extend({},defaults, options);

    var selectUI = new SelectUI( $(this), settings );

    return selectUI;
  };
})(jQuery, window, document );