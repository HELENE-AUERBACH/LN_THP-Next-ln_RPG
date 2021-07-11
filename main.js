let playersArray = new Array();
playersArray.push(new Fighter("Grace"));
playersArray.push(new Paladin("Ulder"));
playersArray.push(new Monk("Moana"));
playersArray.push(new Berzerker("Draven"));
playersArray.push(new Assassin("Carl"));
playersArray.push(new Wizard("Sage"));
let game = new Game(playersArray);

function initGame() {
  game.reset();
  console.log("Ce jeu se jouera au maximum en " + game.turnLeft + " tour(s).");
  game.watchStats();
}

function startGame() {
  while (game.turnLeft > 0) {
    Turn.new(game);
    game.watchStats();
    if (game.onlyOnePlayerIsStillAliveOrNone()) {
      break;
    }
  }
}
