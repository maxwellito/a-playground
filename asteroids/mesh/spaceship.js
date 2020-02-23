class SpaceshipMesh {
  constructor(positions, indexes, color) {
    this.positions = positions;
    this.indexes = indexes;

    // Geometry
    this.geometry = this.geometry || new THREE.BufferGeometry();
    this.geometry.addAttribute(
      'position',
      new THREE.BufferAttribute(this.positions, 3)
    );
    this.geometry.setIndex(new THREE.BufferAttribute(indexes, 1));

    this.material =
      this.material || new THREE.LineBasicMaterial({ transparent: true });
    this.material.color = new THREE.Color(color);

    this.lines = new THREE.LineSegments(this.geometry, this.material);
  }

  cloneMesh() {
    return new THREE.LineSegments(this.geometry, this.material);
  }
}

function makeSpaceship(width, height, depth, depthBrak, color) {
  const backDepth = depth - depthBrak;
  const sideRatio = depthBrak / depth;
  const positions = new Float32Array(
    [].concat(
      [0, 0, -depthBrak],
      [-width / 2, 0, backDepth],
      [width / 2, 0, backDepth],

      [-width / 2, height * 0.25, backDepth],
      [width / 2, height * 0.25, backDepth],

      [(-width / 2) * sideRatio, 0, 0],
      [(width / 2) * sideRatio, 0, 0],

      [(-width / 2) * sideRatio, height, 0],
      [(width / 2) * sideRatio, height, 0]
    )
  );

  const indexes = new Uint16Array(
    [].concat(
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 3],
      [2, 4],
      [0, 7],
      [0, 8],
      [3, 7],
      [4, 8],
      [5, 7],
      [6, 8],
      [5, 6],
      [7, 8]
    )
  );
  return new SpaceshipMesh(positions, indexes, color);
}
