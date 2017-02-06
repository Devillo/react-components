import React, {Component} from 'react';
import {
  Button,
  Icon
} from '../../components';
import './index.less';

class ButtonExample extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      powerIcon: "\ue6b2",
      loadingIcon: "\ue94b",
      loading: false
    }

    this.changeLoading = this.changeLoading.bind(this);
  }

  changeLoading() {
    this.setState({
      loading: true
    });
    let self = this;
    setTimeout(() => {
      self.setState({
        loading: false
      })
    }, 5000);
  }

  render() {
    const btnIcon = this.state.loading ? this.state.loadingIcon : this.state.powerIcon;
    const btnName = this.state.loading ? 'loading' : 'Click me';
    return (
      <div className="btnList">
        <div>
          <h4>按钮类型</h4>
          <Button type="primary" onClick={() => {console.log("123")}}>primary</Button>
          <Button type="default">default</Button>
          <Button type="">default</Button>
          <Button>default</Button>
          <Button type="ghost">ghost</Button>
          <Button type="dashed">dashed</Button>
        </div>
        <div>
          <h4>按钮大小</h4>
          <Button type="primary" size="large">large</Button>
          <Button type="primary">default</Button>
          <Button type="primary" size="small">small</Button>
        </div>
        <div>
          <h4>按钮禁用</h4>
          <Button type="primary" disabled>primary</Button>
          <Button disabled>default</Button>
          <Button type="ghost" disabled>ghost</Button>
          <Button type="dashed" disabled>dashed</Button>
        </div>
        <div>
          <h4>含iconfont的按钮</h4>
          <Button type="primary">
            <Icon family="iconfont" style={{marginRight: '10px'}} unicode="&#xe6b2;"></Icon>
            开关
          </Button>
        </div>
        <div>
          <h4>含加载样式的按钮</h4>
          <Button type="primary" loading>
            <Icon family="iconfont" style={{marginRight: '10px'}} unicode="&#xe8f5;"></Icon>
            <span>loading</span>
          </Button>
          <Button type="primary" loading disabled>
            <Icon family="iconfont" style={{marginRight: '10px'}} unicode="&#xe94b;"></Icon>
            <span>loading</span>
          </Button>
          <br/>
          <Button type="primary" loading={ this.state.loading } onClick={() => this.changeLoading()}>
            <Icon family="iconfont" style={{marginRight: '10px'}} unicode={ btnIcon }></Icon>
            <span>{ btnName }</span>
          </Button>
        </div>
      </div>
    );
  }
}

export default ButtonExample;