import React, { Component } from 'react';
import { BackTop } from '../../components';
import './index.less';

class BackTopExample extends Component {
  render() {
    return (
      <div style={{ height: '2000px' }}>
        <BackTop />
        <BackTop className="fly-back-top-bottom">
          <div className="fly-back-top-inner">UP</div>
        </BackTop>
      </div>
    );
  }
};

export default BackTopExample;