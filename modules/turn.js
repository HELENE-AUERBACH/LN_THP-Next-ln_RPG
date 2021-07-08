class Turn {
  static #PRIVATE_TURN_NUMBER = 0;
  static #PRIVATE_PLAYERS_NUMBERS_ARRAY = [0, 1, 2, 3, 4, 5];
  
  static #startTurn() {
    Turn.#PRIVATE_TURN_NUMBER++;
    console.log("It's turn " + Turn.#PRIVATE_TURN_NUMBER);
  }
  
  static new(game) {
    if (game.turnLeft >= 1 && game.turnLeft <= 250) {
      Turn.#startTurn();
      setInterval(Turn.#choosePlayer(0, 5, game), 600);
    }
  }
  
  static #choosePlayer(min, max, game) {
    let randomPlayerNumber = Turn.#getPlayerNumberRandomly(min, max);
    let player = game.playersArray[randomPlayerNumber];
    console.log("It's time for " + player.name + " to play");
    let victimNumber;
    do {
      victimNumber = prompt("Quel est le numéro du joueur que vous voulez attaquer? (compris entre 1 et 6)");
    } while (victimNumber === undefined || victimNumber < 1 || victimNumber > 6);
    let victim = game.playersArray[victimNumber - 1];
    player.dealDamage(victim);
  }
  
  static #getPlayerNumberRandomly(min, max) {
    for (i = 0; i < Turn.#PRIVATE_PLAYERS_NUMBERS_ARRAY.length; i++) {
      let randomPlayerNumber = Turn.#getNumberRandomly(min, max);
      if (Turn.#PRIVATE_PLAYERS_NUMBERS_ARRAY.includes(randomPlayerNumber)) {
        Turn.#PRIVATE_PLAYERS_NUMBERS_ARRAY.splice(randomPlayerNumber, 1);
        return randomPlayerNumber;
      }
    }
  }
  
  static #getNumberRandomly(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }
}

export { Turn };
