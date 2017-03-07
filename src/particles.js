var PARTICLE_EDGE_HEIGHT = 0.02;
var PARTICLE_LIFESPAN = 20;
var PARTICLE_RELATIVE_SPEED = 1/6; // number of edge lengths per tick

var particles = [];

function spawnParticle(xx, yy, c) {
  particles.push({
    x: xx,
    y: yy,
    angle: Math.random()*2*Math.PI, // 0 degrees is right, increasing clockwise
    colour: c,
    alpha: 1,
    travelSpeed: PARTICLE_EDGE_HEIGHT*PARTICLE_RELATIVE_SPEED
  });
}

function particleTick() {
  var deadParticles = [];
  for (var i=0; i<particles.length; i++) {
    particles[i].alpha -= 1/PARTICLE_LIFESPAN;
    if (particles[i].alpha<=0) {
      particles[i].alpha = 0;
      deadParticles.push(i);
    }
  }
  groupSplice(particles, deadParticles);
}

function moveParticle(particle, canvas) {
  particle.x += particle.travelSpeed*Math.sin(particle.angle)*canvas.width;
  particle.y += particle.travelSpeed*Math.cos(particle.angle)*canvas.height;
}

function drawParticles(canvas, context) {
  var edgeLength = canvas.height*PARTICLE_EDGE_HEIGHT;
  for (var i=0; i<particles.length; i++) {
    moveParticle(particles[i], canvas);
    context.save();
    context.translate(particles[i].x+edgeLength/2, particles[i].y+edgeLength/2);
    context.rotate(particles[i].angle);
    context.fillStyle = particles[i].colour;
    context.globalAlpha = particles[i].alpha;
    context.fillRect(-edgeLength/2, -edgeLength/2, edgeLength, edgeLength);
    context.restore();
  }
  context.restore();
  context.globalAlpha = 1;
}
