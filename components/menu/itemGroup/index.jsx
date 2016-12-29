import React, { Component } from 'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../../configs';

/* Menu.ItemGroup 基本样式 */
const MENU_ITEM_GROUP_CLASS = CLASS_PREFIX + 'menu-item-group';

/* Menu.ItemGroup title 样式 */
const MENU_ITEM_GROUP_TITLE = MENU_ITEM_GROUP_CLASS + '-title';

/* Menu.ItemGroup list 样式 */
const MENU_ITEM_GROUP_LIST = MENU_ITEM_GROUP_CLASS + '-list';

class ItemGroup extends Component {
  render() {
    const { className, title, children } = this.props;

    const classes = classnames(className, MENU_ITEM_GROUP_CLASS);

    return(
      <li
        className = { classes }>
        <div 
          className = { MENU_ITEM_GROUP_TITLE }>
          { title }
        </div>
        <ul
          className = { MENU_ITEM_GROUP_LIST }>
          { children }
        </ul>
      </li>
    );
  }
}

export default ItemGroup;