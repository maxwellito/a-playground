function rainbowPalette() {
  let i = 0;
  const c = [];

  for (i = 15; i >= 0; i--) {
    c.push(`#${i.toString(16)}f0`);
  }
  for (i = 0; i < 16; i++) {
    c.push(`#0f${i.toString(16)}`);
  }

  for (i = 15; i >= 0; i--) {
    c.push(`#0${i.toString(16)}f`);
  }
  for (i = 0; i < 16; i++) {
    c.push(`#${i.toString(16)}0f`);
  }

  for (i = 15; i >= 0; i--) {
    c.push(`#f0${i.toString(16)}`);
  }
  for (i = 0; i < 15; i++) {
    c.push(`#f${i.toString(16)}0`);
  }
  return c;
}

function pinkPalette() {
  let i = 0;
  const c = [];

  for (i = 15; i >= 0; i--) {
    c.push(`#f0${i.toString(16)}`);
  }
  for (i = 0; i < 15; i++) {
    c.push(`#f0${i.toString(16)}`);
  }
  return c;
}

function miniHex(c) {
  return parseInt(`${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`, 16);
}
