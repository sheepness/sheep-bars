var colourBars = [];
var barJumpFrames = 5; // number of animation frames
var barJumpDisplacement = 0; // position in animation

var colourPulseRecede = 0.01; // speed of receding back

var COLOUR_BAR_HEIGHT = 0.01; // colour bar size

var COLOUR_PULSE_CONSTANT = 0.04; // colour bar pulse size

var colourPulseSize = 0; // in number of heights

var BAR_POSITIONS = 8;

// add a bar
function createBars() {
  barAmount = randomInt(COLOURS.length-1)+1;

  colourBars.push({
    barPosition: 1,
    barColour: Math.floor(Math.random()*COLOURS.length),
    barBooleans: booleanArray(barAmount, COLOURS.length) // which bars are chosen
  });
}

// colour bar pulse
function colourPulse() {
  colourPulseSize = COLOUR_PULSE_CONSTANT;
  barShift();
}

// make pulse recede
function colourBarTick() {
  if (colourPulseSize > 0) {
    colourPulseSize -= pulseRecede;
  }
  if (colourPulseSize < 0)
    colourPulseSize = 0;
}

// shift down
function barShift() {
  correct = true;
  //var splicePositions = [];
  for (var i=0; i<colourBars.length; i++) {
    if (colourBars[i].barPosition == BAR_POSITIONS) {
      //splicePositions.push(i);
      for (var j=0; j<COLOURS.length; j++) {
        if (colourBars[i].barBooleans[j] != colourIndices[j]) {
          correct = false;
        }
      }
      colourBars.splice(i, 1);
      correction();
    }
    colourBars[i].barPosition++;
  }
  //for (var j=splicePositions.length-1; j>=0; j--) {
    //colourBars.splice(splicePositions[j], 1);
  //}
}

function drawBars(canvas, context) {
  for (var i=0; i<colourBars.length; i++) {
    for (var j=0; j<colourBars[i].barBooleans.length; j++) {
      context.fillStyle=COLOURS[j];
      if (colourBars[i].barBooleans[j])
      context.fillRect(j*(canvas.width/COLOURS.length),
        (colourBars[i].barPosition*(BAR_Y/BAR_POSITIONS)-COLOUR_BAR_HEIGHT/2-colourPulseSize/2)*canvas.height,
        canvas.width/COLOURS.length,
        (COLOUR_BAR_HEIGHT+colourPulseSize)*canvas.height);
    }
  }
}
