const MovingObject = require("./moving_object");
const Util = require("./utils");

const DEFAULTS = {
  COLOR: "green",
  RADIUS: 3,
  SPEED: 20
};

Util.inherits(Bullet, MovingObject);

function Bullet(options) {
  options.color = DEFAULTS.COLOR;
  options.radius = DEFAULTS.RADIUS;

  let x1 = 0;
  let y1 = 0;
  let x2 = options.vel[0];
  let y2 = options.vel[1];
  let dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const newVel = [DEFAULTS.SPEED*x2/dist, DEFAULTS.SPEED*y2/dist];

  options.vel = newVel;
  MovingObject.call(this, options);
  this.isWrappable = false;
}

module.exports = Bullet;
