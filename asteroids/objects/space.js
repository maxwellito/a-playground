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
        0.001 * (Math.random() - 0.5) * 2 * (this.size + this.gap),
        0.001 * (Math.random() - 0.5) * 2 * (this.size + this.gap),
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
      const intersects = bullet.tick();
      if (intersects.length) {
        const intersect = intersects[0].object;
        const asteroidsObject = this.asteroidsObjects.find(
          x => x.mesh === intersect
        );
        asteroidsObject.scale /= 2;
        asteroidsObject.direction = {
          x: asteroidsObject.direction.y,
          y: asteroidsObject.direction.z,
          z: asteroidsObject.direction.x
        };
        sounds.bang.play();
      }
      if (bullet.distanceLeft < 0 || intersects.length) {
        this.bullets.remove(bullet.mesh);
        this.bulletsObjects.splice(i, 1);
      }
    }
  }

  triggerBullet(origin, direction, rotation) {
    sounds.fire.play();
    direction.normalize();
    const bullet = new BulletMesh();
    bullet.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    this.bullets.add(bullet.mesh);
    this.bulletsObjects.push(new Bullet(bullet.mesh, origin, direction));
    const bulletObject = new Bullet(bullet.mesh, origin, direction);
  }
}
