'use strict';

let isObject = function(obj) {
  return typeof obj !== 'function' && typeof obj === 'object' && !!obj
}

export default isObject;