'use strict';

/**
 * 引用Array方法
 */
const nativeIsArray = Array.isArray;
const nativeKeys = Object.keys;
const nativeBind = FuncProto.bind;
const nativeCreate = Object.create;


const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

let property = function(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
}

let getLength = property('length');

let isFunction = function(obj) {
  return typeof obj === 'function' && {}.toString.call(obj).toLowerCase() === '[object function]';
}

let isArrayLike = function(input) {
  let length = getLength(input);
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
}

let isArray = nativeIsArray || function(obj) {
  return toString.call(obj).toLowerCase() === '[object array]'
}

let isArguments = function(obj) {

}

let flatten = function(input, shallow, strict, startIndex) {
  let output = [], idx = 0;
  for(let i = startIndex || 0, length =  getLength(input); i < length; i++) {
    let value = input[i]; 
  }
}

let isDifference = function(array) {

}