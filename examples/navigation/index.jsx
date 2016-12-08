import React, { Component } from 'react';
import classnames from 'classnames';
import Navigation from '../../components/navigation';

class NavigationModule extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active: false
    };
  }

  render() {
    return(
      <div>
        <Navigation active={this.state.active} title="导航条1" smallTitle="备注" openUnicode="&#xe7cd;" closeUnicode="&#xe7cc;">
          <Navigation title="1"></Navigation>
          <Navigation title="2"></Navigation>
          <Navigation title="3"></Navigation>
        </Navigation>
        <Navigation active={this.state.active} title="导航条2">
        </Navigation>
      </div>
    );
  }
}

export default NavigationModule;