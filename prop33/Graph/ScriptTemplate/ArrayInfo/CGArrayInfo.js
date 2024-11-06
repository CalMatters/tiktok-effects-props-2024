'use strict';
const APJS = require('./amazingpro');
const {BaseNode} = require('./BaseNode');
class CGArrayInfo extends BaseNode {
  constructor() {
    super();
  }

  getOutput() {
    const array = this.inputs[0]();
    if (array === null || array === undefined) {
      return 0;
    }
    return array.length;
  }
}
exports.CGArrayInfo = CGArrayInfo;
