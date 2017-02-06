import React, { Component } from 'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../configs';
import isFunction from '../_utils/isFunction';
import './index.less';

/* switch 基本样式 */
const SWITCH_CLASS = CLASS_PREFIX + 'switch';

/* switch size 样式 */
const SWITCH_SMALL = SWITCH_CLASS + '-small';

/* switch 选中样式 */
const SWITCH_CHECKED = SWITCH_CLASS + '-checked';

/* switch 禁用样式 */
const SWITCH_DISABLED = SWITCH_CLASS + '-disabled';

/* swicth 文字样式 */
const SWITCH_INNER = SWITCH_CLASS + '-inner';


/**
 * swicth props 类型验证
 *
 * @param {Boolean} checked 指定当前是否选中
 * @param {Boolean} defaultChecked 初始是否选中
 * @param {Boolean} disables 是否禁用
 * @param {Func} onChange 变化时的回调函数
 * @param {React Node} checkedChildren 选中时的内容
 * @param {React Node} unCheckedChildren 未选中时的内容
 * @param {String} size 开关大小
 */
const propTypes = {
  checked: React.PropTypes.bool,
  defaultChecked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  checkedChildren: React.PropTypes.node,
  unCheckedChildren: React.PropTypes.node,
  size: React.PropTypes.string
};

/**
 * switch 默认配置
 */
const defaultProps = {
  checked: false,
  defaultChecked: false,
  disabled: false,
  onChange: function(checked){},
  checkedChildren: null,
  unCheckedChildren: null,
  size: 'default'
};

class Switch extends Component {
  constructor(props) {
    super(props);

    let checked = props.defaultChecked;

    if('checked' in props) {
      checked = props.checked;
    }

    this.state = { checked: checked }
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if(!this.props.disabled) {
      const checked = !this.state.checked;
      this.setState({
        checked: checked
      });
      this.props.onChange(checked);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked
    })
  }

  render() {
    const { className, disabled, checkedChildren, unCheckedChildren, size, ...rest } = this.props;

    const checked = this.state.checked;

    const classes = classnames(SWITCH_CLASS, {
      [SWITCH_SMALL]: size === 'small',
      [SWITCH_CHECKED]: checked,
      [SWITCH_DISABLED]: disabled
    });

    let inner = checked ? checkedChildren : unCheckedChildren;

    return(
      <span
        { ...rest }
        className = { classes }
        onClick = { this.handleClick } >
        <span className = { SWITCH_INNER }> { inner } </span>
      </span>
    );
  }
}


Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;

