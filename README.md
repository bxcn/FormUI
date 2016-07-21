自定义CR.js：Radio Checkbox
=======================
调用方式：
```
  $(".sex").radio();

  var itemCheckBox = $(".itemCheckBox").checkbox({
    addClass: "checkboxBlue"
  });


  var allCheck = $(".allCheck").checkbox( {
    addClass:"checkboxBlue", 
    contact: itemCheckBox,
    validate: function(){
      return true;
    },
    changed:function(that) {
      if (that.prop("checked")) {
        itemCheckBox.addChecked();
      }
      else {
        itemCheckBox.removeChecked();
      }
    }
  });
});
```

#CR组件参数： 
参数：
* addClass:定义样式
* contact:在全部时关联的组件对象(可选项)
* validate:点击自定义元素前的回调函数验证，参数有元素本身、选中的元素个数，元素总个数，true表示验证通过；false:表示验证失败；如：最多可以添加三个元素等等(可选项)
* changed:  点击元素后的回调函数，参数有元素本身(可选项)
#CR组件返回对象的方法：
* addChecked:选中全部元素，可以带参数array数组，表示把数组中的值对应的元素value一致的选中
* removeChecked:取消全部元素,可以带参数array数组，表示把数组中的值对应的元素value一致的取消选中
