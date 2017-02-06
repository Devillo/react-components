import React, { Component } from 'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../../components/configs';
import './index.less';

/* 分页基本样式 */
const PAGINATION_CLASS = CLASS_PREFIX + 'pagination';

/* 上一页样式 */
const PAGINATION_PREV = PAGINATION_CLASS + '-prev';

/* 下一页样式 */
const PAGINATION_NEXT = PAGINATION_CLASS + '-next';

/* 页码样式 */
const PAGINATION_ITEM = PAGINATION_CLASS + '-item';

/* 页码选中样式 */
const PAGINATION_ACTIVE = PAGINATION_ITEM + '-active';

/* 跳页上一组样式 */
const PAGINATION_JUMP_PREV = PAGINATION_CLASS + '-jump-prev';

/* 跳页下一组样式 */
const PAGINATION_JUMP_NEXT = PAGINATION_CLASS + '-jump-next';

/* 页码禁用样式 */
const PAGINATION_DISABLED = PAGINATION_CLASS + '-disabled';

/**
 * 分页组件 props验证
 *
 * @param {Number} current 当前页数
 * @param {Number} defaultCurrent 默认的当前页数
 * @param {Number} total 数据总数
 * @param {Number} defaultPageSize 默认的每页条数
 * @param {Number} pageSize 每页条数
 * @param {Func} onChange 页码改变的回调
 * @param {Boolean} showSizeChanger 是否可以改变pageSize
 * @param {Array} pageSizeOptions 指定每页可以显示多少条
 * @param {Func} onShowSizeChange pageSize变化的回调
 * @param {Boolean} showQuickJumper 是否可以快速跳转至某页
 * @param {String} size 当为[small]时显示的小尺寸分页
 * @param {Object} simple 当添加该参数时,显示为简单分页
 * @param {Func} showTotal 用于显示数据总量和当前数据顺序
 */
const propTypes = {
  current: React.PropTypes.number,
  defaultCurrent: React.PropTypes.number,
  total: React.PropTypes.number,
  defaultPageSize: React.PropTypes.number,
  pageSize: React.PropTypes.number,
  onChange: React.PropTypes.func,
  showSizeChanger: React.PropTypes.bool,
  pageSizeOptions: React.PropTypes.array,
  showQuickJumper: React.PropTypes.bool,
  size: React.PropTypes.string,
  simple: React.PropTypes.object,
  showTotal: React.PropTypes.func
};

/**
 * 分页组件 默认参数
 */
const defaultProps = {
  defaultCurrent: 1,
  total: 0,
  defaultPageSize: 10,
  onChange: function(){},
  showSizeChanger: false,
  pageSizeOptions: ['10', '20', '30', '40'],
  onShowSizeChange: function(){},
  showQuickJumper: false,
  size: ''
};

class Pagination extends Component {
  constructor(props) {
    super(props);

    let page = props.defaultCurrent;
    if('current' in props) {
      page = props.current;
    }

    let size = props.defaultPageSize;
    if('pageSize' in props) {
      size = props.pageSize;
    }

    this.state = { page: page, size: size };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleJumpPrevClick = this.handleJumpPrevClick.bind(this);
    this.handleJumpNextClick = this.handleJumpNextClick.bind(this);
  }

  handlePageClick(nextPage) {
    const page = this.state.page;
    if(page != nextPage) this.setState({ page: nextPage })
  }

  handlePrevClick() {
    let page = this.state.page;
    this.setState({ page: --page });
  }

  handleNextClick() {
    let page = this.state.page;
    this.setState({ page: ++page })
  }

  handleJumpPrevClick() {
    let page = this.state.page;
    this.setState({ page: Math.max(1, page - 5) })
  }

  handleJumpNextClick(pages) {
    let page = this.state.page;
    this.setState({ page: Math.min(pages, page + 5) })
  }

  setLiItem(firstPage, lastPage) {
    let items = [];
    const page = this.state.page;
    for(let i = firstPage; i <= lastPage; i++) {
      let itemClasses = classnames(PAGINATION_ITEM, PAGINATION_ITEM + '-' + i, {
        [PAGINATION_ACTIVE]: page === i
      });
      items.push(<li key={ i } title={ i } className={ itemClasses } onClick={ (nextPage) => this.handlePageClick(i) } > <a> { i } </a> </li>)
    }
    return items;
  }

  render() {
    const { className, total, showSizeChanger, pageSizeOptions, showQuickJumper, simple, ...rest } = this.props;

    const { page, size } = this.state;

    // 计算页数
    const pages = Math.ceil(total / size);

    // 计算当前是否是第一页或者最后一页
    const ISFIRST = page === 1;
    const ISLAST = page === pages;

    // pagination 样式
    const pageClasses = classnames(PAGINATION_CLASS, className);
    // 上一页样式
    const pagePrevClasses = classnames(PAGINATION_PREV, {
      [PAGINATION_DISABLED]: ISFIRST
    });
    // 下一页样式
    const pageNextClasses = classnames(PAGINATION_NEXT, {
      [PAGINATION_DISABLED]: ISLAST
    });

    // 根据页数计算需要显示的当前页码并计算是否显示左右jump页码
    let firstPage = 1;
    let lastPage = pages;
    let ISJUMPPREV = false;
    let ISJUMPNEXT = false;
    if(pages >= 9) {
      const mathFirstPage = page - 2;
      const mathLastPage = page + 2;
      firstPage = mathFirstPage < 3 ? 1 : ((pages - mathFirstPage) < 5 ? (pages - 4) : mathFirstPage)
      lastPage = mathLastPage < 5 ? 5 : ((pages - mathLastPage) < 2 ? pages : mathLastPage);
      ISJUMPPREV = (page - 3) > 1;
      ISJUMPNEXT = pages - (page + 2)  > 1;
    }


    return (
      <ul
        { ...rest }
        className = { pageClasses }>
        <li title = "Previous Page" className = { pagePrevClasses } onClick={ ISFIRST ? undefined : this.handlePrevClick } > <a></a> </li>
        {
          ISJUMPPREV && ([
            <li key={ 1 } title={ 1 } className={ classnames(PAGINATION_ITEM, PAGINATION_ITEM + '-' + 1) } onClick={ (nextPage) => this.handlePageClick(1) } > <a> { 1 } </a> </li>,
            <li key="jump prev" title = "Previous 5 Pages" className = { PAGINATION_JUMP_PREV } onClick ={ this.handleJumpPrevClick } > <a></a> </li>
          ])
        }
        {
          this.setLiItem(firstPage, lastPage, pages)
        }
        {
          ISJUMPNEXT && ([
            <li key="jump next" title = "Next 5 Pages" className = { PAGINATION_JUMP_NEXT } onClick ={ () => this.handleJumpNextClick(pages) } > <a></a> </li>,
            <li key={ pages } title={ pages } className={ classnames(PAGINATION_ITEM, PAGINATION_ITEM + '-' + pages) } onClick={ (nextPage) => this.handlePageClick(pages) } > <a> { pages } </a> </li>
          ])
        }
        <li title = "Next Page" className = { pageNextClasses } onClick={ ISLAST ? undefined : this.handleNextClick }> <a></a> </li>
      </ul>
    );
  }
}


Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
