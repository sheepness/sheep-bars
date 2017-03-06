var colourIndices = [false, false, false, false];
function initControlBar() {
  document.onkeydown = (function(e) {
    if (e.keycode == 83) { // s = red
      colourIndex[0] = true;
    } else if (e.keycode == 68)  { // d = blue
      colourIndex[1] = true;
    } else if (e.keycode == 74)  { // j = yellow
      colourIndex[2] = true;
    } else if (e.keycode == 75)  { // k = green
      colourIndex[3] = true;
    }
  });
  document.onkeyup = (function(e) {
    if (e.keycode == 83) { // s = red
      colourIndex[0] = false;
    } else if (e.keycode == 68)  { // d = blue
      colourIndex[1] = false;
    } else if (e.keycode == 74)  { // j = yellow
      colourIndex[2] = false;
    } else if (e.keycode == 75)  { // k = green
      colourIndex[3] = false;
    }
  });
}
