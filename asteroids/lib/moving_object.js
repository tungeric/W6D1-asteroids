
function MovingObject(options) {
  this.pos = options['pos'];
  this.vel = options['vel'];
  this.radius = options['radius'];
  this.color = options['color'];
  this.game = options['game'];
  this.isWrappable = true;
}

// MovingObject.prototype.print = function() {
//   console.log("hi");
// };

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.game.isOutOfBounds(this.pos)) {
    if (this.isWrappable === true) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.game.remove(this);
    }
  }
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  let x1 = this.pos[0];
  let y1 = this.pos[1];
  let x2 = otherObject.pos[0];
  let y2 = otherObject.pos[1];
  let dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  if (dist <= (this.radius + otherObject.radius)) {
    return true;
  } else {
    return false;
  }
};

MovingObject.prototype.collideWith = function(otherObject) {

};

module.exports = MovingObject;

// const mo = new MovingObject(
//   { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
// );
//
// const canvas = document.getElementById("myCanvas");
// canvas.width = 500;
// canvas.height = 500;
//
//
// const ctx = canvas.getContext("2d");
// ctx.fillRect(0, 0, canvas.width, canvas.height);
//
// mo.draw(ctx);
