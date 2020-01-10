AFRAME.registerComponent('autorotate', {
  schema: {
    speed: { type: 'number', default: 1 }
  },

  init: function() {
    this.originalX = this.el.object3D.rotation.x;
    this.originalY = this.el.object3D.rotation.y;
    this.originalZ = this.el.object3D.rotation.z;
  },

  tick: function(time) {
    this.timeStart = this.timeStart || time || 0;

    const delta = (time - this.timeStart) / 2000;

    this.el.object3D.rotation.x = (this.originalX + delta) % 360;
    this.el.object3D.rotation.y = (this.originalY + delta * 2) % 360;
    this.el.object3D.rotation.z = (this.originalZ + delta * 3) % 360;

    if (isNaN(this.el.object3D.rotation.y)) {
      debugger;
    }
  }
});
