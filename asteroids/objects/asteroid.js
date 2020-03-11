class Asteroid {
  constructor(mesh, scale) {
    this.mesh = mesh;
    this.scale = scale;

    // Generate rotation speed
    this.rotSpeed = {
      x: Math.random() / 128,
      y: Math.random() / 128
    };

    // Generate random svector speed
    this.direction = {
      x: (Math.random() - 0.5) * 0.625,
      y: (Math.random() - 0.5) * 0.625,
      z: (Math.random() - 0.5) * 0.625
    };
    const directionIndex =
      Math.abs(this.direction.x) +
      Math.abs(this.direction.y) +
      Math.abs(this.direction.z);
    if (directionIndex > 1) {
      this.direction.x /= directionIndex;
      this.direction.y /= directionIndex;
      this.direction.z /= directionIndex;
    }
    this.direction.x /= 8;
    this.direction.y /= 8;
    this.direction.z /= 8;

    mesh.scale.set(this.scale, this.scale, this.scale);
    mesh.rotation.set(Math.random(), Math.random(), Math.random());
  }

  /**
   * space = {
   *   x: {min: -50}
   * }
   * @param {space} space
   */
  tick(center, size, gap) {
    // {x,y,z}, 50, 10

    // debugger;
    // 1. Update asteroid position
    const pos = {
      x: this.mesh.position.x + this.direction.x,
      y: this.mesh.position.y + this.direction.y,
      z: this.mesh.position.z + this.direction.z
    };
    this.mesh.rotation.set(
      this.mesh.rotation.x + this.rotSpeed.x,
      this.mesh.rotation.y + this.rotSpeed.y,
      this.mesh.rotation.z
    );

    // 2. Locate the asteroid in the space
    let outDistance = 0;
    ['x', 'y', 'z'].forEach(axis => {
      // Reposition
      if (pos[axis] < center[axis] - size - gap) {
        // console.log('Reposition - on #' + axis);
        pos[axis] += 2 * (size + gap);
      } else if (pos[axis] > center[axis] + size + gap) {
        // console.log('Reposition - on #' + axis);
        pos[axis] -= 2 * (size + gap);
      }

      // Cumulate out distance
      if (pos[axis] < center[axis] - size) {
        outDistance += center[axis] - size - pos[axis];
      } else if (pos[axis] > center[axis] + size) {
        outDistance += pos[axis] - (center[axis] + size);
      }
    });

    // 3. Update the scale based on the out distance
    const scale = (1 - Math.min(gap, outDistance) / gap) * this.scale;
    this.mesh.scale.set(scale, scale, scale);
    this.mesh.position.set(pos.x, pos.y, pos.z);
  }
}
