import React from 'react';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  IndexRedirect
} from 'react-router';

import Layout from '../layout';
import Overview from '../overview';  // 概览
import Button from '../button';  // 按钮
import Icon from '../icon'; // iconfont
import Grid from '../grid'; // 栅格系统
import Affix from '../affix';  // 固钉
import BackTop from '../backtop'; // 回到顶部
import Breadcrumb from '../breadcrumb';  // 面包屑导航
import Menu from '../Menu'; // 导航菜单
import ImageBox from '../imageBox'; // 图片选择

export default (
  <Router history={browserHistory}>
    <Route path="/" component={ Layout }>
      <IndexRedirect to="/overview" />
      <Route path="/overview" component={ Overview } />
      <Route path="/button" component={ Button } />
      <Route path="/icon" component={ Icon } />
      <Route path="/grid" component={ Grid } />
      <Route path="/affix" component={ Affix } />
      <Route path="/backTop" component={ BackTop } />
      <Route path="/breadcrumb" component={ Breadcrumb } />
      <Route path="/Menu" component={ Menu } />
      <Route path="/ImageBox" component={ ImageBox } />
    </Route>
  </Router>
);