AFRAME.registerComponent('pulse', {
  schema: {
    speed: { type: 'number', default: 1 },
    height: { type: 'number', default: 1 },
    offset: { type: 'number', default: 0 }
  },

  init: function() {
    this.originalY = this.el.object3D.position.y;
  },

  remove: function() {
    this.el.object3D.position.y = this.originalY;
  },

  tick: function(time, timeDelta) {
    this.timeStart = this.timeStart || time || 0;

    const loopDuration = 3000 / this.data.speed;
    const delta = ((time - this.timeStart) / loopDuration) % 1;
    const x = Math.cos((delta + this.data.offset) * Math.PI * 2);

    this.el.object3D.position.y = this.originalY + x * (this.data.height / 2);
    if (isNaN(this.el.object3D.position.y)) {
      debugger;
    }
  }
});
