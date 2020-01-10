AFRAME.registerComponent('wall', {
  schema: {
    yIndexes: { type: 'array' },
    color: { type: 'color', default: '#1af' },
    xStart: { tyme: 'number' },
    xEnd: { tyme: 'number' },
    yStart: { tyme: 'number' },
    yEnd: { tyme: 'number' }
  },

  init: function() {
    this.update();
  },

  update: function(oldData) {
    let lineIndex = 0,
      z = 0,
      line = this.data.yIndexes,
      { color, opacity } = this.data,
      vertices = [];

    // Vertical lines
    line.forEach((_, x) => {
      if (x <= this.data.xStart || x >= this.data.xEnd) {
        vertices.push([
          { x, y: line[x], z },
          { x, y: 8, z }
        ]);
      } else {
        vertices.push([
          { x, y: line[x], z },
          { x, y: this.data.yStart, z }
        ]);
        vertices.push([
          { x, y: this.data.yEnd, z },
          { x, y: 8, z }
        ]);
      }
    });

    // Horizontal lines
    let y = Math.ceil(Math.min(...line));
    for (; y <= 8; y++) {
      if (y <= this.data.yStart || y >= this.data.yEnd) {
        vertices.push([
          { x: 0, y, z },
          { x: line.length - 1, y, z }
        ]);
      } else {
        vertices.push([
          { x: 0, y, z },
          { x: this.data.xStart, y, z }
        ]);
        vertices.push([
          { x: this.data.xEnd, y, z },
          { x: line.length - 1, y, z }
        ]);
      }
    }

    vertices.forEach(([start, end]) => {
      this.el.setAttribute(`line__${++lineIndex}`, {
        start,
        end,
        color,
        opacity: 0.5
      });
    });

    // Main rect
    [
      [
        { x: this.data.xStart, y: this.data.yStart, z },
        { x: this.data.xStart, y: this.data.yEnd, z }
      ],
      [
        { x: this.data.xStart, y: this.data.yEnd, z },
        { x: this.data.xEnd, y: this.data.yEnd, z }
      ],
      [
        { x: this.data.xEnd, y: this.data.yEnd, z },
        { x: this.data.xEnd, y: this.data.yStart, z }
      ],
      [
        { x: this.data.xEnd, y: this.data.yStart, z },
        { x: this.data.xStart, y: this.data.yStart, z }
      ]
    ].forEach(([start, end]) => {
      this.el.setAttribute(`line__${++lineIndex}`, {
        start,
        end,
        color: '#74d9c7',
        opacity: 1
      });
    });
  }
});
