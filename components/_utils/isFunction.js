'use strict';

let isFunction = function(obj) {
  return typeof obj === 'function' && {}.toString.call(obj).toLowerCase() === '[object function]';
}

export default isFunction;