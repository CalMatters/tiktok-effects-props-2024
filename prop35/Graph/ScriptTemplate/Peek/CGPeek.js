const {BaseNode} = require('./BaseNode');
const APJS = require('./amazingpro');

class CGPeek extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    return this.inputs[0]();
  }
}

exports.CGPeek = CGPeek;
