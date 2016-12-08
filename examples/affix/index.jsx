import React, { Component } from 'react';
import {
  Affix,
  Button
} from '../../components';
import './index.less';

class AffixExample extends Component {
  handleChange(affixed) {
    console.log(affixed)
  }

  render() {
    return (
      <div className="view-port">
        <div id="scrollable-container">
          <div className="background">
            <br />
            <br />
            <br />
            <Affix>
              <Button type="primary">Fixed at the top of container</Button>
            </Affix>
          </div>
        </div>
      </div>
    )
  }
}

export default AffixExample;