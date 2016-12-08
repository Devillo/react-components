import React, { Component } from 'react';

class DemoBox extends Component {
  render() {
    const { value, children, ...rest } = this.props;
    const styles = {
      height: value + 'px',
      lineHeight: value + 'px'
    };

    return (
      <p { ...rest } style={ styles }>{ children }</p>
    )
  }
}

export default DemoBox;