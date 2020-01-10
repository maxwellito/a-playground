const POPUP = {
  width: 6,
  height: 4,
  depth: 0.25,
  topbarHeight: 0.5
};
AFRAME.registerComponent('popup', {
  schema: {
    color: { type: 'color', default: '#1af' },
    bgrColor: { type: 'color', default: '#000' }
  },

  init: function() {
    this.el.addEventListener('stateadded', evt => {
      if (evt.detail === 'destroyed') {
        this.crush();
      }
    });
    this.el.addEventListener('click', () => {
      this.addState('destroyed');
    });

    let bb = document.createElement('a-box');
    bb.setAttribute('width', POPUP.width);
    bb.setAttribute('height', POPUP.height);
    bb.setAttribute('depth', POPUP.depth);
    bb.setAttribute('color', '#00f');
    bb.setAttribute('position', {
      x: POPUP.width / 2,
      y: -POPUP.height / 2,
      z: -POPUP.depth / 2
    });
    this.el.appendChild(bb);

    // Build the skeleton
    let skeleton = document.createElement('a-entity');
    skeleton.setAttribute('skeletonbox', {
      width: POPUP.width,
      height: POPUP.height,
      depth: POPUP.depth,
      color: this.data.color
    });
    skeleton.setAttribute('position', {
      x: POPUP.width / 2,
      y: -POPUP.height / 2,
      z: -POPUP.depth / 2
    });
    this.skeleton = skeleton;
    this.el.appendChild(skeleton);

    // Popup details
    let boxDetails = document.createElement('a-entity');
    buildCubeedddd(boxDetails, this.data.color, [
      [
        [0, -POPUP.topbarHeight, 0],
        [POPUP.width, -POPUP.topbarHeight, 0]
      ],
      [
        [POPUP.width - POPUP.topbarHeight, 0, 0],
        [POPUP.width - POPUP.topbarHeight, -POPUP.topbarHeight, 0]
      ]
    ]);
    this.boxDetails = boxDetails;
    this.el.appendChild(boxDetails);

    // Add exploded elements
    let counter = 0;
    this.brokenpieces = [];
    for (let y = POPUP.height - 1; y >= 0; y--) {
      for (let x = POPUP.width - 1; x >= 0; x--) {
        let boxFill = document.createElement('a-entity');
        boxFill.setAttribute('brokenpiece', {
          width: 1,
          height: 1,
          depth: POPUP.depth,
          color: this.data.color
        });
        boxFill.setAttribute('visible', false);
        boxFill.setAttribute('position', {
          x: x + 0.5,
          y: -y - 0.5,
          z: -POPUP.depth / 2
        });
        this.el.appendChild(boxFill);
        this.brokenpieces.push(boxFill);
        counter++;
      }
    }
    this.el.addEventListener('ended', () => {
      counter--;
      if (counter === 0) {
        console.log('CLEAN THIS SHIT UP');
        this.el.parentEl.removeChild(this.el);
      }
    });
  },

  crush: function() {
    this.brokenpieces.forEach((bp, i) => {
      bp.setAttribute('visible', true);
      bp.setAttribute('brokenpiece', { play: true });
      bp.setAttribute('fall', {
        delay: (Math.random() * 10 + i) * 20 + 500
      });
    });
    this.boxDetails.setAttribute('visible', false);

    this.skeleton.setAttribute('visible', false);
  }
});

function buildCubeedddd(entity, color, lines = []) {
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
      opacity: 1
    });
  });
}
