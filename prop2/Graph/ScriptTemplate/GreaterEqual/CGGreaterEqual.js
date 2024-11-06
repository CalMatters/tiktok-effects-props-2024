/**
 * @file CGGreaterEqual.js
 * @author
 * @date 2021/8/15
 * @brief CGGreaterEqual.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('./BaseNode');
const APJS = require('./amazingpro');

class CGGreaterEqual extends BaseNode {
  constructor() {
    super();
  }

  getOutput() {
    return this.inputs[0]() >= this.inputs[1]();
  }
}

exports.CGGreaterEqual = CGGreaterEqual;
