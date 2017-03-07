var colourBars = [];
var BAR_JUMP_FRAMES = 5; // number of animation frames

var colourPulseRecede = 0.01; // speed of receding back

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
    colourPulseSize -= pulseRecede;
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
      context.fillRect(j*(canvas.width/COLOURS.length),
        ((colourBars[i].barPosition-colourBars[i].barJumpDisplacement/BAR_JUMP_FRAMES)*(BAR_Y/BAR_POSITIONS)-COLOUR_BAR_HEIGHT/2-colourPulseSize/2)*canvas.height,
        canvas.width/COLOURS.length,
        (COLOUR_BAR_HEIGHT+colourPulseSize)*canvas.height);
    }
  }
}
;var colourIndices = [];
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

function drawControlBar(canvas, context) {
  for (var i=0; i<colourIndices.length; i++) {
    context.fillStyle = COLOURS[i];
    if (colourIndices[i]) {
      context.fillRect(i*canvas.width/COLOURS.length, BAR_Y*canvas.height, canvas.width/COLOURS.length, (1-BAR_Y)*canvas.height);
    }
  }
}
;var correct = true;
var CORRECT_BORDER_THICKNESS = 0.05;
var BORDER_FADE_FRAMES = 30;
var BORDER_INIT_ALPHA = 1;
var borderAlpha = 0;
function correction() {
  if (!correct)
    borderAlpha = BORDER_INIT_ALPHA;
}
function borderTick() {
  if (borderAlpha <= 0)
    return;

  borderAlpha -= BORDER_INIT_ALPHA/BORDER_FADE_FRAMES;
  if (borderAlpha <= 0)
    borderAlpha = 0;
}
function drawCorrect(canvas, context) {
  context.fillStyle = "#B22222";

  context.globalAlpha = borderAlpha;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
}
;var mainTimer = false;
var FPS = 50;
var mainInterval = 1000/FPS;

var bpm = 60;
var pulseInterval = 60000/bpm;

var COLOURS = ["red", "blue", "yellow", "green"];

var canvasWidth = 0;
var canvasHeight = 0;

// initialise stuff
function init() {
  mainTimer = setInterval(tick, mainInterval);
  var drawArea = document.getElementById("barCanvas");
  var graphics = drawArea.getContext("2d");

  resizeCanvas();

  initControlBar();

  initBar();
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
  borderTick();
  particleTick();
}
// draw stuff
function render() {
  var canvas = document.getElementById("barCanvas");
  var context = canvas.getContext("2d");

  canvasWidth = canvas.width;
  canvasHeight = canvas.height;

context.clearRect(0, 0, canvas.width, canvas.height);
  drawControlBar(canvas, context); // bar that shows which buttons you're pressing down
  drawMainBar(canvas, context); // animate bar
  drawBars(canvas, context); // moving bars
  drawCorrect(canvas, context);
  drawParticles(canvas, context);
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
  context.fillRect(0, (BAR_Y/BAR_POSITIONS-BAR_HEIGHT/2-pulseSize/2)*canvas.height, canvas.width, (BAR_HEIGHT+pulseSize)*canvas.height);
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
    booleans.push(false);
  }
  for (var j=0; j<truths; j++) {
    booleans.splice(randomInt(arrayLength), 0, true);
  }
  return booleans;
}

function sortNumber(a,b) {
    return a - b;
}

function groupSplice(array, splicePositions) {
  if (array.length>splicePositions.length)
    return;

  if (splicePositions.length===0)
    return;

  splicePositions.sort(sortNumber);
  for (var k=splicePositions.length-1; k>=0; k--) {
    array.splice(splicePositions[k], 1);
  }
}
;var PARTICLE_EDGE_HEIGHT = 0.02;
var PARTICLE_LIFESPAN = 20;
var PARTICLE_RELATIVE_SPEED = 1/6; // number of edge lengths per tick

var particles = [];

function spawnParticle(xx, yy, c) {
  particles.push({
    x: xx,
    y: yy,
    angle: Math.random()*2*Math.PI, // 0 degrees is right, increasing clockwise
    colour: c,
    alpha: 1,
    travelSpeed: PARTICLE_EDGE_HEIGHT*PARTICLE_RELATIVE_SPEED
  });
}

function particleTick() {
  var deadParticles = [];
  for (var i=0; i<particles.length; i++) {
    particles[i].alpha -= 1/PARTICLE_LIFESPAN;
    if (particles[i].alpha<=0) {
      particles[i].alpha = 0;
      deadParticles.push(i);
    }
  }
  groupSplice(particles, deadParticles);
}

function moveParticle(particle, canvas) {
  particle.x += particle.travelSpeed*Math.sin(particle.angle)*canvas.width;
  particle.y += particle.travelSpeed*Math.cos(particle.angle)*canvas.height;
}

function drawParticles(canvas, context) {
  var edgeLength = canvas.height*PARTICLE_EDGE_HEIGHT;
  for (var i=0; i<particles.length; i++) {
    moveParticle(particles[i], canvas);
    context.save();
    context.translate(particles[i].x+edgeLength/2, particles[i].y+edgeLength/2);
    context.rotate(particles[i].angle);
    context.fillStyle = particles[i].colour;
    context.globalAlpha = particles[i].alpha;
    context.fillRect(-edgeLength/2, -edgeLength/2, edgeLength, edgeLength);
    context.restore();
  }
  context.restore();
  context.globalAlpha = 1;
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
