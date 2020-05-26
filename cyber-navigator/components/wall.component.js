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
    let z = 0,
      line = this.data.yIndexes,
      { color, opacity } = this.data;
    color = '#1af';

    this.gGeometry = this.gGeometry || new THREE.BufferGeometry();
    this.gPositions =
      this.gPositions || new Float32Array(11 * 4 * 3 + 11 * 4 * 3);
    var positions = this.gPositions;
    var bIndex = 0;

    // Vertical lines
    line.forEach((_, x) => {
      if (x <= this.data.xStart || x >= this.data.xEnd) {
        positions.set([x, line[x], z, x, 8, z], bIndex);
        bIndex += 6;
      } else {
        positions.set([x, line[x], z, x, this.data.yStart, z], bIndex);
        bIndex += 6;
        positions.set([x, this.data.yEnd, z, x, 8, z], bIndex);
        bIndex += 6;
      }
    });

    // Horizontal lines
    let y = Math.ceil(Math.max(...line));
    for (; y <= 8; y++) {
      if (y <= this.data.yStart || y >= this.data.yEnd) {
        positions.set([0, y, z, line.length - 1, y, z], bIndex);
        bIndex += 6;
      } else {
        positions.set([0, y, z, this.data.xStart, y, z], bIndex);
        bIndex += 6;
        positions.set([this.data.xEnd, y, z, line.length - 1, y, z], bIndex);
        bIndex += 6;
      }
    }

    // Indexes
    var indexes = new Uint16Array(bIndex / 3);
    indexes.forEach((_, i) => (indexes[i] = i));

    this.gGeometry.addAttribute(
      'position',
      new THREE.BufferAttribute(this.gPositions, 3)
    );
    this.gGeometry.setIndex(new THREE.BufferAttribute(indexes, 1));

    // Material
    this.gMaterial = this.gMaterial || new THREE.LineBasicMaterial();
    this.gMaterial.color = new THREE.Color(miniHex(color));
    // this.gMaterial.opacity = opacity;

    if (!this.gLines) {
      this.gLines = new THREE.LineSegments(this.gGeometry, this.gMaterial);
      this.el.object3D.add(this.gLines);
    }

    /////// WINDOW
    this.wGeometry = this.wGeometry || new THREE.BufferGeometry();
    this.wPositions = this.wPositions || new Float32Array(5 * 3);
    var positions = this.wPositions;

    positions.set([this.data.xStart, this.data.yStart, z], 0);
    positions.set([this.data.xStart, this.data.yEnd, z], 3);
    positions.set([this.data.xEnd, this.data.yEnd, z], 6);
    positions.set([this.data.xEnd, this.data.yStart, z], 9);
    positions.set([this.data.xStart, this.data.yStart, z], 12);
    this.wGeometry.addAttribute(
      'position',
      new THREE.BufferAttribute(this.wPositions, 3)
    );
    this.wGeometry.setDrawRange(0, 5);

    // Material
    this.wMaterial = this.wMaterial || new THREE.LineBasicMaterial();
    this.wMaterial.color = new THREE.Color(0x74d9c7);

    // Append line
    if (!this.wLines) {
      this.wLines = new THREE.Line(this.wGeometry, this.wMaterial);
      this.el.object3D.add(this.wLines);
    }
  }
});
