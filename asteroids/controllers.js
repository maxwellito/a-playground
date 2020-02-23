let isTriggerOn;
AFRAME.registerComponent('rotation-reader', {
  init: function() {
    window.headsetRotation = this.el.object3D;
  }
});

AFRAME.registerComponent('motor', {
  init: function() {
    this.speed = 0;
    this.orientationVector = new THREE.Vector3();
  },

  tick: function() {
    if (!headsetRotation) {
      return;
    }
    this.speed += isTriggerOn ? 1 / 32 : -1 / 32;
    this.speed = Math.max(0, Math.min(16, this.speed));
    if (this.speed === 0) {
      return;
    }
    const hand = window.headsetRotation.rotation,
      pov = this.el.object3D.rotation;
    this.el.object3D.rotation.set(
      (pov.x || 0) + (hand.x - pov.x) / 16,
      (pov.y || 0) + (hand.y - pov.y) / 16,
      (pov.z || 0) + (hand.z - pov.z) / 16
    );

    this.el.object3D.getWorldDirection(this.orientationVector);
    this.el.object3D.position.x -= (this.orientationVector.x * this.speed) / 16;
    this.el.object3D.position.y -= (this.orientationVector.y * this.speed) / 16;
    this.el.object3D.position.z -= (this.orientationVector.z * this.speed) / 16;
  }
});
