var PULSE_BPM = 128;
var pulseInterval = 60000/PULSE_BPM;
var pulseSize = 0; // in number of heights
var pulseTimer = false;

var pulseRecede = 0.01;

var PULSE_CONSTANT = 0.04;

var BAR_HEIGHT = 0.04;

// init pulse timer
function initBar() {
  pulseTimer = setInterval(pulse, pulseInterval);
}

// each throb
function pulse() {
  pulseSize = PULSE_CONSTANT;
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
function drawMainBar() {
  var canvas = document.getElementById("barCanvas");
  var context = canvas.getContext("2d");

context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillRect(0, (0.85-pulseSize/2)*canvas.height, canvas.width, (BAR_HEIGHT+pulseSize)*canvas.height);
}
;var mainTimer = false;
var FPS = 50;
var mainInterval = 1000/FPS;

// initialise stuff
function init() {
  mainTimer = setInterval(tick, mainInterval);
  var drawArea = document.getElementById("barCanvas");
  var graphics = drawArea.getContext("2d");

  resizeCanvas();

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
}
// draw stuff
function render() {
  drawMainBar(); // animate bar
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
