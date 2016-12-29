import React, { Component } from 'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../../configs';
import '../index.less';
import _ from 'underscore';

/* 子菜单基本样式 */
const MENU_SUBMENU_CLASS = CLASS_PREFIX + 'menu-submenu';

/* 子菜单title样式 */
const MENU_SUBMENU_TITLE = MENU_SUBMENU_CLASS + '-title';

/* 子菜单选中样式 */
const MENU_SUBMENU_ACTIVE = MENU_SUBMENU_CLASS + '-active';
const MENU_SUBMENU_SELECTED = MENU_SUBMENU_CLASS + '-selected';

/**
 * 子菜单打开样式
 *
 * -open:打开动画
 */
const MENU_SUBMENU_OPEN = MENU_SUBMENU_CLASS + '-open';
const MENU_SUBMENU_OPEN_IN = MENU_SUBMENU_OPEN + '-in';
const MENU_SUBMENU_OPEN_OUT = MENU_SUBMENU_OPEN + '-out';
const MENU_SUBMENU_COLLAPSE = CLASS_PREFIX + 'motion-collapse';
const MENU_SUBMENU_COLLAPSE_ACTIVE = CLASS_PREFIX + 'motion-collapse-active';


/* 子菜单类型样式 */
const MENU_SUBMENU_MODE_VERTICAL = MENU_SUBMENU_CLASS + '-vertical';
const MENU_SUBMENU_MODE_HORIZONTAL = MENU_SUBMENU_CLASS + '-horizontal';
const MENU_SUBMENU_MODE_INLINE = MENU_SUBMENU_CLASS + '-inline';

/* 子菜单父组件上下文验证 */
const contextTypes = {
  selectedKeys: React.PropTypes.array,
  openKeys: React.PropTypes.array,
  mode: React.PropTypes.string
};

class SubMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      isShow: false,
      isActive: false,
      isOpen: false,
      isClose: false,
      opening: false,
      menuKeys: []
    };

    this.handleDown = this.handleDown.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handleOpenDown = this.handleOpenDown.bind(this);
    this.handleOpenUp = this.handleOpenUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { mode, openKeys } = this.context;
    const menuKey = this.props.menuKey;

    const children = this.props.children;
    let menuKeys = [];
    React.Children.forEach(children, (child) => {
      if(child.props.menuKey) {
        menuKeys.push(child.props.menuKey)
      } else {
        let submenuChildren = child.props.children;
        React.Children.forEach(submenuChildren, (submenuChild) => {
          menuKeys.push(submenuChild.props.menuKey)
        })
      }
    });
    this.setState({
      mode: mode,
      isShow: openKeys.indexOf(menuKey) != -1,
      opening: openKeys.indexOf(menuKey) != -1,
      menuKeys: menuKeys
    });
  }

  handleClick() {
    const self = this;
    const disabled = self.props.disabled;
    const isShow= self.state.isShow;
    if(disabled) return;
    let offsetHeight;
    if(isShow) {
      offsetHeight = self.refs.subMenuUl.offsetHeight;
    }
    self.setState({
      opening: !isShow,
      isShow: isShow ? isShow : !isShow,
      isOpen: !isShow,
      isClose: isShow
    }, () => {
      if(isShow) {
        self.refs.subMenuUl.style.height = offsetHeight + 'px';
        setTimeout(() => {
          self.refs.subMenuUl.style.height = '0px';
          let handleTimeout = self.handleTimeout;
          if(handleTimeout) clearTimeout(handleTimeout);
          self.handleTimeout = setTimeout(() => {
            self.refs.subMenuUl.style.height = ''
              self.setState({
                isShow: !isShow,
                isOpen: false,
                isClose: false
              });
          }, 200);
        }, 100);
      } else {
        offsetHeight = self.refs.subMenuUl.offsetHeight;
        self.refs.subMenuUl.style.height = '0px';
        setTimeout(() => {
          self.refs.subMenuUl.style.height = offsetHeight + 'px';
          let handleTimeout = self.handleTimeout;
          if(handleTimeout) clearTimeout(handleTimeout);
          self.handleTimeout = setTimeout(() => {
            self.refs.subMenuUl.style.height = ''
            self.setState({
              isOpen: false,
              isClose: false
            });
          }, 200);
        }, 100);
      }
    });
  }

  handleDown() {
    const self = this;
    const disabled = self.props.disabled;
    if(!disabled) self.setState({
      isActive: true
    })
  }

  handleUp() {
    const self = this;
    const disabled = self.props.disabled;
    if(!disabled) self.setState({
      isActive: false
    });
  }

  handleOpenDown() {
    const self = this;
    const disabled = self.props.disabled;
    const isActive = self.state.isActive;
    let handleTimeout = this.handleTimeout;
    if(!disabled) self.setState({ isActive: true, isOpen: !isActive, isClose: false }, () => {
      if(handleTimeout) clearTimeout(handleTimeout);
      if(isActive) return;
      this.handleTimeout = setTimeout(() => {
        self.setState({
          isOpen: false
        })
      }, 200);
    });
  }

  handleOpenUp() {
    const self = this;
    const disabled = self.props.disabled;
    let handleTimeout = this.handleTimeout;
    if(!disabled) {
      if(handleTimeout) clearTimeout(handleTimeout);
      this.handleTimeout = setTimeout(() => {
        self.setState({
          isClose: true
        }, () => {
          self.setState({
            isActive: false,
            isClose: false
          })
        })
      }, 200);
    }
  }

  render() {
    const { className, title, menuKey, disabled, children, ...rest } = this.props;
    const { mode, opening, isShow, isActive, isOpen, isClose, menuKeys } = this.state;

    // 当前模式
    const ISHORIZONTAL = mode === 'horizontal';
    const ISVERTICAL = mode === 'vertical';
    const ISINLINE = mode === 'inline';

    // 计算当前选中对象是否存在于该submenu中
    const selectedKeys = this.context.selectedKeys;
    let isSelected = _.difference(menuKeys, selectedKeys).length != menuKeys.length
    const classes = classnames(MENU_SUBMENU_CLASS, {
      [MENU_SUBMENU_MODE_VERTICAL]: ISVERTICAL,
      [MENU_SUBMENU_MODE_HORIZONTAL]: ISHORIZONTAL,
      [MENU_SUBMENU_MODE_INLINE]: ISINLINE,
      [MENU_SUBMENU_ACTIVE]: isActive,
      [MENU_SUBMENU_OPEN]: ISINLINE ? opening : isActive,
      [MENU_SUBMENU_SELECTED]: isSelected
    });

    const childMenuClasses = classnames(CLASS_PREFIX + 'menu', CLASS_PREFIX + 'menu-sub', {
      [CLASS_PREFIX + 'menu-vertical']: !ISINLINE,
      [CLASS_PREFIX + 'menu-inline']: ISINLINE,
      [CLASS_PREFIX + 'menu-hidden']: ISINLINE ? !isShow : !isActive,
      [MENU_SUBMENU_OPEN_IN]: !ISINLINE &&　isOpen,
      [MENU_SUBMENU_OPEN_OUT]: !ISINLINE && isClose,
      [MENU_SUBMENU_COLLAPSE]: ISINLINE && (isOpen || isClose),
      [MENU_SUBMENU_COLLAPSE_ACTIVE]: ISINLINE && (isOpen || isClose)
    });

    // 根据不同的菜单类型绑定不同的弹出类型
    let openEvents = {};
    ISINLINE ?  openEvents = {
                  onClick: this.handleClick,
                  onMouseOver: this.handleDown,
                  onMouseLeave: this.handleUp,
                  onTouchStart: this.handleDown,
                  onTouchEnd: this.handleUp,
                  onTouchCancel: this.handlenUp
                } :
                openEvents = {
                  onMouseOver: this.handleOpenDown,
                  onMouseLeave: this.handleOpenUp,
                  onTouchStart: this.handleOpenDown,
                  onTouchEnd: this.handleOpenUp,
                  onTouchCancel: this.handleOpenUp
                };

    if (ISINLINE) {
      return (
        <li
          { ...rest }
          className = { openEvents &&　classes }>
          <div
            className = { MENU_SUBMENU_TITLE }
            { ...openEvents } >
            <span> { title } </span>
          </div>
          <ul
            ref = 'subMenuUl'
            className = { childMenuClasses } >
            { children }
          </ul>
        </li>
      );
    } else {
      return (
        <li
          { ...rest }
          className = { openEvents &&　classes }
          { ...openEvents }>
          <div
            className = { MENU_SUBMENU_TITLE }>
            <span> { title } </span>
          </div>
          <ul
            ref = 'subMenuUl'
            className = { childMenuClasses } >
            { children }
          </ul>
        </li>
      )
    }
  }
}

SubMenu.contextTypes = contextTypes;
export default SubMenu;