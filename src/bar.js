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
