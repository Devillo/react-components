import React, { Component } from 'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../../configs';

/* option 基本样式 */
const SELECT_OPTION = CLASS_PREFIX + 'select-option';

/* option 选中样式 */
const SELECT_OPTION_SELECTED = SELECT_OPTION + '-selected';

/* option 禁用样式 */
const SELECT_OPTION_DISABLED = SELECT_OPTION + '-disabled';

/* option hover 样式 */
const SELECT_OPTION_ACTIVE = SELECT_OPTION + '-active';

/**
 * option props验证
 *
 * @param {Boolean} disabled 是否进制选择
 * @param {String} sign 唯一的标志
 * @param {String} value 默认根据此属性进行筛选
 */
const propTypes = {
  disabled: React.PropTypes.bool,
  sign: React.PropTypes.string,
  value: React.PropTypes.string
}

/**
 * 默认配置
 */
const defaultProps = {
  disabled: false
}

/**
 * 子选项父组件上下文验证
 */
const contextTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array
  ]),
  onChange: React.PropTypes.func,
  setValue: React.PropTypes.func
}

class Option extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.handleDown = this.handleDown.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(value) {
    if(!this.props.disabled && this.context.value != value) {
      this.context.onChange(value);
    }
    this.context.setValue(value)
  }

  handleDown() {
    if(!this.props.disabled) {
      this.setState({
        active: true
      })
    }
  }

  handleUp() {
    if(!this.props.disabled) {
      this.setState({
        active: false
      })
    }
  }

  render() {
    const { className, disabled, value, ...rest } = this.props;

    const { active } = this.state;

    const rootValue = this.context.value;
    let selected;
    if(typeof rootValue === 'string') {
      selected = rootValue === value;
    } else {
      selected = rootValue.indexOf(value)> -1
    }

    const classes = classnames(SELECT_OPTION, {
      [SELECT_OPTION_DISABLED]: disabled,
      [SELECT_OPTION_ACTIVE]: active,
      [SELECT_OPTION_SELECTED]: selected
    });

    return (
      <li
        { ...rest }
        className = { classes }
        onClick={ () => this.handleClick(value) }
        onMouseDown={ this.handleDown }
        onMouseOver={ this.handleDown }
        onMouseUp={ this.handleUp }
        onMouseLeave={ this.handleUp } >
        { value }
      </li>
    );
  }
}

Option.propTypes = propTypes;
Option.defaultProps = defaultProps;
Option.contextTypes = contextTypes;

export default Option;
