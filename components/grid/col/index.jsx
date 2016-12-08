import React, { Component } from 'react';
import classnames from 'classnames';
import isObject from '../../_utils/isObject';
import { CLASS_PREFIX } from '../../configs';
import './index.less';

/* 栅格列样式 */
const GRID_COL = CLASS_PREFIX + 'col';

/* 栅格列占位数样式 */
const GRID_COL_SPAN = CLASS_PREFIX + 'col-';

/* 栅格列顺序样式 */
const GRID_COL_ORDER = GRID_COL + '-order-';

/* 栅格列左侧的间隔格数样式 */
const GRID_COL_OFFSET = GRID_COL + '-offset-';

/* 栅格列向右移动格数样式 */
const GRID_COL_PUSH = GRID_COL + '-push-';

/* 栅格列向左移动格数样式 */
const GRID_COL_PULL = GRID_COL + '-pull-';

/**
 * 响应式栅格样式
 *
 * xs <768px
 * sm >=768px
 * md >=992px
 * lg >=1200px
 */
const GRID_COL_XS = GRID_COL + '-xs-';
const GRID_COL_SM = GRID_COL + '-sm-';
const GRID_COL_MD = GRID_COL + '-md-';
const GRID_COL_LG = GRID_COL + '-lg-';

/**
 * col 验证
 *
 * @param {Number} span 栅格占位格数，为 0 时相当于 display: none
 * @param {Number} order 栅格顺序，flex 布局模式下有效
 * @param {Number} offset 栅格左侧的间隔格数，间隔内不可以有栅格
 * @param {Number} push 栅格向右移动格数
 * @param {Number} pull 栅格向左移动格数
 * @param {Number or Object} xs <768px 响应式栅格，可为栅格数或一个包含其他属性的对象
 * @param {Number or Object} sm >=768px 响应式栅格，可为栅格数或一个包含其他属性的对象
 * @param {Number or Object} md >=992px 响应式栅格，可为栅格数或一个包含其他属性的对象
 * @param {Number or Object} lg >=1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
 */
const propTypes = {
  span: React.PropTypes.number,
  order: React.PropTypes.number,
  offset: React.PropTypes.number,
  push: React.PropTypes.number,
  pull: React.PropTypes.number,
  xs: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.object
  ]), 
  sm: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.object
  ]),
  md: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.object
  ]),
  lg: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.object
  ])
};

/**
 * row 默认配置
 */
const defaultProp = {
  order: 0,
  offset: 0,
  push: 0,
  pull: 0
};

/* col 父组件上下文 */
const contextTypes = {
  gutter: React.PropTypes.number
};

class Col extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      gutter: 0
    };
  }

  componentDidMount() {
    const gutter = this.context.gutter;
    this.state({
      gutter: gutter
    });
  }

  /**
   * 根据响应式合成相应classes
   * @param  {Object} obj  传入的响应式对象
   * @param  {String} type 传入的响应式type xs || sm || md || lg
   * @return {String} classes  返回的classes
   */
  getClassesFromResponsive(obj, type) {
    let classes = '';
    switch(type) {
      case 'lg':
        for(let key in obj) {
          let value = obj[key];
          classes = classnames(classes, {
            [GRID_COL_LG + (key === 'span' ? '' : key + '-') + value]: value >= 0
          })
        }
        break;
      case 'md':
        for(let key in obj) {
          let value = obj[key];
          classes = classnames(classes, {
            [GRID_COL_MD + (key === 'span' ? '' : key + '-') + value]: value >= 0
          })
        }
        break;
      case 'sm':
        for(let key in obj) {
          let value = obj[key];
          classes = classnames(classes, {
            [GRID_COL_SM + (key === 'span' ? '' : key + '-') + value]: value >= 0
          })
        }
        break;
      case 'ms':
        for(let key in obj) {
          let value = obj[key];
          classes = classnames(classes, {
            [GRID_COL_XS + (key === 'span' ? '' : key + '-') + value]: value >= 0
          })
        }
        break;
    }
    return classes;
  }

  render() {
    const { span, order, offset, push, pull, xs, sm, md, lg, className, children, ...rest } = this.props;
    const gutter = this.state.gutter;

    const colClasses = classnames(
      className, 
      {
        [GRID_COL_SPAN + span]: span >= 0,
        [GRID_COL_ORDER + order]: order >= 0,
        [GRID_COL_OFFSET + offset]: offset >= 0,
        [GRID_COL_PUSH + push]: push >= 0,
        [GRID_COL_PULL + pull]: pull >= 0
      },
      isObject(xs) ? this.getClassesFromResponsive(xs, 'ms') : (xs >= 0 ? GRID_COL_XS + xs : ''),
      isObject(sm) ? this.getClassesFromResponsive(sm, 'sm') : (sm >= 0 ? GRID_COL_SM + sm : ''),
      isObject(md) ? this.getClassesFromResponsive(md, 'md') : (md >= 0 ? GRID_COL_MD + md : ''),
      isObject(lg) ? this.getClassesFromResponsive(lg, 'lg') : (lg >= 0 ? GRID_COL_LG + lg : '')
    );

    let colStyles = {};

    // 当gutter大于0时，注入样式
    if(gutter > 0) {
      colStyles = {
        paddingLeft: gutter / 2 + 'px',
        paddingRight: gutter / 2 + 'px'
      }
    }

    return(
      <div
        { ...rest }
        style={ colStyles }
        className={ colClasses }>
        { children }
      </div>
    );
  }
}

export default Col;