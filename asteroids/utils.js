const utils = {
  gap: (i, min, max) => Math.min(max, Math.max(min, i)),
  lineFromRay: (pointA, direction) => {
    var distance = 100;
    var pointB = new THREE.Vector3();
    pointB.addVectors(pointA, direction.multiplyScalar(distance));

    var geometry = new THREE.Geometry();
    geometry.vertices.push(pointA);
    geometry.vertices.push(pointB);
    if (!lineray) {
      var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      utils.lineray = new THREE.Line(geometry, material);
      scene.object3D.add(utils.lineray);
    } else {
      utils.lineray.geometry = geometry;
    }
  }
};
