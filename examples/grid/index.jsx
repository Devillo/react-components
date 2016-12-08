import React, { Component } from 'react';
import {
  Row,
  Col,
  DemoBox
} from '../../components';
import './index.less';

class GridExample extends Component {
  render() {
    return (
      <div>
        <div className="grid-demo">
          <h4>普通栅格</h4>
          <Row>
            <Col span={12}>col-12</Col>
            <Col span={12}>col-12</Col>
          </Row>
          <Row>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
          </Row>
          <Row>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
          </Row>
        </div>

        <div className="gutter-demo">
          <h4>区块间隔</h4>
          <Row gutter={16}>
            <Col span={6}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col span={6}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col span={6}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col span={6}>
              <div className="gutter-box">col-6</div>
            </Col>
          </Row>
        </div>

        <div className="grid-demo">
          <h4>左右偏移</h4>
          <Row>
            <Col span={8}>col-8</Col>
            <Col span={8} offset={8}>col-8 col-offset-8</Col>
          </Row>
          <Row>
            <Col span={6} offset={6}>col-6 col-offset-6</Col>
            <Col span={6} offset={6}>col-6 col-offset-6</Col>
          </Row>
          <Row>
            <Col span={12} offset={6}>col-12 col-offset-6</Col>
          </Row>
        </div>

        <div className="grid-demo">
          <h4>栅格排序</h4>
          <Row>
            <Col span={18} push={6}>col-18 col-push-6</Col>
            <Col span={6} pull={18}>col-6 col-pull-18</Col>
          </Row>
        </div>

        <div className="grid-demo">
          <h4>Flex 布局</h4>
          <span>justify: start</span>
          <Row type="flex" justify="start">
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
          </Row>
          <span>justify: center</span>
          <Row type="flex" justify="center">
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
          </Row>
          <span>justify: end</span>
          <Row type="flex" justify="end">
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
          </Row>
          <span>justify: space-between</span>
          <Row type="flex" justify="space-between">
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
          </Row>
          <span>justify: space-around</span>
          <Row type="flex" justify="space-around">
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
          </Row>
        </div>

        <div className="grid-demo">
          <h4>Flex 对齐</h4>
          <span>align: top</span>
          <Row type="flex" justify="center" align="top">
            <Col span={4}>
              <DemoBox value={ 100 }>col-4</DemoBox>
            </Col>
            <Col span={4}>
              <DemoBox value={ 120 }>col-4</DemoBox>
            </Col>
            <Col span={4}>
              <DemoBox value={ 80 }>col-4</DemoBox>
            </Col>
            <Col span={4}>
              <DemoBox value={ 60 }>col-4</DemoBox>
            </Col>
          </Row>
          <span>align: middle</span>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={4}>
              <DemoBox value={ 100 }>col-4</DemoBox>
            </Col>
            <Col span={4}>
              <DemoBox value={ 120 }>col-4</DemoBox>
            </Col>
            <Col span={4}>
              <DemoBox value={ 80 }>col-4</DemoBox>
            </Col>
            <Col span={4}>
              <DemoBox value={ 60 }>col-4</DemoBox>
            </Col>
          </Row>
          <span>align: bottom</span>
          <Row type="flex" justify="space-between" align="bottom">
            <Col span={4}>
              <DemoBox value={ 100 }>col-4</DemoBox>
            </Col>
            <Col span={4}>
              <DemoBox value={ 120 }>col-4</DemoBox>
            </Col>
            <Col span={4}>
              <DemoBox value={ 80 }>col-4</DemoBox>
            </Col>
            <Col span={4}>
              <DemoBox value={ 60 }>col-4</DemoBox>
            </Col>
          </Row>
        </div>

        <div className="grid-demo">
          <h4>Flex排序</h4>
          <Row type="flex">
            <Col span={6} order={4}>1 col-order-4</Col>
            <Col span={6} order={3}>2 col-order-3</Col>
            <Col span={6} order={2}>3 col-order-2</Col>
            <Col span={6} order={1}>4 col-order-1</Col>
          </Row>
        </div>

        <div className="grid-demo">
          <h4>响应式布局</h4>
          <Row>
            <Col xs={2} sm={4} md={6} lg={8}>Col</Col>
            <Col xs={20} sm={16} md={12} lg={8}>Col</Col>
            <Col xs={2} sm={4} md={6} lg={8}>Col</Col>
          </Row>
        </div>

        <div className="grid-demo">
          <h4>其他属性响应式布局</h4>
          <Row>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>Col</Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default GridExample;