const Asteroid = require("./asteroid");
const Ship = require("./ship");

function Game() {
  this.DIM_X = 800;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 15;
  this.asteroids =[];
  this.ship = new Ship({pos: this.randomPosition(), game: this});
  this.addAsteroids(this.NUM_ASTEROIDS);
  this.allSpacethings = this.allObjects();
}

// Game.prototype.addShip = function () {
//   const ship = new Ship({pos: this.randomPosition(), game: this});
//   this.ship.push(ship);
// };

Game.prototype.addAsteroids = function(numAsteroids) {
  for (let i = 0; i < numAsteroids; i++) {
    this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));
  }
};

Game.prototype.randomPosition = function() {
  return [Math.floor(Math.random()*this.DIM_X),Math.floor(Math.random()*this.DIM_Y)];
};

Game.prototype.add = function (spacething) {
  this.allSpacethings.push(spacething);
};

Game.prototype.allObjects = function () {
  const spacethings = this.asteroids.slice();
  spacethings.push(this.ship);

  return spacethings;
};

Game.prototype.moveObjects = function () {
  this.allSpacethings.forEach (spacething => {
    spacething.move();
  });
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
  this.allSpacethings.forEach (spacething => {
    spacething.draw(ctx);
  });
};

Game.prototype.wrap = function (pos) {
  let wrapped = pos.slice();
  if (pos[0] < 0) wrapped[0] = this.DIM_X;
  if (pos[1] < 0) wrapped[1] = this.DIM_Y;
  if (pos[0] > this.DIM_X) wrapped[0] = 0;
  if (pos[1] > this.DIM_Y) wrapped[1] = 0;
  return wrapped;
};

Game.prototype.isOutOfBounds = function (pos) {
  if(pos[0] < 0 || pos[1] < 0 || pos[0] > this.DIM_X || pos[1] > this.DIM_Y) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.checkCollisions = function () {
  for (let i = 0; i < this.allSpacethings.length - 1; i++) {
    for (let j = i + 1; j < this.allSpacethings.length; j++) {
       if (this.allSpacethings[i].isCollidedWith(this.allSpacethings[j])) {
         this.allSpacethings[i].collideWith(this.allSpacethings[j]);
       }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (spacething) {
  for (var i = 0; i < this.allSpacethings.length; i++) {
    if (spacething === this.allSpacethings[i]) {
      this.allSpacethings.splice(i, 1);
      return;
    }
  }
};

module.exports = Game;
