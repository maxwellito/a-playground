class Skeleton {
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
    this.material.color = new THREE.Color(miniHex(color));

    this.lines = new THREE.LineSegments(this.geometry, this.material);
  }

  cloneMesh() {
    return new THREE.LineSegments(this.geometry, this.material);
  }
}

function cubeSkeleton(width, height, depth, color) {
  const positions = new Float32Array(
    [].concat(
      [-width / 2, height / 2, depth / 2],
      [-width / 2, height / 2, -depth / 2],
      [width / 2, height / 2, -depth / 2],
      [width / 2, height / 2, depth / 2],
      [-width / 2, -height / 2, depth / 2],
      [-width / 2, -height / 2, -depth / 2],
      [width / 2, -height / 2, -depth / 2],
      [width / 2, -height / 2, depth / 2]
    )
  );

  const indexes = new Uint16Array(
    [].concat(
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4]
    )
  );
  return new Skeleton(positions, indexes, color);
}
