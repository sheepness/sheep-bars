var correct = true;
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
