const MovingObject = require("./moving_object");
const Util = require("./utils");
const Ship = require("./ship");
const Bullet = require("./bullet");

const DEFAULTS = {
  COLOR: "gray",
  RADIUS: 25,
  SPEED: 3
};

Util.inherits(Asteroid, MovingObject);

function Asteroid(options) {
  options.color = DEFAULTS.COLOR;
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
  MovingObject.call(this, options);
}

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  }
  if (otherObject instanceof Bullet) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};

// const mov = new MovingObject( { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"});
//
// const ast = new Asteroid(
//   { pos: [75, 75] }
// );

module.exports = Asteroid;
// const canvas = document.getElementById("myCanvas");
// canvas.width = 500;
// canvas.height = 500;
//
//
// const ctx = canvas.getContext("2d");
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// ast.draw(ctx);
