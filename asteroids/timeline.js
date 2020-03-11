const TIMELINE = [
  { start: 0.01, call: cameraDown },
  { start: 11.3, call: sceneFlash },
  { start: 11.98, call: strobeRGB },
  { start: 12.88, call: sceneFlash },
  { start: 13.56, call: strobeRGB },
  { start: 14.46, call: sceneFlash },
  { start: 15.14, call: strobeRGB },
  { start: 16.04, call: sceneFlash },
  { start: 16.73, call: strobeRGB },
  { start: 17.63, call: sceneFlash },
  { start: 18.3, call: strobeRGB },
  { start: 19.2, call: sceneFlash },
  { start: 19.87, call: strobeRGB },
  { start: 20.77, call: sceneFlash },
  { start: 21.47, call: strobeRGB },
  { start: 22.37, call: sceneFlash },
  { start: 22.83, call: changeColor },
  { start: 23, call: changeColor },
  { start: 23.16, call: changeColor },
  { start: 23.33, call: changeColor },
  { start: 23.5, call: changeColor },
  { start: 23.66, call: changeColor },
  { start: 23.83, call: changeColor },
  // { start: 23.04, call: strobeRGB },
  { start: 23.94, call: sceneFlash },
  { start: 24.6, call: strobeRGB },
  { start: 25.5, call: sceneFlash },
  { start: 26.18, call: strobeRGB },
  { start: 27.08, call: sceneFlash },
  { start: 27.79, call: strobeRGB },
  { start: 28.69, call: sceneFlash },
  { start: 29.35, call: strobeRGB },
  { start: 30.25, call: sceneFlash },
  //
  { start: 29.35 + 1.6 * 1, call: strobeRGB },
  { start: 30.25 + 1.6 * 1, call: sceneFlash },
  { start: 29.35 + 1.6 * 2, call: strobeRGB },
  { start: 30.25 + 1.6 * 2, call: sceneFlash },
  { start: 29.35 + 1.6 * 3, call: strobeRGB },
  { start: 30.25 + 1.6 * 3, call: sceneFlash },
  { start: 29.35 + 1.6 * 4, call: strobeRGB },
  { start: 30.25 + 1.6 * 4, call: sceneFlash },
  { start: 29.35 + 1.6 * 5, call: strobeRGB },
  { start: 30.25 + 1.6 * 5, call: sceneFlash },
  { start: 29.35 + 1.6 * 6, call: strobeRGB },
  { start: 30.25 + 1.6 * 6, call: sceneFlash }
];

// Camera

var remaining;
const camerawrap = document.querySelector('#camerawrap');
function cameraDown() {
  remaining = 10;
  cameraDownLoop();
}

function cameraDownLoop() {
  remaining = Math.max(10 - currentTime, 0);
  camerawrap.object3D.position.y = remaining * 5;
  if (remaining > 0) {
    setTimeout(cameraDownLoop, 16);
  }
}

// Scene flash

let currentSceneBGR = 1;
function sceneFlash() {
  currentSceneBGR = 1;
  updateSceneFlash();
}

function updateSceneFlash() {
  scene.object3D.background.r = currentSceneBGR;
  scene.object3D.background.g = currentSceneBGR;
  scene.object3D.background.b = currentSceneBGR;
  currentSceneBGR /= 2;

  if (currentSceneBGR >= 0.03125) {
    setTimeout(updateSceneFlash, 16);
  }
}

///strobeRGB
let rgbCounterDown;
function strobeRGB() {
  rgbCounterDown = 35;
  updateStrobeRGB();
}

function updateStrobeRGB() {
  lightA.object3D.children[0].color.r = rgbCounterDown % 3 === 0 ? 1 : 0;
  lightA.object3D.children[0].color.g = rgbCounterDown % 3 === 1 ? 1 : 0;
  lightA.object3D.children[0].color.b = rgbCounterDown % 3 === 2 ? 1 : 0;
  rgbCounterDown--;

  if (rgbCounterDown === 0) {
    lightA.object3D.children[0].color.r = 1;
    lightA.object3D.children[0].color.g = 1;
    lightA.object3D.children[0].color.b = 1;
  } else {
    setTimeout(updateStrobeRGB, 16);
  }
}

//// TIMELINE CHECK
let currentTime = 0;
function timelineLoop() {
  setTimeout(timelineLoop, 16);
  const time = audio.currentTime;
  if (currentTime >= time) {
    return;
  }
  TIMELINE.filter(x => x.start > currentTime && x.start <= time).forEach(x =>
    x.call()
  );
  currentTime = time;
}
timelineLoop();
