'use strict';

import React from 'react';
import Components from '../../components';
import SideNav from '../sideNav';
import './index.less';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open: false
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.close.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.close, false);
  }

  toggle(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    this.setState({ open: !this.state.open });
  }

  close(event) {
    this.setState({open: false});
  }

  render() {
    return (
      <div className="layout">
        <div className="layout__header">FLY DESIGN</div>
        <div className="layout__body">
          <SideNav open={this.state.open} />
          <div className="layout__body__content">
            <div className="layout__body__content__space">{ this.props.children }</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Layout;