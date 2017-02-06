import React, { Component } from 'react';
import { Select } from '../../components';

class SelectExample extends Component {

  constructor(props) {
    super(props);

    this.state = { value: 'a' }

    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onChange(value) {
    console.log(value);
  }

  onSelect(value, option) {
    console.log(value);
    console.log(option)
  }

  render() {
    const { value } = this.state;
    return(
      <div>
        <div>
          <h4>基本用法</h4>
          <Select style={ { width: '200px' } } value={ value } onChange={ this.onChange } onSelect={ this.onSelect }>
            <Select.Option value="a" />
            <Select.Option value="b" />
            <Select.Option value="c" />
          </Select>
        </div>
      </div>
    );
  }
}

export default SelectExample;
