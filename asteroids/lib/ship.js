const MovingObject = require("./moving_object");
const Util = require("./utils");
const Bullet = require("./bullet");

const DEFAULTS = {
  COLOR: "green",
  RADIUS: 15,
  SPEED: 0
};

Util.inherits(Ship, MovingObject);

function Ship(options) {
  options.color = DEFAULTS.COLOR;
  options.radius = DEFAULTS.RADIUS;
  options.vel = [0,0];
  MovingObject.call(this, options);
}

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function () {
  const shipPos = this.pos.slice();
  const shipVel = this.vel.slice();
  const bullet = new Bullet({ pos: shipPos, vel: shipVel, game: this.game});
  this.game.add(bullet);
};


module.exports = Ship;
