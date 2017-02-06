import React, { Component } from 'react';
import { Pagination } from '../../components';

class PaginationExample extends Component {
  render() {
    return (
      <div>
        <div>
          <h4>基本用法</h4>
          <Pagination defaultCurrent={1} total={50} />
        </div>
        <div>
          <h4>更多分页</h4>
          <Pagination defaultCurrent={1} total={500} />
        </div>
      </div>
    )
  }
}

export default PaginationExample;