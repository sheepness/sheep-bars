function randomInt(number) { // pick a random integer
  return Math.floor(Math.random()*number);
}
function booleanArray(truths, arrayLength) { // get an array of boleans with a certain number of trues
  var falses = arrayLength-truths;
  if (falses<0)
    return;

  var booleans = [];
  for (var i=0; i<falses; i++) {
    booleans.push(false);
  }
  for (var j=0; j<truths; j++) {
    booleans.splice(randomInt(arrayLength), 0, true);
  }
  return booleans;
}

function sortNumber(a,b) {
    return a - b;
}

function groupSplice(array, splicePositions) {
  if (array.length<splicePositions.length)
    return;

  if (splicePositions.length===0)
    return;

  splicePositions.sort(sortNumber);
  for (var k=splicePositions.length-1; k>=0; k--) {
    array.splice(splicePositions[k], 1);
  }
}

function increaseIfPossible(toIncrease, increment, maximum) {
  if (toIncrease >= maximum)
    return toIncrease;

  increased = toIncrease + increment;
  if (increased >= maximum)
    increased = maximum;

  return increased;
}

function decreaseIfPossible(toDecrease, decrement, minimum) {
  if (toDecrease <= minimum)
    return toDecrease;

  decreased = toDecrease - decrement;
  if (decreased <= minimum)
    decreased = minimum;
  return decreased;
}
