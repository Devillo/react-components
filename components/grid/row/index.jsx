import React, { Component } from 'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../../configs';
import './index.less';

/* 栅格行样式 */
const GRID_ROW = CLASS_PREFIX + 'row';

/* 栅格flex布局 */
const GRID_FLEX = GRID_ROW + '-flex';

/**
 * 栅格flex布局下垂直对齐方式
 * top
 * middle
 * bottom
 */
const GRID_FLEX_TOP = GRID_FLEX + '-top';
const GRID_FLEX_MIDDLE = GRID_FLEX + '-middle';
const GRID_FLEX_BOTTOM = GRID_FLEX + '-bottom';

/**
 * 栅格flex布局下水平对齐方式
 * start
 * end
 * center
 * space-around
 * space-between
 */
const GRID_FLEX_START = GRID_FLEX + '-start';
const GRID_FLEX_END = GRID_FLEX + '-end';
const GRID_FLEX_CENTER = GRID_FLEX + '-center';
const GRID_FLEX_SPACE_AROUND = GRID_FLEX + '-space-around';
const GRID_FLEX_SPACE_BETWEEN = GRID_FLEX + '-space-between';


/**
 * row props类型验证
 *
 * @param {Number} gutter 栅格间隔
 * @param {String} type 布局模式，可选flex，现在浏览器可用
 * @param {String} align flex布局下的垂直对齐方式: top, middle, bottom
 * @param {String} justify flex布局下的水平排列方式：start, end, center, space-around, space-between
 */
const propTypes = {
  gutter: React.PropTypes.number,
  type: React.PropTypes.string,
  align: React.PropTypes.string,
  justify: React.PropTypes.string
};

/**
 * row 默认配置
 */
const defaultProp = {
  gutter: 0,
  type: '',
  align: 'top',
  justify: 'start'
};

/**
 * row 传递到子组件上下文验证
 *
 * @param {Number} gutter 栅格间隔
 */
const childContextTypes = {
  gutter: React.PropTypes.number
};

class Row extends Component {

  getChildContext() {
    return {
      gutter: this.props.gutter
    }
  }


  render() {
    const { gutter, type, align, justify, className, children, ...rest } = this.props;
    const rowClasses = classnames(className, {
      [GRID_ROW]: type != 'flex',
      [GRID_FLEX]: type === 'flex',
      [GRID_FLEX_TOP]: align === 'top',
      [GRID_FLEX_MIDDLE]: align === 'middle',
      [GRID_FLEX_BOTTOM]: align === 'bottom',
      [GRID_FLEX_START]: justify === 'start',
      [GRID_FLEX_END]: justify === 'end',
      [GRID_FLEX_CENTER]: justify === 'center',
      [GRID_FLEX_SPACE_AROUND]: justify === 'space-around',
      [GRID_FLEX_SPACE_BETWEEN]: justify === 'space-between'
    });

    let clonedChildren = children;
    let rowStyles = {};

    // gutter大于0时，注入样式，并将gutter传给col组件
    if(gutter > 0) {
      rowStyles = {
        marginLeft: -gutter / 2 + 'px',
        marginRight: -gutter / 2 + 'px'
      }
    }

    return (
      <div 
        { ...rest }
        style={ rowStyles }
        className={ rowClasses }>
        { clonedChildren }
      </div>
    )
  }
}

Row.propTypes = propTypes;
Row.defaultProp = defaultProp;
Row.childContextTypes = childContextTypes;

export default Row;

