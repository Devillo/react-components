import React, { Component } from 'react';
import classnames from 'classnames';
import { CLASS_PREFIX } from '../configs';
import './index.less';

/* 下拉菜单基本样式 */
const DROPDOWN_CLASS = CLASS_PREFIX + 'dropdown';

/* 下拉菜单 link 样式 */
const DROPDOWN_LINK = DROPDOWN_CLASS + '-link';

/* 下拉菜单 ul 样式 */
const DROPDOWN_MENU = DROPDOWN_CLASS + '-menu';

/* 下拉菜单 li 样式 */
const DROPDOWN_MENU_ITEM = DROPDOWN_MENU + '-item';

/**
 * dropDown props验证
 *
 * @param {String} value 
 */