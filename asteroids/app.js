/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Util = {
  inherits (childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
    childClass.prototype.constructor = childClass;
  },

  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};



module.exports = Util;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Util = __webpack_require__(1);
const Bullet = __webpack_require__(8);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(4);

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const game = new GameView(ctx);
  game.start();
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(5);
const Ship = __webpack_require__(2);

function GameView(ctx) {
  this.game = new Game();
  this.ship = this.game.ship;
  this.ctx = ctx;
}

// GameView.prototype.moveAndDraw = function() {
//   this.game.moveObjects();
//   this.game.draw(this.ctx);
// };

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  setInterval( () => {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function() {
  const ship = this.ship;
  console.log(ship.vel);
  key('a', function(){ ship.power([-1,0]); });
  key('d', function(){ ship.power([1,0]); });
  key('w', function(){ ship.power([0,-1]); });
  key('s', function(){ ship.power([0,1]); });
  key('p', function(){ ship.fireBullet(); });
};

module.exports = GameView;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(6);
const Ship = __webpack_require__(2);

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Util = __webpack_require__(1);
const Ship = __webpack_require__(2);
const Bullet = __webpack_require__(8);

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


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Util = __webpack_require__(1);

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


/***/ })
/******/ ]);