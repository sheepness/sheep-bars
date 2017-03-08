var mainTimer = false;
var FPS = 50;
var mainInterval = 1000/FPS;

var bpm = 90;
var pulseInterval = 60000/bpm;

var COLOURS = ["red", "blue", "yellow", "green"];

var canvasWidth = 0;
var canvasHeight = 0;

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
  drawControlBar(canvas, context); // bar that shows which buttons you're pressing down
  drawMainBar(canvas, context); // animate bar
  drawBars(canvas, context); // moving bars
  drawCorrect(canvas, context);
  drawParticles(canvas, context);

  context.restore();
}
