var percent = 100;
var PERCENT_PULSE = 120;
var PERCENT_FRAMES = 8;
function resizeCanvas(canvas, context){
  fitToContainer(canvas, context);
}

function percentPulse() {
  percent = PERCENT_PULSE;
}

function percentTick() {
  if (percent > 100) {
    percent -= (PERCENT_PULSE-100)/PERCENT_FRAMES;
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
