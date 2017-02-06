import React, { Component } from 'react';
import { Switch, Icon, Button } from '../../components';
import './index.less';

class SwitchExample extends Component {
  constructor(props) {
    super(props);

    this.state = { checked: false, disabled: true }
    
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onChange(checked) {
    console.log(checked)
  }

  handleClick() {
    const { disabled, checked } = this.state;
    this.setState({
      disabled: !disabled,
      checked: !checked
    })
  }

  render() {
    const { checked, disabled } = this.state;
    return(
      <div>
        <div>
          <h4>基本用法</h4>
          <Switch defaultChecked={ false } checked={ checked } onChange={ this.onChange } />
        </div>
        <div>
          <h4>小开关</h4>
          <Switch size="small" defaultChecked={ false } />
        </div>
        <div>
          <h4>带有文字和图标</h4>
          <Switch defaultChecked={ false } checkedChildren={ "开" } unCheckedChildren={ "关" } />
          <br />
          <Switch defaultChecked={ false } checkedChildren={ <Icon family="iconfont" unicode="&#xe7af;" /> } unCheckedChildren={ <Icon family="iconfont" unicode="&#xe7c6;" /> } />
        </div>
        <div>
          <h4>禁用开关</h4>
          <Switch disabled={disabled} defaultChecked={ false } />
          <br />
          <Button type="primary" onClick={this.handleClick}>Toggle disabled </Button>
        </div>
      </div>
    );
  }
}

export default SwitchExample;