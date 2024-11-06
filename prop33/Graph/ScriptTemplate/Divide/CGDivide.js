/**
 * @file CGDivide.js
 * @author liujiacheng
 * @date 2021/8/23
 * @brief CGDivide.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('./BaseNode');
const APJS = require('./amazingpro');

class CGDivide extends BaseNode {
  constructor() {
    super();
  }

  setNext(index, func) {
    this.nexts[index] = func;
  }

  setInput(index, func) {
    this.inputs[index] = func;
  }

  getOutput() {
    let curType = this.valueType;
    if (curType === null) {
      return null;
    }

    let op1 = this.inputs[0]();
    let op2 = this.inputs[1]();
    if (op1 === null || op2 === null) {
      return null;
    }

    if (curType === 'Int' || curType === 'Double') {
      return op1 / op2;
    } else if (curType === 'Vector2f') {
      return new APJS.Vector2f(op1.x / op2.x, op1.y / op2.y);
    } else if (curType === 'Vector3f') {
      return new APJS.Vector3f(op1.x / op2.x, op1.y / op2.y, op1.z / op2.z);
    } else if (curType === 'Vector4f') {
      return new APJS.Vector4f(op1.x / op2.x, op1.y / op2.y, op1.z / op2.z, op1.w / op2.w);
    } else if (curType === 'Color') {
      return new APJS.Color(op1.r / op2.r, op1.g / op2.g, op1.b / op2.b, op1.a / op2.a);
    }
  }
}

exports.CGDivide = CGDivide;
