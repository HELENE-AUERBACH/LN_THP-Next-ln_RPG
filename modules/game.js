class Game {
  constructor(playersArray, turnLeft = 10) {
    this._playersArray = playersArray;
    this._turnLeft = this.validateTurnLeft(turnLeft);
  }
  
  get playersArray() {
    return this._playersArray;
  }
  
  set playersArray(newPlayersArray) {
    this._playersArray = newPlayersArray;
  }
  
  get turnLeft() {
    return this._turnLeft;
  }
  
  set turnLeft(newTurnLeft) {
    this._turnLeft = this.validateTurnLeft(newTurnLeft);
  }
  
  validateTurnLeft(newTurnLeft) {
    if (newTurnLeft >= 1 && newTurnLeft <= 250) {
      return newTurnLeft;
    } else {
      alert("Le nombre de tours à jouer dans une partie doit être au minimum égal à 1 et au maximum égal à 250!");
      return 1;
    }
  }
  
  newTurn() {
    if (this._turnLeft >= 1) {
      this._turnLeft--;
    }
    if (this._turnLeft === 0) {
      this._playersArray.map(function(player) {
        if (player._hp > 0) {
          player.status = "winner";
        }
      });
    }
  }
  
  onlyOnePlayerIsStillAliveOrNone() {
    let result = false;
    result = this.playersArray.filter(function(player) { return player._hp > 0; }).length <= 1;
    return result;
  }
  
  reset() {
    let newTurnLeft = prompt("Combien de tours à jouer voulez-vous pour cette partie? (Par défaut, il y en a 10)");
    if (newTurnLeft === null) {
      newTurnLeft = 10;
    }
    this.turnLeft = newTurnLeft;
    this.playersArray.map(function(player) {
      player.reset();
    });
    this._turn = new Turn();
  }
  
  watchStats() {
    document.getElementById("p1");
    p1.value = this._playersArray[0].getAllInfo();
    
    document.getElementById("p2");
    p2.value = this._playersArray[1].getAllInfo();
    
    document.getElementById("p3");
    p3.value = this._playersArray[2].getAllInfo();
    
    document.getElementById("p4");
    p4.value = this._playersArray[3].getAllInfo();
    
    document.getElementById("p5");
    p5.value = this._playersArray[4].getAllInfo();
    
    document.getElementById("p6");
    p6.value = this._playersArray[5].getAllInfo();
  }
}
