import React, { Component } from 'react';
import { CLASS_PREFIX } from '../configs';
import classnames from 'classnames';
import isFunction from '../../components/_utils/isFunction';
import './index.less';

/* affix 样式 */
const AFFIX_CLASS = CLASS_PREFIX + 'affix';

/**
 * affix props类型验证
 *
 * @param {Number} offsetTop 距离窗口顶部达到指定偏移量后触发
 * @param {Number} offsetBottom 距离窗口底部打到指定偏移量后触发
 * @param {Function} target 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数
 * @param {Function} onChange 固定状态改变时触发的回调函数
 */
const propTypes = {
  offsetTop: React.PropTypes.number,
  offsetBottom: React.PropTypes.number,
  target: React.PropTypes.func,
  onChange: React.PropTypes.func
};

/**
 * affix props默认配置
 */
const defaultProps = {
  offsetTop: 0,
  offsetBottom: 0,
  target: function() {
    return document;
  },
  onChange: null
};

class Affix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      affixed: false,
      affixContentStyles: {},
      childrenPStyles: {}
    };

    this.scrollChange = this.scrollChange.bind(this);
  }

  componentDidMount() {
    const props = this.props;
    const targetEle = props.target();
    targetEle.addEventListener('scroll', this.scrollChange, false);
  }

  componentWillUnmount() {
    const props = this.props;
    const targetEle = props.target();
    targetEle.removeEventListener('scroll', this.scrollChange, false);
  }

  getScrollTopByTarget(targetEle) {
    if(targetEle === document) return targetEle.documentElement.scrollTop || targetEle.body.scrollTop;
    return targetEle.scrollTop;
  }

  scrollChange() {
    const props = this.props;

    /**
     * 触发ele的相关参数
     *
     * targetEle 触发ele
     * targetEleOffsetTop 距离顶部的距离
     * targetEleOffsetLeft 距离左边的距离
     * targetScrollTop 滚动到顶部的距离
     */
    const targetEle = props.target();
    const targetEleOffsetTop = targetEle.offsetTop || targetEle.documentElement.offsetTop || targetEle.body.offsetTop;
    const targetEleOffsetLeft = targetEle.offsetLeft || targetEle.documentElement.offsetLeft || targetEle.body.offsetLeft;
    const targetScrollTop = this.getScrollTopByTarget(targetEle);

    /**
     * 固钉ele的相关参数
     * 
     * affixContent 固钉ele即affixed状态下的参照ele
     * affixContentOffsetTop 固钉ele距离顶部的距离
     */
    const affixContent = this.refs.affixContent;
    const affixContentOffsetTop = affixContent.offsetTop;
    const affixContentOffsetLeft = affixContent.offsetLeft;
    /**
     * 其他参数
     * offsetTop 触发距离
     * affixed 当前固钉状态
     * onChange 固钉状态改变回调函数
     */
    const offsetTop = props.offsetTop;
    const affixed = this.state.affixed;
    const onChange = props.onChange; 

    if(affixed) {
      if(affixContentOffsetTop - targetEleOffsetTop - targetScrollTop >= offsetTop) {
        this.setState({
          affixed: false,
          affixContentStyles: '',
          childrenPStyles: ''
        });
        if(isFunction(onChange)) {
          onChange(this.state.affixed)
        }
      }
    } else {
      if(affixContentOffsetTop - targetEleOffsetTop - targetScrollTop < offsetTop) {
        const affixContentWidth = affixContent.width;
        const affixContentHeight = affixContent.height;

        this.setState({
          affixed: true,
          affixContentStyles: {
            width: affixContentWidth + 'px',
            height: affixContentHeight + 'px'
          },
          childrenPStyles: {
            position: 'fixed',
            top: targetEleOffsetTop + offsetTop + 'px',
            left: affixContentOffsetLeft + 'px',
            width: affixContentWidth + 'px'
          }
        });
        if(isFunction(onChange)) {
          onChange(this.state.affixed)
        }
      }
    }
  }

  render() {
    const { offsetTop, offsetBottom, target, onChange, children, ...rest } = this.props;
    const { affixed, affixContentStyles, childrenPStyles} = this.state;
    return (
      <div 
        ref="affixContent"
        style={ affixed ? affixContentStyles : {} }>
        <div
          className={ affixed ? AFFIX_CLASS : '' }
          style={ affixed ? childrenPStyles : {} }>
          { children }
        </div>
      </div>
    )
  }
}

Affix.propTypes = propTypes;
Affix.defaultProps = defaultProps;

export default Affix;