import React, { Component } from 'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../configs';
import './index.less';

import Item from './item';
import SubMenu from './subMenu';
import ItemGroup from './itemGroup';

/* Menu 基本样式 */
const MENU_CLASS = CLASS_PREFIX + 'menu';

/**
 * 主题颜色 样式
 *
 * MENU_COLOR_LIGHT: 白天 默认
 * MENU_COLOR_DARK: 夜晚
 */
const MENU_COLOR_LIGHT = MENU_CLASS + '-light';
const MENU_COLOR_DARK = MENU_CLASS + '-dark';

/**
 * 菜单类型样式
 *
 * MENU_MODE_VERTICAL: 垂直 默认
 * MENU_MODE_HORIZONTAL: 水平
 * MENU_MODE_INLINE: 内嵌
 */
const MENU_MODE_VERTICAL = MENU_CLASS + '-vertical';
const MENU_MODE_HORIZONTAL = MENU_CLASS + '-horizontal';
const MENU_MODE_INLINE = MENU_CLASS + '-inline';

/**
 * Menu props验证
 *
 * @param {String} theme 主题颜色
 * @param {String} mode 菜单类型
 * @param {Array} selectedKey 当前选中的菜单项 key 数组
 */
const propTypes = {
  theme: React.PropTypes.string,
  mode: React.PropTypes.string,
  selectedKeys: React.PropTypes.array,
  defaultSelectedKeys: React.PropTypes.array,
  onClick: React.PropTypes.func
};

/**
 * Menu 默认
 */
const defaultProps = {
  theme: 'light',
  mode: 'vertical',
  selectedKeys: [],
  defaultSelectedKeys: [],
  openKeys: []
};


/**
 * Menu 传递到子组件上下文的验证
 *
 * @param {Array} selectedKeys 当前选中的菜单项 key 数组
 * @param {String} mode 菜单类型
 */
const childContextTypes = {
  selectedKeys: React.PropTypes.array,
  defaultSelectedKeys: React.PropTypes.array,
  openKeys: React.PropTypes.array,
  mode: React.PropTypes.string,
  onClick: React.PropTypes.func
};


class Menu extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedKeys: props.selectedKeys,
      defaultSelectedKeys: props.defaultSelectedKeys,
      openKeys: props.openKeys
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedKeys: nextProps.selectedKeys })
  }

  getChildContext() {
    return {
      selectedKeys: this.state.selectedKeys,
      defaultSelectedKeys: this.state.defaultSelectedKeys,
      openKeys: this.state.openKeys,
      mode: this.props.mode,
      onClick: this.props.onClick
    }
  }

  render() {
    const { className, theme, mode, selectedKeys, defaultSelectedKeys, openKeys, children, onClick, ...rest } = this.props;
    const classes = classnames(MENU_CLASS, className, {
      [MENU_COLOR_LIGHT]: theme === 'light',
      [MENU_COLOR_DARK]: theme === 'dark',
      [MENU_MODE_VERTICAL]: mode === 'vertical',
      [MENU_MODE_HORIZONTAL]: mode === 'horizontal',
      [MENU_MODE_INLINE]: mode === 'inline'
    });

    return (
      <ul
        { ...rest }
        className = { classes }>
        { children }
      </ul>
    );
  }
}

Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;
Menu.childContextTypes = childContextTypes;
export default Menu;