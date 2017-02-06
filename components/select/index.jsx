import React, { Component } from 'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../configs';
import './index.less';

import Option from './option';

/* select 基本样式 */
const SELECT_CLASS = CLASS_PREFIX + 'select';

/* select 大小样式 */
const SELECT_LAGER = SELECT_CLASS + '-lg';
const SELECT_SMALL = SELECT_CLASS + '-sm';

/* select 禁用样式 */
const SELECT_DISABLED = SELECT_CLASS + '-disabled';

/* select 打开样式 */
const SELECT_OPEN = SELECT_CLASS + '-open';

/* select-selection 基本样式 */
const SELECT_SELECTION = SELECT_CLASS + '-selection';

/* select-selection 单选和多选样式 */
const SELECT_SELECTION_SINGLE = SELECT_SELECTION + '-single';
const SELECT_SELECTION_MULTIPLE = SELECT_SELECTION + '-multiple';


/* select-selection__rendered 选择框显示值父框 基本样式 */
const SELECT_SELECTION_RENDERED = SELECT_SELECTION + '__rendered';

/* select-selection-selected-value 显示值样式 */
const SELECT_SELECTION_SELECTED_VALUE = SELECT_SELECTION + '-selected-value';

/* select-arrow 箭头样式 */
const SELECT_ARROW = SELECT_CLASS + '-arrow';

/* select-options-content 基本样式 */
const SELECT_OPTIONS = SELECT_CLASS + '-options-content';

/* select-options-hidden 基本样式 */
const SELECT_OPTIONS_HIDDEN = SELECT_OPTIONS + '-hidden';

/* 选项的父元素基本样式 */
const SELECT_OPTIONS_MENU = SELECT_CLASS + '-options';

/* 选项的父元素单选样式 */
const SELECT_OPTIONS_MENU_SINGLE = SELECT_OPTIONS_MENU + '-single';

/* 选项进入和退出状态样式 */
const SELECT_OPTIONS_ENTER = SELECT_CLASS + '-up-enter';
const SELECT_OPTIONS_LEAVE = SELECT_CLASS + '-up-leave';


/**
 * select props验证
 *
 * @param {String || Array} value 指定当前选中的条目
 * @param {String || Array} defaultValue 指定默认选中的条目
 * @param {Boolean} multiple 支持多选
 * @param {Boolean} allowClear 支持清楚,单选模式有效
 * @param {Boolean || Func} filteroption 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
 * @param {Boolean} tags 可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配
 * @param {Func} onSelect 被选中时调用,参数为选中的value值
 * @param {Func} onDeselect 取消选中时调用,单数为选中项的option value值,仅在multiple 和 tags 模式下生效
 * @param {Func} onChange 选中 option,或 input 的 value 变化(combobox模式下)时,调用此函数
 * @param {Func} onSearch 文本框值变化时调用
 * @param {Func} onBlur 失去焦点时调用
 * @param {Func} onFocus 获得焦点时调用
 * @param {String} placeholder 选择框默认文字
 * @param {String} notFoundContent 当下拉框为空时显示
 * @param {Boolean} dropdownMatchSelectWidth 下拉菜单和选择器同宽
 * @param {String} optionFilterProp 搜索时过滤对应的 option 属性,如设置为children表示对内嵌内容进行搜索
 * @param {String} optionLabelProp 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value。
 * @param {Boolean} combobox 输入框自动提示模式
 * @param {String} size 选择框大小,可选large, small
 * @param {Boolean} showSearch 在选择框中显示搜索框
 * @param {Boolean} disabled 是否禁用
 * @param {Boolean} defaultActiveFirstOption 是否默认高亮第一个选项
 * @param {Obj} dropdownStyle 下拉菜单的style属性
 * @param {String} dropdownClassName 下拉菜单的className属性
 */
const propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array
  ]),
  defaultValue: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array
  ]),
  multiple: React.PropTypes.bool,
  allowClear: React.PropTypes.bool,
  filteroption: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.func
  ]),
  tags: React.PropTypes.bool,
  onSelect: React.PropTypes.func,
  onDeselect: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onSearch: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  notFoundContent: React.PropTypes.string,
  dropdownMatchSelectWidth: React.PropTypes.bool,
  optionFilterProp: React.PropTypes.string,
  optionLabelProp: React.PropTypes.string,
  combobox: React.PropTypes.bool,
  size: React.PropTypes.string,
  showSearch: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  defaultActiveFirstOption: React.PropTypes.bool,
  dropdownStyle: React.PropTypes.object,
  dropdownClassName: React.PropTypes.string
};

/**
 * select 默认配置
 */
const defaultProps = {
  multiple: false,
  allowClear: false,
  filteroption: true,
  tags: false,
  notFoundContent: 'Not Found',
  dropdownMatchSelectWidth: true
};

/**
 * Select 传递给子组件上下文的验证
 *
 * @param {String || Array} value 当前选中的value
 */
const childContextTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array
  ]),
  onChange: React.PropTypes.func,
  setValue: React.PropTypes.func
}

class Select extends Component {
  constructor(props) {
    super(props);

    let value = props.defaultValue;
    if('value' in props) {
      value = props.value;
    }

    this.state = {
      selectOpen: false,
      contentClose: true,
      enter: false,
      leave: false,
      value: value
    }

    this.handleSelectClick = this.handleSelectClick.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  getChildContext() {
    return {
      value: this.state.value,
      onChange: this.props.onChange,
      setValue: this.setValue
    }
  }

  // 设置value值
  setValue(value) {
    this.setState({ value })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value != this.state.value) {
      this.props.onChange(nextProps.value)
    }
    this.setState({
      value: nextProps.value
    });
  }

  // 选择框点击事件
  handleSelectClick() {
    const selectOpen = this.state.selectOpen;
    let self = this;
    if(selectOpen) {
      this.setState({ selectOpen: false, leave: true }, () => {
        setTimeout(() => {
          self.setState({ leave: false, contentClose: true })
        }, 200)
      })
    } else {
      this.setState({ selectOpen: true, contentClose: false, enter: true }, () => {
        setTimeout(() => {
          self.setState({ enter: false })
        }, 200)
      });
    }
  }

  render() {
    const { style, className, multiple, children, disabled, size, ...rest } = this.props;

    const { selectOpen, contentClose, value, enter, leave } = this.state;

    // select classes
    const classes = classnames(SELECT_CLASS, className, {
      [SELECT_DISABLED]: disabled,
      [SELECT_LAGER]: size === 'large',
      [SELECT_SMALL]: size === 'small',
      [SELECT_OPEN]: selectOpen
    });

    // select-selection classes
    const selectionClasses = classnames(SELECT_SELECTION, {
      [SELECT_SELECTION_SINGLE]: !multiple,
      [SELECT_SELECTION_MULTIPLE]: multiple
    })

    // select-options classes
    const optionsClasses = classnames(SELECT_OPTIONS, {
      [SELECT_OPTIONS_MENU_SINGLE]: !multiple,
      [SELECT_OPTIONS_HIDDEN]: contentClose,
      [SELECT_OPTIONS_ENTER]: enter,
      [SELECT_OPTIONS_LEAVE]: leave
    })

    return (
      <div
        { ...rest }
        style = { style }
        className = { classes }
        onClick = { this.handleSelectClick }>
        <div className = { selectionClasses }>
          <div className = { SELECT_SELECTION_RENDERED }>
            <div className = { SELECT_SELECTION_SELECTED_VALUE }> { value } </div>
          </div>
          <span className = { SELECT_ARROW }></span>
        </div>
        <div className = { optionsClasses }>
          <div style={ { overflow: 'auto' } }>
            <ul className = { SELECT_OPTIONS_MENU }>
              { children }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Select.Option = Option;
Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
Select.childContextTypes = childContextTypes;

export default Select;
