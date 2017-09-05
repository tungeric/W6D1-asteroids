Function.prototype.inherits = function (SuperClass) {
  this.prototype = Object.create(SuperClass.prototype);
  this.prototype.constructor = this;
};

function MovingObject () {}

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

MovingObject.prototype.move = function () {
  console.log("I moved!");
};

Ship.prototype.shoot = function () {
  console.log("pew pew!");
};

Asteroid.prototype.float = function () {
  console.log("I'm a rock!");
};

const ast = new Asteroid;

const ship = new Ship;

ship.shoot();
ship.move();

ast.move();
ast.float();

ast.shoot();
