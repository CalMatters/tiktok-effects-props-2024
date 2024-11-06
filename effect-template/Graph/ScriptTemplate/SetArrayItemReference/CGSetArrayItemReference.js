const {BaseNode} = require('./BaseNode');
const APJS = require('./amazingpro');
const {clamp} = require('./GraphHelper');

class CGSetArrayItemReference extends BaseNode {
  constructor() {
    super();
    this.originalArray = null;
    this.array = null;
  }

  execute() {
    this.array = this.inputs[1]();
    const idx = this.inputs[2]();
    const value = this.inputs[3]();
    if (this.array == null || idx == null || value == null) {
      if (this.nexts[0]) {
        this.nexts[0]();
      }
      return;
    }

    if (!this.originalArray) {
      this.originalArray = this.array;
    }

    const itemIndex = Math.floor(idx);
    this.array[itemIndex] = value;
    this.outputs[1] = this.array;

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  resetOnRecord(sys) {
    if (this.array == null || this.array.length === 0) {
      return;
    }
    this.array = this.originalArray;
  }
}

exports.CGSetArrayItemReference = CGSetArrayItemReference;
