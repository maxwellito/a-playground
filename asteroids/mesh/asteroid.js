// class Asteroid {
//   constructor(mesh) {
//     this.mesh = mesh;
//     this.radius = Math.random();
//     this.axis = Math.random() * Math.PI * 2;
//     this.speed = 1 / this.radius / 1024;
//     this.z = -4 - Math.random() * 150;
//     this.rotX = Math.random() / 128;
//     this.rotY = Math.random() / 128;
//     this.scale = Math.pow(this.radius, 3);

//     mesh.scale.set(this.scale, this.scale, this.scale);
//     mesh.rotation.set(Math.random(), Math.random(), Math.random());
//   }

//   tick(z) {
//     let scale = this.mesh.scale.x;
//     if (z < this.z) {
//       this.z -= 150;
//       scale = 0;
//       xx++;
//     }
//     if (scale < this.scale) {
//       scale = Math.min(this.scale, scale + this.scale / 32);
//       this.mesh.scale.set(scale, scale, scale);
//     }

//     this.axis += this.speed;
//     this.mesh.position.set(
//       Math.cos(this.axis) * (1 + this.radius * 6),
//       Math.sin(this.axis) * (1 + this.radius * 6),
//       this.z
//     );
//     this.mesh.rotation.set(
//       this.mesh.rotation.x + this.rotX,
//       this.mesh.rotation.y + this.rotY,
//       this.mesh.rotation.z
//     );
//   }
// }

class AsteroidMesh {
  constructor(geometry, color) {
    // Geometry
    this.geometry = geometry;

    // Material
    // this.material = new THREE.MeshNormalMaterial({});
    this.material = new THREE.MeshLambertMaterial({ color });

    // Mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  cloneMesh() {
    return new THREE.Mesh(this.geometry, this.material);
  }
}

function makeAsteroid(color) {
  const r = val => val + (Math.random() - 0.5) * 0.6;
  const geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3(-1, 1, -1),
    new THREE.Vector3(r(0), r(1), r(-1)),
    new THREE.Vector3(r(1), r(1), r(-1)),
    new THREE.Vector3(r(-1), r(1), r(0)),
    new THREE.Vector3(r(0), r(1), r(0)),
    new THREE.Vector3(r(1), r(1), r(0)),
    new THREE.Vector3(r(-1), r(1), r(1)),
    new THREE.Vector3(r(0), r(1), r(1)),
    new THREE.Vector3(r(1), r(1), r(1)),

    new THREE.Vector3(r(-1), r(0), r(-1)),
    new THREE.Vector3(r(0), r(0), r(-1)),
    new THREE.Vector3(r(1), r(0), r(-1)),
    new THREE.Vector3(r(-1), r(0), r(0)),
    new THREE.Vector3(r(0), r(0), r(0)),
    new THREE.Vector3(r(1), r(0), r(0)),
    new THREE.Vector3(r(-1), r(0), r(1)),
    new THREE.Vector3(r(0), r(0), r(1)),
    new THREE.Vector3(r(1), r(0), r(1)),

    new THREE.Vector3(r(-1), r(-1), r(-1)),
    new THREE.Vector3(r(0), r(-1), r(-1)),
    new THREE.Vector3(r(1), r(-1), r(-1)),
    new THREE.Vector3(r(-1), r(-1), r(0)),
    new THREE.Vector3(r(0), r(-1), r(0)),
    new THREE.Vector3(r(1), r(-1), r(0)),
    new THREE.Vector3(r(-1), r(-1), r(1)),
    new THREE.Vector3(r(0), r(-1), r(1)),
    new THREE.Vector3(r(1), r(-1), r(1))
  );

  geometry.faces.push(
    // Top
    new THREE.Face3(0, 3, 1),
    new THREE.Face3(1, 3, 4),
    new THREE.Face3(1, 4, 2),
    new THREE.Face3(2, 4, 5),
    new THREE.Face3(3, 6, 4),
    new THREE.Face3(4, 6, 7),
    new THREE.Face3(4, 7, 5),
    new THREE.Face3(5, 7, 8),

    // Bottom
    new THREE.Face3(18, 19, 21),
    new THREE.Face3(19, 22, 21),
    new THREE.Face3(19, 20, 22),
    new THREE.Face3(20, 23, 22),
    new THREE.Face3(21, 22, 24),
    new THREE.Face3(22, 25, 24),
    new THREE.Face3(22, 23, 25),
    new THREE.Face3(23, 26, 25),

    // Back
    new THREE.Face3(0, 1, 9),
    new THREE.Face3(1, 10, 9),
    new THREE.Face3(1, 2, 10),
    new THREE.Face3(2, 11, 10),
    new THREE.Face3(9, 10, 18),
    new THREE.Face3(10, 19, 18),
    new THREE.Face3(10, 11, 19),
    new THREE.Face3(11, 20, 19),

    // Front
    new THREE.Face3(6, 15, 7),
    new THREE.Face3(7, 15, 16),
    new THREE.Face3(7, 16, 8),
    new THREE.Face3(8, 16, 17),
    new THREE.Face3(15, 24, 16),
    new THREE.Face3(16, 24, 25),
    new THREE.Face3(16, 25, 17),
    new THREE.Face3(17, 25, 26),

    // Left
    new THREE.Face3(0, 9, 3),
    new THREE.Face3(3, 9, 12),
    new THREE.Face3(3, 12, 6),
    new THREE.Face3(6, 12, 15),
    new THREE.Face3(9, 18, 12),
    new THREE.Face3(12, 18, 21),
    new THREE.Face3(12, 21, 15),
    new THREE.Face3(15, 21, 24),

    // Right
    new THREE.Face3(2, 5, 11),
    new THREE.Face3(5, 14, 11),
    new THREE.Face3(5, 8, 14),
    new THREE.Face3(8, 17, 14),
    new THREE.Face3(11, 14, 20),
    new THREE.Face3(14, 23, 20),
    new THREE.Face3(14, 17, 23),
    new THREE.Face3(17, 26, 23)
  );

  geometry.computeFaceNormals();
  return new AsteroidMesh(geometry, color);
}
