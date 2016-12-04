#一个专门针对input中checkbox、radio类型的皮肤组件，功能包括单选、多选、全选和不全选功能

调用方式：
CSS:
```
<link rel="stylesheet" href="css/formUI.css">
```
JS：
```
<script src="js/formUI.js"></script>
```
图片效果：

![image](https://github.com/bxcn/formUI/raw/master/raw/all.png)

![image](https://github.com/bxcn/formUI/blob/master/raw/all.png)

单个使用方式(有wrap的):
```
<div class="jcheckbox">
  <input type="checkbox" data-one="item" value="1" />我会javascript
</div>
```
单个使用方式(无皮肤):
```
<input type="checkbox" data-one value="1" checked data-label="JavaScript工程师" /> 
```

关联使用方式(有wrap的):
```
<div>
  <h2>请选择招聘职位：</h2>
  <div class="jcheckbox">
    <input type="checkbox" data-one="item" value="1" /> 全选
  </div>
  <div class="jcheckbox">
    <input type="checkbox" data-many="item" value="1" /> JavaScript工程师
  </div>
  <div class="jcheckbox">
    <input type="checkbox" data-many="item" value="1" /> PHP工程师
  </div>
  <div class="jcheckbox">
    <input type="checkbox" data-many="item" value="1" /> Web前端工程师
  </div>
</div>
```

关联使用方式(无皮肤):
```
<div>
  <h2>请选择招聘职位：</h2>
  <div class="jcheckbox">
    <input type="checkbox" data-one="job" value="1" /> 全选
  </div>
  <input type="checkbox" data-many="job" value="1" checked data-label="JavaScript工程师1" /> 
  <input type="checkbox" data-many="job" value="2" checked data-label="JavaScript工程师2" /> 
  <input type="checkbox" data-many="job" value="3" checked data-label="JavaScript工程师3" /> 
</div>
```

单选使用方式(有皮肤):
```
<div>
  <h2>请选择性别：</h2>
  <div class="jradio ">
    <input type="radio" name="radio" data-one="radio"  value="1" /> 男
  </div>
  <div class="jradio">
    <input type="radio" name="radio" data-one="radio" value="0" /> 女
  </div>
</div>
```

单选使用方式(有皮肤):
```
<div>
  <h2>请选择性别：</h2>
  <input type="radio" name="radio" data-one="radio"  value="1" data-label="男" /> 
  <input type="radio" name="radio" data-one="radio" value="0" data-label="女" /> 
</div>
```


[Dome](http://bxcn.github.io/formUI/)

#jssrc配置
* "validateLineBreaks": "CRLF" // 回车换行

requireSemicolons 验证分号
require space before block statements 块语句之前需要空格

requireSpacesInsideParentheses:圆括号中加空格
requireSpaceAfterComma:逗号后验证空格
requireCapitalizedComments:


