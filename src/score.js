var score = 0; // corrects in a row
var bestScore = 0; // best score

function drawScore(context) {
  context.font = "30px Arial";
  context.fillStyle = "black";
  context.textAlign="left";
  context.fillText(score+"  Best: "+bestScore,10,50);
}
