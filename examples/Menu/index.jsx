import React, { Component } from 'react';
import { Menu, Icon } from '../../components';
import './index.less';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MenuExample extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedKeys: ["setting:1"],
      openKeys: [],
      defaultSelectedKeys: ['a']
    };

    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.getAncestorKeys = this.getAncestorKeys.bind(this);
  }

  onOpenChange(openKeys) {
    const state = this.state;
    //const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestOpenKey = openKeys.find(key => {
      return !state.openKeys.indexOf(key) > -1;
    })
    //const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => {
      return openKeys.indexOf(key) > -1;
    })

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }

    this.setState({ openKeys: ["b"] });
  }

  getAncestorKeys(key) {
    const map = {
      d: ['b'],
    };
    return map[key] || [];
  }


  handleClick(key) {
    this.setState({
      selectedKeys: [key]
    })
  }


  render() {
    const { selectedKeys, openKeys, defaultSelectedKeys } = this.state;

    
    return (
      <div>
        <div>
          <h4>水平菜单</h4>
          <Menu mode="horizontal" selectedKeys={selectedKeys} defaultSelectedKeys={ defaultSelectedKeys } onClick={ this.handleClick } >
            <Menu.Item menuKey="a"> aaa </Menu.Item>
            <Menu.Item menuKey="b" disabled> bbb </Menu.Item>
            <Menu.SubMenu
              title = "ccc">
              <Menu.ItemGroup title={ <span><Icon family="iconfont" unicode="&#xe7c4;" />Navigation One</span> } >
                <Menu.Item menuKey="setting:1">Option 1</Menu.Item>
                <Menu.Item menuKey="setting:2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="item2">
                <Menu.Item menuKey="setting:3">Option 1</Menu.Item>
                <Menu.Item menuKey="setting:4">Option 2</Menu.Item>
              </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.Item menuKey="d"> ddd </Menu.Item>
          </Menu>
        </div>
        <div>
          <h4>内嵌菜单</h4>
          <Menu 
            key = "234"
            onClick={this.handleClick}
            style={{ width: 240 }}
            selectedKeys={selectedKeys}
            openKeys={ openKeys }
            onOpenChange={ this.onOpenChange }
            mode="inline"
          >
            <SubMenu menuKey="a" title={<span><Icon family="iconfont" style={ { marginRight: '8px' } } unicode="&#xe7c4;" /><span>Navigation One</span></span>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item menuKey="1">Option 1</Menu.Item>
                <Menu.Item menuKey="2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item menuKey="3">Option 3</Menu.Item>
                <Menu.Item menuKey="4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu menuKey="b" title={<span><Icon family="iconfont" style={ { marginRight: '8px' } } unicode="&#xe7c4;" /><span>Navigation Two</span></span>}>
              <Menu.Item menuKey="5">Option 5</Menu.Item>
              <Menu.Item menuKey="6">Option 6</Menu.Item>
              <SubMenu menuKey="d"  title="Submenu">
                <Menu.Item menuKey="7">Option 7</Menu.Item>
                <Menu.Item menuKey="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu menuKey="c" title={<span><Icon family="iconfont" style={ { marginRight: '8px' } } unicode="&#xe7c4;" /><span>Navigation Three</span></span>}>
              <Menu.Item menuKey="9">Option 9</Menu.Item>
              <Menu.Item menuKey="10">Option 10</Menu.Item>
              <Menu.Item menuKey="11">Option 11</Menu.Item>
              <Menu.Item menuKey="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    );
  }
}

export default MenuExample;