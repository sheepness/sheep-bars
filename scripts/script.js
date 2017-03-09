var colourBars = [];
var BAR_JUMP_FRAMES = 5; // number of animation frames

var COLOUR_PULSE_FRAMES = 4; // speed of receding back

var COLOUR_BAR_HEIGHT = 0.01; // colour bar size

var COLOUR_PULSE_CONSTANT = 0.04; // colour bar pulse size

var colourPulseSize = 0; // in number of heights

var BAR_POSITIONS = 8;

var BAR_PARTICLES = 30;

// bar fade variables in main.js

// add a bar
function createBars() {
  barAmount = randomInt(COLOURS.length-1)+1;

  colourBars.push({
    barJumpDisplacement: 0,
    barPosition: 1,
    barColour: Math.floor(Math.random()*COLOURS.length),
    barBooleans: booleanArray(barAmount, COLOURS.length), // which bars are chosen
    barCorrects: booleanArray(0, COLOURS.length),
    barFading: false,
    barAlpha: 1,
    age: 0
  });
}

// colour bar pulse
function colourPulse() {
  colourPulseSize = COLOUR_PULSE_CONSTANT;
  barShift();
}

// make pulse recede
function colourBarTick() {
  //if (colourPulseSize > 0) {
  //  colourPulseSize -= COLOUR_PULSE_CONSTANT/COLOUR_PULSE_FRAMES;
  //}
  //if (colourPulseSize < 0)
  //  colourPulseSize = 0;

  colourPulseSize = decreaseIfPossible(colourPulseSize, COLOUR_PULSE_CONSTANT/COLOUR_PULSE_FRAMES, 0);

  minimumFadeAge = BAR_FADE_MAXIMUM-(Math.min(score, BAR_FADE_END_SCORE)-BAR_FADE_SCORE)*(BAR_FADE_MAXIMUM-BAR_FADE_MINIMUM)/(BAR_FADE_END_SCORE-BAR_FADE_SCORE);
  for (var i=0; i<colourBars.length; i++) {
    if (colourBars[i].barJumpDisplacement > 0) {
      colourBars[i].barJumpDisplacement--;
    }
    if (colourBars[i].barFading) {
      if (colourBars[i].barAlpha > 0) {
        colourBars[i].barAlpha-=1/BAR_FADE_FRAMES;
        if (colourBars[i].barAlpha<=0)
          colourBars[i].barAlpha = 0;
      }
    }
    if (score>BAR_FADE_SCORE) {
      if (colourBars[i].age>=minimumFadeAge) {
        colourBars[i].barFading = true;
      }
    }
    colourBars[i].age++;
  }
}

function removeAlpha() {
  for (var i=0; i<colourBars.length; i++) {
    colourBars[i].barAlpha = 1;
    colourBars[i].barFading = false;
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

function drawBars(context) {
  for (var i=0; i<colourBars.length; i++) {
    for (var j=0; j<colourBars[i].barBooleans.length; j++) {
      context.fillStyle=COLOURS[j];
      if (colourBars[i].barBooleans[j]) {
        context.globalAlpha = colourBars[i].barAlpha;
        context.fillRect(j*(canvasWidth/COLOURS.length),
          ((colourBars[i].barPosition-colourBars[i].barJumpDisplacement/BAR_JUMP_FRAMES)*(BAR_Y/BAR_POSITIONS)-COLOUR_BAR_HEIGHT/2-colourPulseSize/2)*canvasHeight,
          canvasWidth/COLOURS.length,
          (COLOUR_BAR_HEIGHT+colourPulseSize)*canvasHeight);
      }
    }
  }
  context.globalAlpha = 1;
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
;var correct = true;
var CORRECT_BORDER_THICKNESS = 0.05;
var BORDER_FADE_FRAMES = 30;
var BORDER_INIT_ALPHA = 1;
var borderAlpha = 0;
function correction() {
  if (!correct) {
    borderAlpha = BORDER_INIT_ALPHA;
    score = 0;
    percent_pulse = 100;
    removeAlpha();
  } else {
    if (percent_pulse < PERCENT_MAX) {
      percent_pulse += PERCENT_INCREASE;
    }
    if (percent_pulse >= PERCENT_MAX) {
      percent_pulse = PERCENT_MAX;
    }
    score++;
    if (score>bestScore)
      bestScore = score;
  }
}
function borderTick() {
  if (borderAlpha <= 0)
    return;

  borderAlpha -= BORDER_INIT_ALPHA/BORDER_FADE_FRAMES;
  if (borderAlpha <= 0)
    borderAlpha = 0;
}
function drawCorrect(context) {
  context.fillStyle = "#B22222";

  context.globalAlpha = borderAlpha;
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.globalAlpha = 1;
}
;var mainTimer = false;
var FPS = 50;
var mainInterval = 1000/FPS;

var bpm = 90;
var pulseInterval = 60000/bpm;

var COLOURS = ["red", "blue", "yellow", "green"];

var canvasWidth = 0;
var canvasHeight = 0;

var BAR_FADE_SCORE = 10; // when to start fading
var BAR_FADE_END_SCORE = 100; // when to stop fading
var minimumFadeAge = 69; // minimum age of bar that is fading
var BAR_FADE_MAXIMUM = pulseInterval*(BAR_POSITIONS-2)/mainInterval;
var BAR_FADE_MINIMUM = pulseInterval*(BAR_POSITIONS/2-1)/mainInterval;
var BAR_FADE_FRAMES = 50;

// initialise stuff
function init() {
  mainTimer = setInterval(tick, mainInterval);
  var drawArea = document.getElementById("barCanvas");
  var graphics = drawArea.getContext("2d");

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
  percentTick();
}
// draw stuff
function render() {
  var canvas = document.getElementById("barCanvas");
  var context = canvas.getContext("2d");

  context.save();

  resizeCanvas(canvas, context);

context.clearRect(0, 0, canvasWidth, canvasHeight);
  drawControlBar(context); // bar that shows which buttons you're pressing down
  drawMainBar(context); // animate bar
  drawBars(context); // moving bars
  drawCorrect(context);
  drawParticles(context);
  drawScore(context);
  drawRules(context);

  context.restore();
}
;var pulseSize = 0; // in number of heights
var pulseTimer = false;

var PULSE_FRAMES = 4; // speed of receding back

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
  percentPulse();
  pulseTimer = setTimeout(pulse, pulseInterval);
}

// make pulse recede
function barTick() {
  if (pulseSize > 0) {
    pulseSize -= PULSE_CONSTANT/PULSE_FRAMES;
  }
  if (pulseSize < 0)
    pulseSize = 0;
}

// draw bottom bar
function drawMainBar(context) {
context.fillStyle="#000000";
  context.fillRect(0, (BAR_Y-BAR_HEIGHT/2-pulseSize/2)*canvasHeight, canvasWidth, (BAR_HEIGHT+pulseSize)*canvasHeight);
  context.fillRect(0, (BAR_Y/BAR_POSITIONS-BAR_HEIGHT/2-pulseSize/2)*canvasHeight, canvasWidth, (BAR_HEIGHT+pulseSize)*canvasHeight);
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
  if (array.length<splicePositions.length)
    return;

  if (splicePositions.length===0)
    return;

  splicePositions.sort(sortNumber);
  for (var k=splicePositions.length-1; k>=0; k--) {
    array.splice(splicePositions[k], 1);
  }
}

function increaseIfPossible(toIncrease, increment, maximum) {
  if (toIncrease >= maximum)
    return toIncrease;

  increased = toIncrease + increment;
  if (increased >= maximum)
    increased = maximum;

  return increased;
}

function decreaseIfPossible(toDecrease, decrement, minimum) {
  if (toDecrease <= minimum)
    return toDecrease;

  decreased = toDecrease - decrement;
  if (decreased <= minimum)
    decreased = minimum;
  return decreased;
}
;var PARTICLE_EDGE_HEIGHT = 0.02;
var PARTICLE_LIFESPAN = 50;
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

function moveParticle(particle) {
  particle.x += particle.travelSpeed*Math.sin(particle.angle)*canvasWidth;
  particle.y += particle.travelSpeed*Math.cos(particle.angle)*canvasHeight;
}

function drawParticles(context) {
  var edgeLength = canvasHeight*PARTICLE_EDGE_HEIGHT;
  for (var i=0; i<particles.length; i++) {
    moveParticle(particles[i]);
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
;var percent = 100;
var percent_pulse = 100;
var PERCENT_FRAMES = 8; // pulse animation frame count
var PERCENT_MAX = 150; // max size pulse
var PERCENT_INCREASE = 1; // pulse increase per score
function resizeCanvas(canvas, context){
  fitToContainer(canvas, context);
}

function percentPulse() {
  percent = percent_pulse;
}

function percentTick() {
  if (percent > 100) {
    percent -= (percent_pulse-100)/PERCENT_FRAMES;
    if (percent <= 100)
      percent = 100;
  }
}

function fitToContainer(canvas, context) {
  canvas.style.width="100%";
  canvas.style.height="100%";

  w = canvas.offsetWidth;
  h = canvas.offsetHeight;

  canvas.width = w;
  canvas.height = h;

  canvasWidth = w*percent/100;
  canvasHeight = h*percent/100;

  context.translate(-(percent-100)*w/200, -(percent-100)*h/200);
}
;function drawRules(context) {
  context.font = "30px Arial";
  context.textAlign="right";
  context.fillText("Hold down the correct keys to get points", canvasWidth-10,50);
}
;var score = 0; // corrects in a row
var bestScore = 0; // best score

function drawScore(context) {
  context.font = "30px Arial";
  context.textAlign="left"; 
  context.fillText(score+"  Best: "+bestScore,10,50);
}
