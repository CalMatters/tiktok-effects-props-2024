'use strict';
const APJS = require('./amazingpro');
const {BaseNode} = require('./BaseNode');
class CGGetChildrenSceneObjects extends BaseNode {
  constructor() {
    super();
  }

  execute() {
    const entity = this.inputs[1]();
    const childrenLayerCount = this.inputs[2]();
    if (childrenLayerCount <= 0 || entity === null || entity === undefined) {
      return;
    }

    let i = childrenLayerCount;
    let levelSet = [];
    levelSet.push(entity);
    let childrenList = [];
    while (i > 0) {
      const levelSetCount = levelSet.length;
      for (let k = 0; k < levelSetCount; ++k) {
        let currentChildren = levelSet[0].getChildren();

        for (let j = 0; j < currentChildren.length; ++j) {
          childrenList.push(currentChildren[j]);
          levelSet.push(currentChildren[j]);
        }

        levelSet.shift();
      }
      i--;
    }

    this.outputs[1] = childrenList;

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }
}
exports.CGGetChildrenSceneObjects = CGGetChildrenSceneObjects;
