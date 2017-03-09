var colourIndices = [];
function initControlBar() {
  for (var i=0; i<COLOURS.length; i++) {
    colourIndices.push(false);
  }
  document.onkeydown = function(event) {
    e = event.keyCode;
    if (e == 83) { // s = red
      colourIndices[0] = true;
    } else if (e == 68)  { // d = blue
      colourIndices[1] = true;
    } else if (e == 74)  { // j = yellow
      colourIndices[2] = true;
    } else if (e == 75)  { // k = green
      colourIndices[3] = true;
    }
  };
  document.onkeyup = function(event) {
    e = event.keyCode;
    if (e == 83) { // s = red
      colourIndices[0] = false;
    } else if (e == 68)  { // d = blue
      colourIndices[1] = false;
    } else if (e == 74)  { // j = yellow
      colourIndices[2] = false;
    } else if (e == 75)  { // k = green
      colourIndices[3] = false;
    }
  };
}

function drawControlBar(context) {
  var controlLetters = ["S","D","J","K"];
  context.fillStyle = "white";
  context.fillRect(0, BAR_Y*canvasHeight, canvasWidth, (1-BAR_Y)*canvasHeight);
  for (var i=0; i<colourIndices.length; i++) {
    context.fillStyle = COLOURS[i];
    if (colourIndices[i]) {
      context.fillRect(i*canvasWidth/COLOURS.length, BAR_Y*canvasHeight, canvasWidth/COLOURS.length, (1-BAR_Y)*canvasHeight);
    }
    context.fillStyle = "black";
    context.beginPath();
    context.rect(i*canvasWidth/COLOURS.length, BAR_Y*canvasHeight, canvasWidth/COLOURS.length, (1-BAR_Y)*canvasHeight);
    context.stroke();
    context.font = "30px Arial";
    context.textAlign="center";
    context.textBaseline = "middle";
    context.fillText(controlLetters[i], i*canvasWidth/COLOURS.length+canvasWidth/COLOURS.length/2, BAR_Y*canvasHeight+(1-BAR_Y)*canvasHeight/2);
    context.textBaseline = "alphabetic";
  }
}
