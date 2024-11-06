const APJS = require('./amazingpro');
const {BaseNode} = require('./BaseNode');

class CGGetSceneObjectNode extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    return this.inputs[0]();
  }
}

exports.CGGetSceneObjectNode = CGGetSceneObjectNode;
