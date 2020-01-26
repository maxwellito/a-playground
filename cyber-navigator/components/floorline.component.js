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

  update: function() {
    let z = 0,
      previousLine = this.data.yIndexesPrev,
      line = this.data.yIndexes,
      { color, opacity } = this.data;

    var MAX_POINTS = 11;

    // Geometry
    this.geometry = this.geometry || new THREE.BufferGeometry();
    this.positions =
      this.positions || new Float32Array(MAX_POINTS * (3 * 3) + 3 * 2);
    var positions = this.positions;
    var bIndex = 0;

    for (let x = 0; x <= MAX_POINTS; x++) {
      if (previousLine) {
        positions[bIndex++] = x;
        positions[bIndex++] = previousLine[x];
        positions[bIndex++] = z + 1;
        positions[bIndex++] = x;
        positions[bIndex++] = line[x];
        positions[bIndex++] = z;
      }
      if (x < MAX_POINTS) {
        positions[bIndex++] = x + 1;
        positions[bIndex++] = line[x + 1];
        positions[bIndex++] = z;
      }
    }
    this.geometry.addAttribute(
      'position',
      new THREE.BufferAttribute(this.positions, 3)
    );

    // Draw range
    if (previousLine) {
      this.geometry.setDrawRange(0, MAX_POINTS * (3 * 3) + 3 * 2);
    } else {
      this.geometry.setDrawRange(0, MAX_POINTS); // draw ALL THE points, only
    }

    // Material
    this.material = this.material || new THREE.LineBasicMaterial();
    this.material.color = new THREE.Color(miniHex(color));
    this.material.opacity = opacity;

    // Append line
    if (!this.line) {
      this.line = new THREE.Line(this.geometry, this.material);
      this.el.object3D.add(this.line);
    }
  }
});

function miniHex(c) {
  return parseInt(`${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`, 16);
}
