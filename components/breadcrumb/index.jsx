import React, { Component } from 'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../configs';
import './index.less';
import Item from './item';

/* 面包屑导航基本样式 */
const BREADCRUMB_CLASS = CLASS_PREFIX + 'breadcrumb';

/**
 * breadcrumb props验证
 *
 * @param {String} separator 分隔符自定义
 */
const propTypes = {
  separator: React.PropTypes.string
};

/**
 * breadcrumb 默认
 */
const defaultProps = {
  separator: "/"
};

/**
 * breadcrumb 传递到子组件上下文的验证
 *
 * @param {String} separator 分隔符自定义
 */
const childContextTypes = {
  separator: React.PropTypes.string
};


class Breadcrumb extends Component {

  getChildContext() {
    return {
      separator: this.props.separator
    }
  }

  render() {
    const { className, separator, children, ...rest } = this.props;
    const classes = classnames(BREADCRUMB_CLASS, className);

    return (
      <div 
        { ...rest }
        className={ classes }>
        { children }
      </div>
    )
  }
}

Breadcrumb.Item = Item;
Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;
Breadcrumb.childContextTypes = childContextTypes;

export default Breadcrumb;