/**
 * @file CGForLoop.js
 * @author liujiacheng
 * @date 2021/8/23
 * @brief CGForLoop.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('./BaseNode');
const APJS = require('./amazingpro');
const {clamp} = require('./GraphHelper');

class CGForLoop extends BaseNode {
  constructor() {
    super();
    this.breakFlag = false;
  }

  recur(stepVal, lastVal) {
    this.currentIndex = this.currentIndex + stepVal;
    if (this.breakFlag) {
      this.currentIndex = this.currentIndex - stepVal;
      if (this.nexts[0]) {
        this.nexts[0]();
      }
      return;
    }
    if (
      ((stepVal > 0 && this.currentIndex < lastVal) || (stepVal < 0 && this.currentIndex > lastVal)) &&
      !this.breakFlag
    ) {
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
    if (index === 1) {
      this.breakFlag = true;
      return;
    } else if (index === 0) {
      this.breakFlag = false;

      let startVal = this.inputs[2]();
      let lastVal = this.inputs[3]();
      let stepVal = this.inputs[4]();
      if ((lastVal - startVal) * stepVal <= 0) {
        return;
      }
      // Add bound for safegarding timeout
      startVal = clamp(startVal, -100000, 100000);
      lastVal = clamp(lastVal, -100000, 100000);

      this.currentIndex = startVal - stepVal;

      this.recur(stepVal, lastVal);
    }
  }

  getOutput(index) {
    return this.currentIndex;
  }

  resetOnRecord(sys) {
    this.currentIndex = 0;
  }
}

exports.CGForLoop = CGForLoop;
