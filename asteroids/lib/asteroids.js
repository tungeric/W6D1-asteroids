const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const game = new GameView(ctx);
  game.start();
});
