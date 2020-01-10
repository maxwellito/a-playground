AFRAME.registerComponent('skeletonbox', {
  schema: {
    width: { type: 'number', default: 1 },
    height: { type: 'number', default: 1 },
    depth: { type: 'number', default: 1 },
    color: { type: 'color', default: '#1af' },
    opacity: { type: 'number', default: 0.9999 }
  },

  init: function() {
    const { width, height, depth, color, opacity } = this.data;

    // Build the skeleton
    const lines = cubeVertices(width, height, depth);
    buildCube(this.el, color, opacity, lines);
  },

  update: function(oldData) {
    const { opacity } = this.data;
    if (oldData.opacity === this.data.opacity) {
      return;
    }
    this.el.object3D.children.forEach(mat => {
      mat.material.opacity = opacity;
    });
  }
});

function buildCube(entity, color, opacity, lines = []) {
  lines.forEach(([aPos, bPos], index) => {
    entity.setAttribute(`line${index ? '__' + (index + 1) : ''}`, {
      start: {
        x: aPos[0],
        y: aPos[1],
        z: aPos[2]
      },
      end: {
        x: bPos[0],
        y: bPos[1],
        z: bPos[2]
      },
      color,
      opacity: 0.9999
    });
  });
}

function cubeVertices(width, height, depth) {
  return [
    // Top
    [
      [-width / 2, height / 2, depth / 2],
      [-width / 2, height / 2, -depth / 2]
    ],
    [
      [-width / 2, height / 2, -depth / 2],
      [width / 2, height / 2, -depth / 2]
    ],
    [
      [width / 2, height / 2, -depth / 2],
      [width / 2, height / 2, depth / 2]
    ],
    [
      [width / 2, height / 2, depth / 2],
      [-width / 2, height / 2, depth / 2]
    ],

    // Height
    [
      [-width / 2, height / 2, depth / 2],
      [-width / 2, -height / 2, depth / 2]
    ],
    [
      [-width / 2, height / 2, -depth / 2],
      [-width / 2, -height / 2, -depth / 2]
    ],
    [
      [width / 2, height / 2, -depth / 2],
      [width / 2, -height / 2, -depth / 2]
    ],
    [
      [width / 2, height / 2, depth / 2],
      [width / 2, -height / 2, depth / 2]
    ],

    // Bottom
    [
      [-width / 2, -height / 2, depth / 2],
      [-width / 2, -height / 2, -depth / 2]
    ],
    [
      [-width / 2, -height / 2, -depth / 2],
      [width / 2, -height / 2, -depth / 2]
    ],
    [
      [width / 2, -height / 2, -depth / 2],
      [width / 2, -height / 2, depth / 2]
    ],
    [
      [width / 2, -height / 2, depth / 2],
      [-width / 2, -height / 2, depth / 2]
    ]
  ];
}
