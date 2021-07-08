import { Character } from './modules/character.js';
import { Fighter } from './modules/fighter.js';
import { Paladin } from './modules/paladin.js';
import { Monk } from './modules/monk.js';
import { Berzerker } from './modules/berzerker.js';
import { Assassin } from './modules/assassin.js';
import { Wizard } from './modules/wizard.js';
import { Game } from './modules/game.js';
import { Turn } from './modules/turn.js';

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
  game.watchStats();
}

function startGame() {
  while (game.turnLeft > 0) {
    Turn.new(game);
    if (game.onlyOnePlayerIsStillAliveOrNone()) {
      break;
    }
  }
  game.watchStats();
}
