var colourBars = [];
var BAR_JUMP_FRAMES = 5; // number of animation frames

var COLOUR_PULSE_FRAMES = 4; // speed of receding back

var COLOUR_BAR_HEIGHT = 0.01; // colour bar size

var COLOUR_PULSE_CONSTANT = 0.04; // colour bar pulse size

var colourPulseSize = 0; // in number of heights

var BAR_POSITIONS = 8;

var BAR_PARTICLES = 30;

// add a bar
function createBars() {
  barAmount = randomInt(COLOURS.length-1)+1;

  colourBars.push({
    barJumpDisplacement: 0,
    barPosition: 1,
    barColour: Math.floor(Math.random()*COLOURS.length),
    barBooleans: booleanArray(barAmount, COLOURS.length), // which bars are chosen
    barCorrects: booleanArray(0, COLOURS.length)
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
    colourPulseSize -= COLOUR_PULSE_CONSTANT/COLOUR_PULSE_FRAMES;
  }
  if (colourPulseSize < 0)
    colourPulseSize = 0;
  for (var i=0; i<colourBars.length; i++)
  if (colourBars[i].barJumpDisplacement > 0) {
    colourBars[i].barJumpDisplacement--;
  }
}

// shift down
function barShift() {
  correct = true;
  var splicePositions = [];
  for (var i=0; i<colourBars.length; i++) {
    colourBars[i].barCorrects = booleanArray(0, COLOURS.length);
    if (colourBars[i].barPosition == BAR_POSITIONS) {
      //splicePositions.push(i);
      for (var j=0; j<COLOURS.length; j++) {
        if (colourBars[i].barBooleans[j] != colourIndices[j]) {
          correct = false;
          colourBars[i].barCorrects[j] = false;
        } else if (colourBars[i].barBooleans[j] && colourIndices[j]) {
          colourBars[i].barCorrects[j] = true;
        }
      }
      splicePositions.push(i);
      correction();
    }
    colourBars[i].barJumpDisplacement = BAR_JUMP_FRAMES;
    colourBars[i].barPosition++;
  }
  for (var k=0; k<splicePositions.length; k++) {
    for (var l=0; l<COLOURS.length; l++) {
      if (colourBars[splicePositions[k]].barCorrects[l]) {
        for (var m=0; m<BAR_PARTICLES; m++)
        spawnParticle((Math.random()+l)*canvasWidth/COLOURS.length, BAR_Y*canvasHeight, COLOURS[l]);
      }
    }
  }
  groupSplice(colourBars, splicePositions);
}

function drawBars(canvas, context) {
  for (var i=0; i<colourBars.length; i++) {
    for (var j=0; j<colourBars[i].barBooleans.length; j++) {
      context.fillStyle=COLOURS[j];
      if (colourBars[i].barBooleans[j])
      context.fillRect(j*(canvasWidth/COLOURS.length),
        ((colourBars[i].barPosition-colourBars[i].barJumpDisplacement/BAR_JUMP_FRAMES)*(BAR_Y/BAR_POSITIONS)-COLOUR_BAR_HEIGHT/2-colourPulseSize/2)*canvasHeight,
        canvasWidth/COLOURS.length,
        (COLOUR_BAR_HEIGHT+colourPulseSize)*canvasHeight);
    }
  }
}
