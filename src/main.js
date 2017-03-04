var mainTimer = false;
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
