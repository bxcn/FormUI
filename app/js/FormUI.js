define(function(require, exports, module) {

  module.exports.init = function() {

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
    $(document).find("[data-one][data-label],[data-many][data-label],[data-leaf][data-label]").each(function() {
      const jcheckbox = 'jcheckbox',

      jradio = 'jradio',

      child = $(this),
      
      isParent = child.parent('label').length;

      // 解决加载多次 require('formUI').init();
      if ( isParent ) {
        return false;
      }

      const label = child.data('label');
      const type = child.attr('type');
      const className = type == "checkbox" ? jcheckbox : jradio;
      child.wrap(function(i, input) {
        return '<label class="' + className + '">' + label + '</label>';
      });
    });
  };
});