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

    // Cube base
    var geometry = new THREE.BoxGeometry(
      POPUP.width,
      POPUP.height,
      POPUP.depth
    );
    var material = new THREE.MeshBasicMaterial({
      color: 0x11aaff,
      transparent: true
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(POPUP.width / 2, -POPUP.height / 2, -POPUP.depth / 2);
    cube.visible = false;
    this.solidCube = cube;
    this.el.object3D.add(cube);

    // Build the skeleton
    const skel = cubeSkeleton(1, 1, 1, '#1af');
    skel.lines.scale.set(POPUP.width, POPUP.height, POPUP.depth);
    skel.lines.position.set(
      POPUP.width / 2,
      -POPUP.height / 2,
      -POPUP.depth / 2
    );
    this.skeleton = skel.lines;
    this.el.object3D.add(skel.lines);

    // Sub boxes
    let counter = 0;
    this.brokenpieces = [];
    for (let y = POPUP.height - 1; y >= 0; y--) {
      for (let x = POPUP.width - 1; x >= 0; x--) {
        const mesh = skel.cloneMesh();
        mesh.scale.set(1, 1, POPUP.depth);
        mesh.position.set(x + 0.5, -y - 0.5, -POPUP.depth / 2);
        mesh.visible = false;
        this.el.object3D.add(mesh);
        this.brokenpieces.push(mesh);
        counter++;
      }
    }
    // this.el.addEventListener('ended', () => {
    //   counter--;
    //   if (counter === 0) {
    //     console.log('CLEAN THIS SHIT UP');
    //     this.el.parentEl.removeChild(this.el);
    //   }
    // });

    // this.brokenpieces.forEach((bp, i) => {
    //   bp.visible = true;
    //   // bp.setAttribute('brokenpiece', { play: true });

    //   fall(bp, {
    //     delay: Math.floor(Math.random() * 8 + i) + 5,
    //     duration: 60
    //   });
    // });
    // // this.boxDetails.setAttribute('visible', false);

    // this.skeleton.visible = false;

    setTimeout(() => this.crush(), 1000);
  },

  crush: function() {
    // 1. Show the flash
    this.solidCube.visible = true;
    this.skeleton.visible = false;
    this.brokenpieces.forEach(mesh => (mesh.visible = true));
    fade(this.solidCube.material).then(() => {
      this.solidCube.visible = false;
      // 2. Make pieces fall
      this.brokenpieces.forEach((bp, i) => {
        fall(bp, {
          delay: Math.floor(Math.random() * 8 + i) + 5,
          duration: 60
        });
      });
      fade(this.skeleton.material, 1 / 64);
    });

    // this.brokenpieces.forEach((bp, i) => {
    //   bp.visible = true;
    //   fall(bp, {
    //     delay: Math.floor(Math.random() * 8 + i) + 5,
    //     duration: 60
    //   });
    // });
    // // this.boxDetails.setAttribute('visible', false);

    // this.skeleton.visible = false;
  }
});

function fade(material, options) {
  let callback;

  const x = function() {
    material.opacity -= options || 1 / 32;
    console.log(material.opacity);
    if (material.opacity > 0) {
      requestAnimationFrame(x);
    } else {
      callback();
    }
  };
  x();

  return new Promise(res => (callback = res));
}

function fall(mesh, options) {
  let ratio = 0;
  // let callback;
  const rotX = Math.random() - 0.5;
  const rotY = Math.random() - 0.5;
  const rotZ = Math.random() - 0.5;

  const x = () => {
    console.log(options);
    if (options.delay > 0) {
      options.delay--;
      requestAnimationFrame(x);
      return;
    }
    if (options.duration <= 0) {
      return;
    }
    options.duration--;
    ratio = Math.min(1, ratio + 0.03125);
    const currentRatio = Math.pow(ratio, 2);
    mesh.position.set(
      mesh.position.x,
      mesh.position.y - currentRatio / 4,
      mesh.position.z
    );
    mesh.rotation.set(
      rotX * currentRatio,
      rotY * currentRatio,
      rotZ * currentRatio
    );

    requestAnimationFrame(x);
  };
  x();

  // return new Promise((res) => callback = res);
}
