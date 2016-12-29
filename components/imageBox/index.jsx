'use strict';

import React, { Component } from 'react';
import classnames from 'classnames';
import { Icon } from '../../components';
import './index.less';

/* imageBox 基本样式 */
const IMAGE_BOX_CLASS = 'hekr-image-box';

/* imageBox content 样式 */
const IMAGE_BOX_CONTENT = IMAGE_BOX_CLASS + '-content';

/* imageBox list 样式 */
const IMAGE_BOX_LIST = IMAGE_BOX_CLASS + '-list';

/* imageBox item 样式 */
const IMAGE_BOX_ITEM = IMAGE_BOX_CLASS + '-item';

/* imageBox footer 样式 */
const IMAGE_BOX_FOOTER = IMAGE_BOX_CLASS + '-footer';

/* imageBox sub 样式 */
const IMAGE_BOX_SUB = IMAGE_BOX_CLASS + '-sub';

/* imageBox btn 样式 */
const IMAGE_BOX_BTN = IMAGE_BOX_CLASS + '-btn';

/* imageBox left-btn 样式 */
const IMAGE_BOX_LEFT_BTN = IMAGE_BOX_BTN + '-left';

/* imageBox right-btn 样式 */
const IMAGE_BOX_RIGHT_BTN = IMAGE_BOX_BTN + '-right';

/* imageBox btn-hidden 样式 */
const IMAGE_BOX_BTN_DISABLED = IMAGE_BOX_CLASS + '-btn-hide';

const propTypes = {
  images: React.PropTypes.array,
  index: React.PropTypes.number,
  sign: React.PropTypes.string,
  leftIcon: React.PropTypes.string,
  rightIcon: React.PropTypes.string
}


/**
 * 默认配置
 *
 * @param {Array} images image数组
 * @param {Number} index 当前选中的图片
 */
const defaultProps = {
  images: [],
  index: 0,
  sign: '',
  leftIcon: '\ue7ae',
  rightIcon: '\ue6e0'
};

class ImageBox extends Component {
  constructor(props) {
    super(props);

    const imagesLength = props.images.length;
    let index = props.index;
    this.state = {
      contentHeight: '100%',
      contentWidth: '100%',
      tagIndex: index,
      isLeft: true,
      isRight: true 
    }
    
    this.handleLeftChange = this.handleLeftChange.bind(this);
    this.handleRightChange = this.handleRightChange.bind(this);
  }

  componentDidMount() {
    const imagesLength = this.props.images.length;
    let index = this.props.index;
    this.setState({
      isLeft: index === 0,
      isRight: imagesLength === (index + 1) 
    })
  }

  componentWillReceiveProps(nextProps) {
    const imagesLength = nextProps.images.length;
    let index = nextProps.index;
    this.setState({
      isLeft: index === 0,
      isRight: imagesLength === (index + 1) 
    })
  }

  handleLeftChange() {
    const props = this.props;
    const imagesLength = props.images.length;
    let { tagIndex, isLeft } = this.state;
    if(isLeft) return;
    tagIndex--;
    this.setState({
      tagIndex: tagIndex,
      isLeft: 0 === tagIndex,
      isRight: imagesLength === (tagIndex + 1)
    });

  }

  handleRightChange() {
    const props = this.props;
    const imagesLength = props.images.length;
    let { tagIndex, isRight } = this.state;
    if(isRight) return;
    tagIndex++;
    this.setState({
      tagIndex: tagIndex,
      isLeft: 0 === tagIndex,
      isRight: imagesLength === (tagIndex + 1)
    });
  }

  render() {
    const { className, images, index, sign, cancel, show, leftIcon, rightIcon, ...rest } = this.props;

    const classes = classnames(IMAGE_BOX_CLASS, className);

    const { tagIndex, isLeft, isRight } = this.state;

    const imagesLength = images.length;

    const leftBtnClasses = classnames(IMAGE_BOX_BTN, IMAGE_BOX_LEFT_BTN, {
      [IMAGE_BOX_BTN_DISABLED]: isLeft
    });
    const rightBtnclasses = classnames(IMAGE_BOX_BTN, IMAGE_BOX_RIGHT_BTN, {
      [IMAGE_BOX_BTN_DISABLED]: isRight
    });

    const contentHeight = this.state.contentHeight;

    return (
          <div
            ref = "imageBox"
            { ...rest }
            className = { classes }>
            <div 
              ref = "imageContent"
              className = { IMAGE_BOX_CONTENT }
              >
              <div 
                className = { IMAGE_BOX_LIST }
                style = {{ width: 100 * imagesLength + '%', left: -tagIndex * 100 + "%"}} >
                {
                  images.map((image, i) => {
                    return (
                      <div
                        key = { i }
                        className = { IMAGE_BOX_ITEM }>
                        <img src = { image[sign] } />
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className = { IMAGE_BOX_FOOTER }>
              <span 
                className = { leftBtnClasses }
                onClick = { this.handleLeftChange } >
                <Icon family="iconfont" unicode={ leftIcon } ></Icon>
              </span>
              <span className={ IMAGE_BOX_SUB } >
                { (tagIndex + 1) + '  /  ' + imagesLength }
              </span>
              <span 
                className = { rightBtnclasses }
                onClick = { this.handleRightChange } >
                <Icon family="iconfont" unicode={ rightIcon }></Icon>
              </span>
            </div>
          </div>
    );
  }
}

ImageBox.defaultProps = defaultProps;
export default ImageBox;