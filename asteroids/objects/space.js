class Space {
  constructor(container, size, gap) {
    this.container = container;
    this.size = size;
    this.gap = gap;

    // Asteroids
    this.asteroids = new THREE.Group();
    this.container.add(this.asteroids);
    this.asteroidsObjects = [];

    // Bullets
    this.bullets = new THREE.Group();
    this.container.add(this.bullets);
    this.bulletsObjects = [];
  }

  addAsteroids(quantity) {
    const model = makeAsteroid(0xbbbbbb);
    for (var i = 0; i < quantity; i++) {
      const mesh = model.cloneMesh();
      const ast = new Asteroid(mesh, (i % 3) + 1);
      mesh.position.set(
        (Math.random() - 0.5) * 2 * (this.size + this.gap),
        (Math.random() - 0.5) * 2 * (this.size + this.gap),
        (Math.random() - 0.5) * 2 * (this.size + this.gap)
      );

      // mesh.receiveShadow = true;
      this.asteroids.add(mesh);
      this.asteroidsObjects.push(ast);
    }
  }

  tick(newPosition) {
    // const z = pov.object3D.position.z;
    // debugText.setAttribute('value', `${Math.floor(z)} / ${xx}`);

    // Update Asteroids
    this.asteroidsObjects.forEach(ast =>
      ast.tick(newPosition, this.size, this.gap)
    );

    // Update bullets
    for (let i = this.bulletsObjects.length - 1; i >= 0; i--) {
      const bullet = this.bulletsObjects[i];
      bullet.tick();
      if (bullet.distanceLeft < 0) {
        this.bullets.remove(bullet.mesh);
        this.bulletsObjects.splice(i, 1);
      }
    }
  }

  triggerBullet() {
    v.normalize();
    const bullet = new BulletMesh();
    bullet.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    this.bullets.add(bullet.mesh);
    this.bulletsObjects.push(new Bullet(bullet.mesh, origin, v));
    const bulletObject = new Bullet(xx.mesh, origin, v);
  }
}
