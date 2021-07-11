class Turn {
  constructor() {
    this.reset();
  }

  reset() {
    this._turnNumber = 0;
    this._playersNumbersArray = [0, 1, 2, 3, 4, 5];
    console.log("Reset this._turnNumber = " + this._turnNumber + " - this._playersNumbersArray = " + this._playersNumbersArray);
  }

  startTurn() {
    this._turnNumber++;
    this._playersNumbersArray = [0, 1, 2, 3, 4, 5];
    this._playersNumbersArray.map(function(number) {
      if (game.playersArray[number].status === "loser") {
        game._turn._playersNumbersArray.splice(number, 1, -1);
      }
    });
    console.log("It's turn " + this._turnNumber);
    console.log("this._turnNumber = " + this._turnNumber + " - this._playersNumbersArray = " + this._playersNumbersArray);
  }

  static new(game) {
    if (game.turnLeft >= 1 && game.turnLeft <= 250) {
      game._turn.startTurn();
      game._turn.choosePlayer(0, 5, game);
    }
  }

  choosePlayer(min, max, game) {
    let randomPlayerNumber = game._turn.getPlayerNumberRandomly(min, max, game);
    while (randomPlayerNumber !== -1) {
      let player = game.playersArray[randomPlayerNumber];
      console.log("It's time for " + player.name + " to play");
      let victimNumber;
      do {
        victimNumber = prompt("Quel est le numéro du joueur que vous voulez attaquer? (compris entre 1 et 6)");
      } while (victimNumber === undefined || victimNumber === null || isNaN(victimNumber) || victimNumber < 1 || victimNumber > 6 || game.playersArray[victimNumber - 1].status === "loser");
      let victim = game.playersArray[victimNumber - 1];
      player.dealDamage(victim);
      game.watchStats();
      if (victim.status === "loser") {
        console.log(victim.name + " a été éliminé!");
        game._turn._playersNumbersArray.splice(victimNumber - 1, 1, -1);
      }
      randomPlayerNumber = game._turn.getPlayerNumberRandomly(min, max, game);
    }
    console.log("Tous les joueurs ont soit déjà joué dans ce tour, soit déjà été éliminés!");
    game.newTurn();
  }

  getPlayerNumberRandomly(min, max, game) {
    while (game._turn._playersNumbersArray.filter(function(number) { return number !== -1; }).length > 0) {
      let randomPlayerNumber = Turn.getNumberRandomly(min, max);
      if (game._turn._playersNumbersArray.includes(randomPlayerNumber)) {
        game._turn._playersNumbersArray.splice(randomPlayerNumber, 1, -1);
        return randomPlayerNumber;
      }
    }
    return -1;
  }

  static getNumberRandomly(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }
}
