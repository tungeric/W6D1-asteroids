const Game = require("./game");
const Ship = require("./ship");

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
