import React, { Component } from 'react';
import classnames from 'classnames';
import { Icon } from '../../components';
import { CLASS_PREFIX } from '../configs.js';
import './index.less';

/* backTop 按钮基本样式 */
const BACK_TOP_CLASS = CLASS_PREFIX + 'back-top';

/* backTop content 样式 */
const BACK_TOP_CONTENT = BACK_TOP_CLASS + '-content';

/* backTop 图标样式 */
const BACK_TOP_ICON = BACK_TOP_CLASS + '-icon';

/**
 * props 验证
 *
 * @param {Number} visibilityHeight 滚动高度达到此参数值才出现 BackTop
 * @param {Function} onClick 点击按钮的回调函数
 */
const propTypes = {
  visibilityHeight: React.PropTypes.number,
  onClick: React.PropTypes.func
};

/**
 * props 默认配置
 */
const defaultProps = {
  visibilityHeight: 400,
  onClick: function(){}
};


class BackTop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderShow: false
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.scrollChange = this.scrollChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.scrollChange);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollChange);
  }

  scrollChange() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const props = this.props;
    const visibilityHeight = props.visibilityHeight;
    if(scrollTop >= visibilityHeight) {
      this.setState({
        renderShow: true
      });
    } else {
      this.setState({
        renderShow: false
      });
    }
  }

  gotoTop() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  }

  handleClick() {
    window.scrollTo(0, 0);
    // window.scrollBy(0,-100);
    // if(document.body.scrollTop > 0) {
    //   setTimeout(() => {
    //     this.handleClick()
    //   }, 50)
    // }
  }

  render() {
    const { className, visibilityHeight, onClick, children, ...rest } = this.props;

    const renderShow = this.state.renderShow;

    const classes = classnames(BACK_TOP_CLASS, className);

    const content = children ? children : (
      <div 
        className={ BACK_TOP_CONTENT } > 
        <Icon className={ BACK_TOP_ICON } family="iconfont" unicode="&#xe7cc;"></Icon>
      </div>
    );

    return renderShow ? (
      <div 
        { ...rest }
        className={ classes }
        onClick={ this.handleClick } >
        { content }
      </div>
    ) : null;

  }
}

BackTop.propTypes = propTypes;
BackTop.defaultProps = defaultProps;

export default BackTop;