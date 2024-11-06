const {BaseNode} = require('./BaseNode');
const APJS = require('./amazingpro');
const {clamp} = require('./GraphHelper');

class CGForLoop extends BaseNode {
  constructor() {
    super();
  }

  recur(stepVal, lastVal) {
    this.currentIndex = this.currentIndex + stepVal;
    if ((stepVal > 0 && this.currentIndex < lastVal) || (stepVal < 0 && this.currentIndex > lastVal)) {
      if (this.nexts[1]) {
        this.nexts[1]();
      }
      this.currentControlFlow.tmpPush(undefined, this.recur.bind(this, stepVal, lastVal));
    } else {
      if (this.nexts[0]) {
        this.nexts[0]();
      }
    }
  }

  execute(index) {
    let startVal = this.inputs[1]();
    let lastVal = this.inputs[2]();
    let stepVal = this.inputs[3]();
    if ((lastVal - startVal) * stepVal <= 0) {
      return;
    }
    // Add bound for safegarding timeout
    startVal = clamp(startVal, -100000, 100000);
    lastVal = clamp(lastVal, -100000, 100000);

    this.currentIndex = startVal - stepVal;

    this.recur(stepVal, lastVal);
  }

  getOutput(index) {
    return this.currentIndex;
  }

  resetOnRecord(sys) {
    this.currentIndex = 0;
  }
}

exports.CGForLoop = CGForLoop;
