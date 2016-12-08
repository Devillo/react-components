import React, { Component } from 'react';
import { Breadcrumb, Icon } from '../../components';
import './index.less';
import { Link } from 'react-router';

class BreadcrumbExample extends Component {
  render() {
    return (
      <div>
        <div>
          <h4>最基本的用法</h4>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/backTop">backtop</Link></Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div>
          <h4>含ICON的导航</h4>
          <Breadcrumb>
            <Breadcrumb.Item><Icon family="iconfont" unicode="&#xe718;"></Icon></Breadcrumb.Item>
            <Breadcrumb.Item><Icon family="iconfont" unicode="&#xe718;"></Icon><Link to="/backTop">backtop</Link></Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div>
          <h4>自定义分隔符导航</h4>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/backTop">backtop</Link></Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    )
  }
}

export default BreadcrumbExample;