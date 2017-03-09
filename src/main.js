var mainTimer = false;
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
