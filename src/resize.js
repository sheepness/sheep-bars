var percent = 100;
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
