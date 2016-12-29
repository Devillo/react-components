import React, { Component } from 'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../../configs';
import '../index.less';
import ObjectAssign from 'object-assign';

import isFunction from '../../../components/_utils/isFunction';

/* Menu.Item 基本样式 */
const MENU_ITEM_CLASS = CLASS_PREFIX + 'menu-item';

/* Menu.Item 选中选中样式 */
const MENU_ITEM_SELECTED = MENU_ITEM_CLASS + '-selected';

/* Menu.Item 触发样式 */
const MENU_ITEM_ACTIVE = MENU_ITEM_CLASS + '-active';

/* Menu.Item 禁用样式 */
const MENU_ITEM_DISABLED = MENU_ITEM_CLASS + '-disabled';

/* Menu.Item 父组件上下文 */
const contextTypes = {
  selectedKeys: React.PropTypes.array,
  defaultSelectedKeys: React.PropTypes.array,
  onClick: React.PropTypes.func,
  mode: React.PropTypes.string
}

// 当mode为inlinexia  item的style
const itemStyleByInline = {
  paddingLeft: '48px'
}

class Item extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      onClick: null
    };

    this.handleDown = this.handleDown.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleDown() {
    const disabled = this.props.disabled;
    if(!disabled) this.setState({ isActive: true });
  }

  handleUp() {
    const disabled = this.props.disabled;
    if(!disabled) this.setState({ isActive: false });
  }

  handleClick(event) {
    const props = this.props;
    const { disabled, menuKey } = props;
    const onClick = this.state.onClick;
    if(!disabled && isFunction(onClick)) {
      onClick(menuKey, event);
    }
  }

  componentDidMount() {
    const { onClick } = this.context;
    this.setState({
      onClick: onClick
    })
  }

  render() {
    const { className, style, menuKey, disabled, children, ...rest } = this.props;
    const { isActive } = this.state;
    const { selectedKeys, defaultSelectedKeys } = this.context
    const classes = classnames(MENU_ITEM_CLASS, className, {
      [MENU_ITEM_SELECTED]: selectedKeys.indexOf(menuKey) !== -1 || defaultSelectedKeys.indexOf(menuKey) !== -1,
      [MENU_ITEM_DISABLED]: disabled,
      [MENU_ITEM_ACTIVE]: isActive
    });

    const ISINLINE = this.context.mode === 'inline';

    const styles = ObjectAssign({}, style, ISINLINE ? itemStyleByInline : {});
    return (
      <li
        { ...rest }
        style = { styles }
        className = { classes }
        onClick = { this.handleClick }
        onMouseOver={ this.handleDown }
        onMouseLeave = { this.handleUp } 
        onTouchStart={ this.handleDown }
        onTouchEnd={ this.handleUp }
        onTouchCancel={ this.handleUp }>
        { children }
      </li>
    );
  }
}

Item.contextTypes = contextTypes;
export default Item;