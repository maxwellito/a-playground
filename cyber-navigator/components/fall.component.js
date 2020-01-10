AFRAME.registerComponent('fall', {
  schema: {
    delay: { type: 'number', default: 0 }
  },

  init: function() {
    this.remainingDelay = this.data.delay;
    this.ratio = 0;
    this.rotX = Math.random();
    this.rotY = Math.random();
    this.rotZ = Math.random();
  },

  tick: function(_, t) {
    this.remainingDelay -= t;
    if (this.remainingDelay > 0) {
      return;
    }
    this.ratio = Math.min(1, this.ratio + 0.03125);
    const currentRatio = Math.pow(this.ratio, 2);
    this.el.object3D.position.y -= currentRatio / 4;
    this.el.object3D.rotation.x = this.rotX * currentRatio;
    this.el.object3D.rotation.y = this.rotY * currentRatio;
    this.el.object3D.rotation.z = this.rotZ * currentRatio;
  }
});
