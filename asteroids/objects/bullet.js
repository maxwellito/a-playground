class Bullet {
  constructor(mesh, position, direction) {
    this.mesh = mesh;
    this.direction = direction;
    this.distanceLeft = 300;
    this.mesh.position.set(position.x, position.y, position.z);

    this.raycaster = new THREE.Raycaster(
      position,
      direction,
      0.01,
      Bullet.STEP
    );
  }

  /**
   * space = {
   *   x: {min: -50}
   * }
   * @param {space} space
   */
  tick() {
    // Update bullet position
    const { position } = this.mesh;
    this.mesh.position.set(
      position.x + this.direction.x * Bullet.STEP,
      position.y + this.direction.y * Bullet.STEP,
      position.z + this.direction.z * Bullet.STEP
    );

    const scale = Math.min(
      1,
      Math.max(0, this.distanceLeft / (Bullet.DISTANCE / 3))
    );
    this.mesh.scale.set(scale, scale, scale);

    this.distanceLeft -= Bullet.STEP;

    // Update raycaster
    this.raycaster.set(this.mesh.position, this.direction);
  }
}

Bullet.DISTANCE = 100;
Bullet.STEP = 2;
