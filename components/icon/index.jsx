import React, { Component } from 'react';
import classnames from 'classnames';
import objectAssign from 'object-assign';
import { CLASS_PREFIX } from '../configs';
import './index.less';

/**
 * 按钮样式
 */
const ICON_CLASS = CLASS_PREFIX + 'icon';

/**
 * icon prop验证
 *
 * @param {String} children unicode
 */
const propTypes = {
  children: React.PropTypes.string
};

class Icon extends Component {
  render() {
    const { family, style, className, unicode, children, ...rest } = this.props;
    const iconClasses = classnames(ICON_CLASS, className);
    const iconStyles = objectAssign({}, style, {
      fontFamily: family
    });

    return <i { ...rest } style={ iconStyles } className={ iconClasses }>{ unicode }</i>;
  }
}

Icon.proptypes = propTypes;

export default Icon;
