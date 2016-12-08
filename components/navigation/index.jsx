import React, { Component } from 'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../configs';
import '../../style';
import './index.less';

const NAVIGATION_CLASS = CLASS_PREFIX + 'navigation';
const NAVIGATION_ACTIVE = NAVIGATION_CLASS + '-active';
const NAVIGATION_TITLE = NAVIGATION_CLASS + '-title';
const NAVIGATION_SMALLTITLE = NAVIGATION_CLASS + '-smalltitle';

/**
 * 含有子选项的时候分header 和 content
 * header 包含 title和icon
 * content 包含 子选项
 * 并class含有open和close
 */
const NAVIGATION_HEADER = NAVIGATION_CLASS + '-header';
const NAVIGATION_CONTENT = NAVIGATION_CLASS + '-content';
const NAVIGATION_OPEN = NAVIGATION_CLASS + '-open';
const NAVIGATION_CLOSE = NAVIGATION_CLASS + '-close';
const NAVIGATION_ICON = NAVIGATION_CLASS + '-icon';


class Navigation extends Component {
  constructor(props) {
    super(props);
    const { 
      className, 
      title, 
      smallTitle, 
      closeUnicode, 
      openUnicode, 
      children, 
      active, 
      ...rest } = props;
    this.state = {
      className: className,
      title: title,
      smallTitle: smallTitle, 
      closeUnicode: closeUnicode, 
      openUnicode: openUnicode, 
      children: children, 
      active: active 
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    
  }

  toggle() {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
    const { 
      className, 
      title, 
      smallTitle, 
      closeUnicode, 
      openUnicode, 
      children, 
      active, 
      ...rest } = this.state;
    const hasChildren = children;
    const classes = classnames(NAVIGATION_CLASS , className, {
      [NAVIGATION_ACTIVE]: !hasChildren && active,
      [NAVIGATION_OPEN]:  hasChildren && active,
      [NAVIGATION_CLOSE]: hasChildren && !active
    });

    let childHtml ;

    /**
     * [if 存在子选项和不存在子选项输出的模板不同]
     * @param  {[Array]} children [子选项是否存在]
     * @return {[HTML]}          [模板]
     */
    if(children) {
      childHtml = (
        <div>
          <div className={ NAVIGATION_HEADER } >
            <span className={ NAVIGATION_TITLE }>{ title }</span>
            {
              smallTitle ? <span className={ NAVIGATION_SMALLTITLE }>{ smallTitle }</span> : ''
            }
            <i className={ NAVIGATION_ICON }>{ active ?  closeUnicode : openUnicode  }</i>
          </div>
          <div className={ NAVIGATION_CONTENT }>
            { children }
          </div>
        </div>
      );
    } else {
      childHtml = (
        <div>
          <span>{ title }</span>
          {
            smallTitle ? <span className={ NAVIGATION_SMALLTITLE }>{ smallTitle }</span> : ''
          }
        </div>
      );
    }

    return (
      <div { ...rest } className={ classes } onClick={() => this.toggle(this)}>
        { childHtml } 
      </div>
    );
  }
}

export default Navigation;

