'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(function (require, exports, module) {
  var Base = function () {
    function Base() {
      _classCallCheck(this, Base);
    }

    _createClass(Base, [{
      key: 'addChecked',
      value: function addChecked(name, checked) {}
    }]);

    return Base;
  }();
  // 简单的一对多或一对一


  var OneToMany = function (_Base) {
    _inherits(OneToMany, _Base);

    function OneToMany() {
      _classCallCheck(this, OneToMany);

      var _this = _possibleConstructorReturn(this, (OneToMany.__proto__ || Object.getPrototypeOf(OneToMany)).call(this));
      // 一对多的关系


      _this.one = '[data-one]';
      _this.many = '[data-many]';
      return _this;
    }

    _createClass(OneToMany, [{
      key: 'off',
      value: function off() {
        $(document).off('change.bs.oneToMany');
      }
    }, {
      key: 'on',
      value: function on() {
        var one = this.one;
        var many = this.many;

        this.off();

        $(document).on("change.bs.oneToMany", one, function (ev) {
          var that = $(this);
          var checked = that.prop('checked');
          var type = that.attr('type');
          var one_value = that.data('one');
          if (type == "radio") {
            $('[data-one="' + one_value + '"]').parent().toggleClass('active', false);
          }
          // 打上对勾
          that.parent().toggleClass('active', checked);
          // 关联对象
          var contact = that.attr('data-one');
          if (contact) {
            $('[data-many="' + contact + '"]').prop("checked", checked).parent().toggleClass('active', checked);
          }
        }).on("change.bs.oneToMany", many, function (ev) {

          var that = $(this);
          var checked = that.prop('checked');
          // 打上对勾
          that.parent().toggleClass('active', checked);
          // 关联对象
          var contact = that.attr('data-many');
          if (contact) {
            var manyAll = $('[data-many="' + contact + '"]');
            var manyCheckedAll = manyAll.filter(":checked");
            // 多的一方是不是全部选中
            checked = manyAll.size() == manyCheckedAll.size();

            $('[data-one="' + contact + '"]').prop("checked", checked).parent().toggleClass('active', checked);
          }
        });
      }
    }]);

    return OneToMany;
  }(Base);

  // 组与节点的关系


  var GrouptoLeaf = function () {
    function GrouptoLeaf() {
      _classCallCheck(this, GrouptoLeaf);

      this.group = '[data-group]';
      this.leaf = '[data-leaf]';
    }

    _createClass(GrouptoLeaf, [{
      key: 'off',
      value: function off() {
        $(document).off('change.bs.grouptoLeaf');
      }
    }, {
      key: 'on',
      value: function on() {
        // 组与节点的关系
        var group = this.group;
        var leaf = this.leaf;

        this.off();

        $(document).on("change.bs.grouptoLeaf", group, function (ev) {
          var that = $(this);
          var checked = that.prop('checked');
          //判断是否有子节，如果没有写成<input data-gorup value="1" name="group"/>
          var leaf = that.data('group');
          var type = that.prop('type');
          var one = that.data('one');
          // 单选按钮点击时清楚其它单选按钮group和 leaf清空
          if (type == "radio") {
            var list = $('[data-one="' + one + '"]');
            list.each(function (i, child) {
              child = $(child);
              var leaf = child.data('group');
              $('[data-leaf="' + leaf + '"]').prop("checked", false).parent().toggleClass('active', false);
            });
          }

          // 当前节点选中
          that.parent().toggleClass('active', checked);
          // 关联对象
          if (leaf) {
            $('[data-leaf="' + leaf + '"]').prop("checked", checked).parent().toggleClass('active', checked);
          }
        }).on("change.bs.grouptoLeaf", leaf, function (ev) {
          var that = $(this);
          var checked = that.prop('checked');
          var group = that.data('leaf');

          var type = $('[data-group="' + group + '"]').attr('type');
          var one = $('[data-group="' + group + '"]').data('one');
          if (type == "radio") {
            // 单选集合
            var list = $('[data-one="' + one + '"]');

            list.each(function (i, child) {

              child = $(child);
              if (child.data('group') != group) {

                child.prop("checked", false).parent().toggleClass('active', false);

                var leaf = child.data('group');
                $('[data-leaf="' + leaf + '"]').prop("checked", false).parent().toggleClass('active', false);
              }
            });
          }

          // 当前节点选中
          that.parent().toggleClass('active', checked);

          // leaf节点是否有选中的，如果有选中的就把group节点选中
          var checked = !!$('[data-leaf="' + group + '"]').filter(":checked").size();
          $('[data-group="' + group + '"]').prop("checked", checked).parent().toggleClass('active', checked);
        });
      }
    }]);

    return GrouptoLeaf;
  }();

  module.exports.init = function () {

    var oneToMany = new OneToMany();
    oneToMany.on();
    var grouptoLeaf = new GrouptoLeaf();
    grouptoLeaf.on();
  };
});