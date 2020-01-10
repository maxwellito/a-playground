AFRAME.registerComponent('brokenpiece', {
  schema: {
    width: { type: 'number', default: 1 },
    height: { type: 'number', default: 1 },
    depth: { type: 'number', default: 1 },
    color: { type: 'color', default: '#1af' },
    play: { type: 'boolean', default: false }
  },

  init: function() {
    const { width, height, depth, color } = this.data;
    this.skeletonOpacity = 1;
    this.ended = false;

    // Build the skeleton
    let skeleton = document.createElement('a-entity');
    skeleton.setAttribute('skeletonbox', this.data);
    this.skeleton = skeleton;
    this.el.appendChild(skeleton);

    // Build the fill material
    let boxFill = document.createElement('a-box');
    boxFill.setAttribute('width', width);
    boxFill.setAttribute('height', height);
    boxFill.setAttribute('depth', depth);
    boxFill.setAttribute('color', color);
    boxFill.setAttribute('material', { opacity: 0.999 });
    this.boxFill = boxFill;
    this.el.appendChild(boxFill);
  },

  tick: function() {
    if (this.ended || !this.data.play) {
      return;
    }
    if (this.boxFill.object3D.children[0].material.opacity > 0) {
      this.boxFill.object3D.children[0].material.opacity -= 1 / 32;
    } else {
      this.skeletonOpacity -= 1 / 64;
      let opacity = this.skeletonOpacity;
      this.skeleton.object3D.children.forEach(mat => {
        mat.material.opacity = opacity;
      });
      if (opacity <= 0) {
        this.ended = true;
        this.el.emit('ended');
      }
    }
  }
});

function buildCubee(entity, color, lines = []) {
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

function cubeVerticess(width, height, depth) {
  return [
    // Top
    [
      [0, 0, 0],
      [0, 0, -depth]
    ],
    [
      [0, 0, -depth],
      [width, 0, -depth]
    ],
    [
      [width, 0, -depth],
      [width, 0, 0]
    ],
    [
      [width, 0, 0],
      [0, 0, 0]
    ],

    // Height
    [
      [0, 0, 0],
      [0, -height, 0]
    ],
    [
      [0, 0, -depth],
      [0, -height, -depth]
    ],
    [
      [width, 0, -depth],
      [width, -height, -depth]
    ],
    [
      [width, 0, 0],
      [width, -height, 0]
    ],

    // Bottom
    [
      [0, -height, 0],
      [0, -height, -depth]
    ],
    [
      [0, -height, -depth],
      [width, -height, -depth]
    ],
    [
      [width, -height, -depth],
      [width, -height, 0]
    ],
    [
      [width, -height, 0],
      [0, -height, 0]
    ]
  ];
}
