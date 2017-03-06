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

// jump down
function barShift() {
  var splicePositions = [];
  for (var i=0; i<colourBars.length; i++) {
    colourBars[i].barPosition++;
    if (colourBars[i].barPosition == BAR_POSITIONS) {
      splicePositions.push(i);
    }
  }
  for (var j=splicePositions.length-1; j>=0; j--) {
    colourBars.splice(splicePositions[j], 1);
  }
}

function drawBars(canvas, context) {
  for (var i=0; i<colourBars.length; i++) {
    for (var j=0; j<colourBars[i].barBooleans.length; j++) {
      context.fillStyle=COLOURS[j];
      if (colourBars[i].barBooleans[j])
      context.fillRect(j*(canvas.width/COLOURS.length),
        (colourBars[i].barPosition*(BAR_Y/(BAR_POSITIONS-1))-COLOUR_BAR_HEIGHT/2-colourPulseSize/2)*canvas.height,
        canvas.width/COLOURS.length,
        (COLOUR_BAR_HEIGHT+colourPulseSize)*canvas.height);
    }
  }
}

// destroy bars matching colours on the control bar
function clearBars() {
  var splicePositions = [];
  for (var i=0; i<colourBars.length; i++) {
    if (colourBars[i].barPosition == BAR_POSITIONS) {
      splicePositions.push(i);
    }
  }
  for (var j=splicePositions.length-1; j>=0; j--) {
    if (colourIndices[colourBars[j].barColour])
      colourBars.splice(splicePositions[j], 1);
  }
}
;var colourIndices = [false, false, false, false];
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
;var mainTimer = false;
var FPS = 50;
var mainInterval = 1000/FPS;

var bpm = 128;
var pulseInterval = 60000/bpm;

var COLOURS = ["red", "blue", "yellow", "green"];

// initialise stuff
function init() {
  mainTimer = setInterval(tick, mainInterval);
  var drawArea = document.getElementById("barCanvas");
  var graphics = drawArea.getContext("2d");

  resizeCanvas();

  initBar();

  initControlBar();
}

// changes stuff every few milliseconds
function tick() {
  update();
  render();
}

// update stuff
function update() {
  barTick();
  colourBarTick();
}
// draw stuff
function render() {
  var canvas = document.getElementById("barCanvas");
  var context = canvas.getContext("2d");

context.clearRect(0, 0, canvas.width, canvas.height);
  drawMainBar(canvas, context); // animate bar
  drawBars(canvas, context); // moving bars
}
;var pulseSize = 0; // in number of heights
var pulseTimer = false;

var pulseRecede = 0.01; // speed of receding back

var PULSE_CONSTANT = 0.04; // main bar pulse size

var BAR_HEIGHT = 0.04; // bar height

var BAR_Y = 0.9; // percentage of page height

// init pulse timer
function initBar() {
  pulseTimer = setTimeout(pulse, pulseInterval);
}

// each throb
function pulse() {
  pulseSize = PULSE_CONSTANT;
  colourPulse();
  createBars();
  pulseTimer = setTimeout(pulse, pulseInterval);
}

// make pulse recede
function barTick() {
  if (pulseSize > 0) {
    pulseSize -= pulseRecede;
  }
  if (pulseSize < 0)
    pulseSize = 0;
}

// draw bottom bar
function drawMainBar(canvas, context) {
context.fillStyle="#000000";
  context.fillRect(0, (BAR_Y-BAR_HEIGHT/2-pulseSize/2)*canvas.height, canvas.width, (BAR_HEIGHT+pulseSize)*canvas.height);
}
;function randomInt(number) { // pick a random integer
  return Math.floor(Math.random()*number);
}
function booleanArray(truths, arrayLength) { // get an array of boleans with a certain number of trues
  var falses = arrayLength-truths;
  if (falses<0)
    return;

  var booleans = [];
  for (var i=0; i<falses; i++) {
    booleans.push(0);
  }
  for (var j=0; j<truths; j++) {
    booleans.splice(randomInt(arrayLength), 0, 1);
  }
  return booleans;
}
;function resizeCanvas(){
  var drawArea = document.getElementById("barCanvas");

  fitToContainer(drawArea);
}

  function fitToContainer(canvas){
    canvas.style.width='100%';
    canvas.style.height='100%';

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
