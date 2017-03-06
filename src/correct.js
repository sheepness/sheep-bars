var correct = true;
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
