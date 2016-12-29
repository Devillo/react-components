'use strict';

import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import './index.less';

class SideNav extends Component {
  render() {
    const classes = classnames('side-nav-block', {
      'side-nav-block-show': this.props.open
    });

    return (
      <div className={ classes }>
        <ul className="side-nav">
          <li>
            <Link to="/overview" activeClassName="side-nav-active"><strong>0.</strong>概览</Link>
          </li>
          <li>
            <Link to="/button" activeClassName="side-nav-active"><strong>1.</strong>按钮</Link>
          </li>
          <li>
            <Link to="/icon" activeClassName="side-nav-active"><strong>2.</strong>Icon 图标</Link>
          </li>
          <li>
            <Link to="/grid" activeClassName="side-nav-active"><strong>3.</strong>Grid 栅格</Link>
          </li>
          <li>
            <Link to="/affix" activeClassName="side-nav-active"><strong>4.</strong>Affix 固钉</Link>
          </li>
          <li>
            <Link to="/backTop" activeClassName="side-nav-active"><strong>5.</strong>BackTop 回到顶部</Link>
          </li>
          <li>
            <Link to="/breadcrumb" activeClassName="side-nav-active"><strong>6.</strong>Breadcrumb 面包屑导航</Link>
          </li>
          <li>
            <Link to="/menu" activeClassName="side-nav-active"><strong>7.</strong>Menu 导航菜单</Link>
          </li>
          <li>
            <Link to="/imageBox" activeClassName="side-nav-active"><strong>8.</strong>ImageBox 图片预览</Link>
          </li>
        </ul>
      </div>
    );
  }
}


export default SideNav;