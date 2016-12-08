import React, {Component} from 'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../configs';
import isFunction from '../../components/_utils/isFunction';
import './index.less';

/* 按钮基本样式 */
const BUTTON_CLASS = CLASS_PREFIX + 'btn';

/**
 * 按钮类型
 * @param {String} type 按钮类型
 * 
 * primary 主按钮
 * default || -- || '' 次按钮 默认按钮
 * ghost 幽灵按钮
 * dashed 虚线按钮
 */
const BUTTON_PRIMARY = BUTTON_CLASS + '-primary';
const BUTTON_DEFAULT = BUTTON_CLASS;
const BUTTON_GHOST = BUTTON_CLASS + '-ghost';
const BUTTON_DASHED = BUTTON_CLASS + '-dashed';

/**
 * 按钮大小
 * @param {String} size 按钮大小
 * large 大按钮
 * default || -- || '' 中按钮  默认按钮
 * small 小按钮
 */
const BUTTON_SIZE_LARGE = BUTTON_CLASS + '-lg';
const BUTTON_SIZE_DEFAULT = BUTTON_CLASS;
const BUTTON_SIZE_SMALL = BUTTON_CLASS + '-sm';

/**
 * 按钮选中
 * 
 * @param {Bool} pressing 按钮选中
 */
const BUTTON_PRESSING = BUTTON_CLASS + '-pressing';

/**
 * 按钮禁用
 * @param {Bool} disabled 按钮禁用
 */
const BUTTON_DISABLED = BUTTON_CLASS + '-disabled';

/**
 * 加载按钮
 * @param {Bool} loading 是否启用加载按钮
 */
const BUTTON_LOADING = BUTTON_CLASS + '-loading';


/**
 * button props类型验证
 *
 * @param {String} type 按钮类型
 * @param {String} size 按钮大小
 * @param {String} icon 按钮图标
 * @param {Bool} disabled 按钮禁用标志
 * @param {Func} onClick 按钮点击事件
 */
const propTypes = {
  type: React.PropTypes.string,
  size: React.PropTypes.string,
  icon: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func
};

/**
 * button 默认配置
 */
const defaultProps = {
  type: 'default',
  size: 'default',
  icon: '',
  disabled: false,
  onClick: function(disabled){}
};

class Button extends Component {
  constructor(props) {
    super(props);
    
    this.state = { pressing: false };

    this.handleClick = this.handleClick.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleUp = this.handleUp.bind(this);
  }

  handleClick() {
    const props = this.props;
    const disabled = props.disabled;
    const onClick = props.onClick;
    const loading = props.loading;

    if(!disabled && !loading && isFunction(onClick)) onClick();
  }

  handleDown() {
    const props = this.props;
    const disabled = props.disabled;
    if(!disabled) this.setState({ pressing: true });
  }

  handleUp() {
    const props = this.props;
    const disabled = props.disabled;
    if(!disabled) this.setState({ pressing: false });
  }

  render() {
    const { className, type, size, icon, disabled, loading, onClick, children, ...rest} = this.props;
    const buttonClasses = classnames(className, BUTTON_CLASS, {
      [BUTTON_PRIMARY]: type === 'primary',
      [BUTTON_GHOST]: type === 'ghost',
      [BUTTON_DASHED]: type === 'dashed',
      [BUTTON_SIZE_LARGE]: size === 'large',
      [BUTTON_SIZE_SMALL]: size === 'small',
      [BUTTON_PRESSING]: this.state.pressing || loading,
      [BUTTON_DISABLED]: disabled,
      [BUTTON_LOADING]: !disabled && loading
    });

    return (
      <div
        { ...rest }
        className={ buttonClasses }
        onMouseDown={ this.handleDown }
        onMouseOver={ this.handleDown }
        onMouseUp={ this.handleUp }
        onMouseLeave={ this.handleUp }
        onTouchStart={ this.handleDown }
        onTouchEnd={ this.handleUp }
        onTouchCancel={ this.handleUp }
        onClick={ this.handleClick }>
        { children }
      </div>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;