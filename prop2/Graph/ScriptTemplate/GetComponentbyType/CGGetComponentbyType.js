'use strict';
const APJS = require('./amazingpro');
const {BaseNode} = require('./BaseNode');
class CGGetComponentbyType extends BaseNode {
  constructor() {
    super();
    this.valueType = null;
  }

  getOutput(index) {
    const entity = this.inputs[0]();
    if (entity === null || entity === undefined) {
      return;
    }
    if (this.valueType === 'TextJS') {
      const jsScriptComps = entity.getComponents('JSScriptComponent');
      const textComp = jsScriptComps.find(component => component.getScript().className === 'Text');
      return textComp;
    }
    return entity.getComponent(this.valueType);
  }
}
exports.CGGetComponentbyType = CGGetComponentbyType;
