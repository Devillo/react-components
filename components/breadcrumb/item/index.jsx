import React, { Component } from  'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../../configs';
import './index.less';

/* breadcrumb.item 基本样式 */
const BREADCRUMB_ITEM_CLASS = CLASS_PREFIX + 'breadcrumb-item';

/* breadcrumb.item 内容样式 */
const BREADCRUMB_ITEM_LINK = BREADCRUMB_ITEM_CLASS + '-link';

/* breadcrumb.item 分隔符样式 */
const BREADCRUMB_ITEM_SEPARATOR = BREADCRUMB_ITEM_CLASS + '-separator';

/* breadcrumb.item 父组件上下文 */
const contextTypes = {
  separator: React.PropTypes.string
};

class Item extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      separator: "/"
    };
  }

  componentDidMount() {
    const separator = this.context.separator;
    this.setState({
      separator: separator
    });
  }

  render() {
    const { className, children, ...rest } = this.props;
    const separator = this.state.separator;

    const classes = classnames(BREADCRUMB_ITEM_CLASS, className);

    return (
      <span className={ classes }>
        <span className={ BREADCRUMB_ITEM_LINK }> { children } </span>
        <span className={ BREADCRUMB_ITEM_SEPARATOR }>{ separator } </span>
      </span>
    );
  }
}

Item.contextTypes = contextTypes;

export default Item;