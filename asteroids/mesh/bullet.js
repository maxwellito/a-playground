class BulletMesh {
  constructor() {
    this.geometry = new THREE.CylinderGeometry(0.2, 0.2, 20, 32);
    this.geometry.rotateX(Math.PI / 2);
    this.material = new THREE.MeshLambertMaterial({
      color: 0xa9ff,
      emissive: 0x3aad
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  cloneMesh() {
    return new THREE.Mesh(this.geometry, this.material);
  }
}
