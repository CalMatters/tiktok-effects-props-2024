/**
 * @file CGHeadMovementDetection.js
 * @author rcano
 * @date 2022/6/28
 * @brief CGHeadMovementDetection.js
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('./BaseNode');
const APJS = require('./amazingpro');

const {BEMessage, BEState} = require('./BEMessage');
const BEMsg = BEMessage.HeadMovement;

class CGHeadMovementDetection extends BaseNode {
  constructor() {
    super();
    this._actionDetected = false;
    this._headIndexMap = {
      'Head 0': 0,
      'Head 1': 1,
      'Head 2': 2,
      'Head 3': 3,
      'Head 4': 4,
      Any: -1,
    };
    this._headMovementMap = {
      'Head Nod': APJS.FaceAction.HEAD_PITCH,
      'Head Shake': APJS.FaceAction.HEAD_YAW,
      'Tilt Right': 0,
      'Tilt Left': 1,
    };
    this.headAction = {
      'Head Nod': BEMsg.action.HeadNod.id,
      'Head Shake': BEMsg.action.HeadShake.id,
      'Tilt Right': BEMsg.action.HeadTiltRight.id,
      'Tilt Left': BEMsg.action.HeadTiltLeft.id,
    };
    this.lastAction = BEState.None.key;
  }

  _tiltDetection(face, direction){
    const facePtsVec2Vec = face.points_array;
    // Get Point Above Nose
    const upperMostPoint = facePtsVec2Vec.get(43);
    const lowerMostPoint = facePtsVec2Vec.get(16);

    const middleLineVec2D = upperMostPoint.clone().subtract(lowerMostPoint);
    const middleLineVec = new APJS.Vector3f(middleLineVec2D.x, middleLineVec2D.y, 0.0);
    const z = new APJS.Vector3f(0, 1, 0);
    const angleCosineVal = middleLineVec.dot(z)/(middleLineVec.magnitude() * z.magnitude());
    const middleLineToZAngle = middleLineVec.cross(z);
    if(middleLineToZAngle.z > 0 && direction === 0 && angleCosineVal < Math.cos(Math.PI/12.0)) return true;
    if(middleLineToZAngle.z < 0 && direction === 1 && angleCosineVal < Math.cos(Math.PI/12.0)) return true;

    return false;
  }

  onUpdate(sys, dt) {
    if (
      this.inputs[0] === null ||
      this.inputs[0] === undefined ||
      this.inputs[1] === null ||
      this.inputs[1] === undefined
    ) {
      return;
    }

    const headKey = this.inputs[0]();
    const movementKey = this.inputs[1]();

    const algMgr = APJS.AmazingManager.getSingleton('Algorithm');
    const algResult = algMgr.getAEAlgorithmResult();

    if (algResult === null || headKey === null || movementKey === null) {
      return;
    }

    const headVal = this._headIndexMap[headKey];
    const movementVal = this._headMovementMap[movementKey];

    if (headVal === undefined || movementVal === undefined) {
      return;
    }

    let hasAction = false;
    if (headVal === -1) {
      for (let i = 0; i < 5 && !hasAction; ++i) {
        const face = algResult.getFaceBaseInfo(i);
        if (face) {
          hasAction = movementVal < 2? this._tiltDetection(face, movementVal): face.hasAction(movementVal);
        }
      }
    } else {
      const face = algResult.getFaceBaseInfo(headVal);
      if (face) {
        hasAction = movementVal < 2? this._tiltDetection(face, movementVal): face.hasAction(movementVal);
      }
    }

    if (!this._actionDetected && hasAction) {
      if (this.nexts[0]) {
        this.nexts[0]();
      }
      if (sys.APJScene && this.lastAction !== BEState.Begin.key) {
        this.lastAction = BEState.Begin.key;
        sys.APJScene.postMessage(BEMsg.msgId, this.headAction[movementKey], BEState.Begin.id, '');
      }
    }
    if (hasAction) {
      if (this.nexts[1]) {
        this.nexts[1]();
      }
      if (sys.APJScene && this.lastAction !== BEState.Stay.key) {
        this.lastAction = BEState.Stay.key;
        sys.APJScene.postMessage(BEMsg.msgId, this.headAction[movementKey], BEState.Stay.id, '');
      }
    }
    if (this._actionDetected && !hasAction) {
      if (this.nexts[2]) {
        this.nexts[2]();
      }
      if (sys.APJScene && this.lastAction !== BEState.End.key) {
        this.lastAction = BEState.End.key;
        sys.APJScene.postMessage(BEMsg.msgId, this.headAction[movementKey], BEState.End.id, '');
      }
    }
    if (!hasAction) {
      if (this.nexts[3]) {
        this.nexts[3]();
      }
      if (sys.APJScene && this.lastAction !== BEState.None.key) {
        this.lastAction = BEState.None.key;
        sys.APJScene.postMessage(BEMsg.msgId, this.headAction[movementKey], BEState.None.id, '');
      }
    }

    this._actionDetected = hasAction;
  }

  resetOnRecord(sys){
    this._actionDetected = false;
    this.lastAction = BEState.None.key;
  }
}

exports.CGHeadMovementDetection = CGHeadMovementDetection;
