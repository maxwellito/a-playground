AFRAME.registerComponent('floorline', {
  schema: {
    yIndexes: { type: 'array' },
    yIndexesPrev: { type: 'array' },
    color: { type: 'color', default: '#1af' },
    opacity: { type: 'number', default: 0.9999 }
  },

  init: function() {
    this.update();
  },

  update: function(oldData) {
    let lineIndex = 0,
      z = 0,
      previousLine = this.data.yIndexesPrev,
      line = this.data.yIndexes,
      { color, opacity } = this.data;

    if (previousLine) {
      previousLine.forEach((_, x) => {
        this.el.setAttribute(`line__${++lineIndex}`, {
          start: {
            x,
            y: previousLine[x],
            z: z + 1
          },
          end: {
            x,
            y: line[x],
            z
          },
          color,
          opacity
        });
      });
    }

    let previousY;
    line.forEach((y, x) => {
      if (previousY === undefined) {
        previousY = y;
        return;
      }
      this.el.setAttribute(++lineIndex === 1 ? 'line' : `line__${lineIndex}`, {
        start: { x: x - 1, y: previousY, z },
        end: { x, y, z },
        color,
        opacity
      });
      previousY = y;
    });
  }
});
