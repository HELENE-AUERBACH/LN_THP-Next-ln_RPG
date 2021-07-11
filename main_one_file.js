class Character {
  constructor(name) {
    this._name = this.validateName(name);
    this.reset();
  }
  
  get name() {
    if (this._name === '') {
      return "Aucun nom n'a été donné à ce joueur!";
    } else {
      return this._name;
    }
  }
  
  set name(newName) {
    this._name = this.validateName(newName);
  }
  
  validateName(newName) {
    if (newName !== undefined && newName !== null && newName.length >= 2) {
      return newName;
    } else {
      alert("Le nombre de caractères pour le nom du joueur doit être au minimum égal à deux!");
      return '';
    }
  }
  
  get status() {
    return this._status;
  }
  
  set status(newStatus) {
    this._status = this.validateStatus(newStatus);
  }
  
  validateStatus(newStatus) {
    if (newStatus !== undefined && newStatus !== null && ["playing", "loser", "winner"].includes(newStatus)) {
      return newStatus;
    } else {
      alert("Le statut d'un joueur ne peut être que playing, loser ou winner!");
      return 'loser';
    }
  }
  
  get lastSpecialAttack() {
    return this._lastSpecialAttack;
  }
  
  set lastSpecialAttack(newLastSpecialAttack) {
    this._lastSpecialAttack = this.validateLastSpecialAttack(newLastSpecialAttack);
  }
  
  validateLastSpecialAttack(newLastSpecialAttack) {
    if (newLastSpecialAttack !== undefined && newLastSpecialAttack !== null && ["Normale", "Dark Vision", "Healing Lighting", "Heal", "Rage", "Shadow hit", "Fireball"].includes(newLastSpecialAttack)) {
      return newLastSpecialAttack;
    } else {
      alert("Le nom de l'attaque portée par le joueur doit être l'une des valeurs suivantes : Normale, Dark Vision, Healing Lighting, Heal, Rage, Shadow hit ou Fireball !");
      return '';
    }
  }
  
  get hp() {
    return this._hp;
  }
  
  set hp(newHp) {
    this._hp = this.checkHp(newHp);
  }
  
  checkHp(newHp) {
    let theHp;
    if (newHp !== undefined && newHp !== null && !isNaN(newHp)) {
      if (typeof newHp === 'string') {
        theHp = parseInt(newHp);
      } else {
        theHp = this._hp + newHp;
      }
    } else {
      theHp = 0;
      alert("Ce nombre de points de vie est invalide!");
    }
    if (theHp <= 0) {
      this._status = "loser";
    }
    return theHp;
  }
  
  get dmg() {
    return this._dmg;
  }
  
  set dmg(newDmg) {
    this._dmg = this.checkDmg(newDmg);
  }
  
  checkDmg(newDmg) {
    let dmg;
    if (newDmg !== undefined && newDmg !== null && !isNaN(newDmg)) {
      if (typeof newDmg === 'string') {
        dmg = parseInt(newDmg);
      } else {
        dmg = this._dmg + newDmg;
      }
    } else {
      dmg = 0;
      alert("Ce nombre de points de dégât est invalide!");
    }
    return dmg;
  }
  
  get mana() {
    return this._mana;
  }
  
  set mana(newMana) {
    this._mana = this.checkMana(newMana);
  }
  
  checkMana(newMana) {
    let mana;
    if (newMana !== undefined && newMana !== null && !isNaN(newMana)) {
      if (typeof newMana === 'string') {
        mana = parseInt(newMana);
      } else {
        mana = this._mana + newMana;
      }
    } else {
      mana = 0;
      alert("Ce nombre de points de mana est invalide!");
    }
    return mana;
  }
  
  reset() {
    this._status = "playing";
    this._lastSpecialAttack = "Normale";
    this._hp = this.checkHp("1");
    this._dmg = this.checkDmg("0");
    this._mana = this.checkMana("0");
    //alert(this.name + " status : " + this._status + " lastSpecialAttack : " + this._lastSpecialAttack + " hp : " + this._hp + " dmg : " + this._dmg + " mana : " + this._mana);
  }
  
  getAllInfo() {
    return (
      "Name : " +
      this.name +
      "\n" +
      "Type de joueur : " +
      this.constructor.name +
      "\n" +
      "Points de vie restants : " +
      this.hp +
      "\n" +
      "Points de dégât infligés lors d'une attaque normale : " +
      this.dmg +
      "\n" +
      "Points de mana restants : " +
      this.mana +
      "\n" +
      "Type de la dernière attaque : " +
      this.lastSpecialAttack +
      "\n" +
      "Statut : " +
      this.status
    );
  }
  
  takeDamage(receivedDmg) {
    if (this._hp > 0) {
      if (receivedDmg > 0) {
        this.hp = -1 * receivedDmg;
      }
    } else {
      alert(this.name + " a déjà été éliminé et ne peut plus être attaqué!");
    }
  }
  
  dealDamage(victim, givenDmg = this._dmg) {
    if (this._hp > 0) {
      if (victim.lastSpecialAttack === "Dark Vision" && givenDmg >= 2) {
        givenDmg -= 2;
      } else if (victim.lastSpecialAttack === "Shadow hit") {
	givenDmg = 0;
      }
      victim.takeDamage(givenDmg);
      if (victim._hp <= 0) {
        this.mana = 20;
      }
      console.log(this.name + " is attacking " + victim.name + ". He deals him " + givenDmg + " damages. " + victim.name + " got " + victim._hp + " lifepoints left.");
    } else {
      alert(this.name + " a déjà été éliminé et ne peut plus jouer!");
    }
  } 
}

class Fighter extends Character {
  constructor(name) {
    super(name);
    this.reset();
  }
  
  reset() {
    this._status = "playing";
    this._lastSpecialAttack = "Normale";
    this.hp = "12";
    this.dmg = "4";
    this.mana = "40";
    //alert("Fighter " + this.name + " status : " + this._status + " lastSpecialAttack : " + this._lastSpecialAttack + " hp " + this._hp + " dmg : " + this._dmg + " mana : " + this._mana);
  }
  
  dealDamage(victim) {
    if (this._hp > 0) {
      if (this._mana >= 20) {
        if (confirm("Voulez-vous lancer une attaque spéciale Dark Vision?")) {
	  //alert("True pour Dark Vision?");
          this.lastSpecialAttack = "Dark Vision";
          super.dealDamage(victim, 5);
	  this.mana = -20;
        } else {
          this.lastSpecialAttack = "Normale";
          super.dealDamage(victim);
        }
      } else {
        this.lastSpecialAttack = "Normale";
        super.dealDamage(victim);
      }
    } else {
      alert(this.name + " a déjà été éliminé et ne peut plus jouer!");
    }
  }
}

class Paladin extends Character {
  constructor(name) {
    super(name);
    this.reset();
  }

  reset() {
    this._status = "playing";
    this._lastSpecialAttack = "Normale";
    this.hp = "16";
    this.dmg = "3";
    this.mana = "160";
  }

  dealDamage(victim) {
    if (this._hp > 0) {
      if (this._mana >= 40) {
	if (confirm("Voulez-vous lancer une attaque spéciale Healing Lighting?")) {
	  //alert("True pour Healing Lighting?");
          this.lastSpecialAttack = "Healing Lighting";
	  this.hp = 5;
          super.dealDamage(victim, 4);
	  this.mana = -40;
        } else {
          this.lastSpecialAttack = "Normale";
          super.dealDamage(victim);
	}
      } else {
        this.lastSpecialAttack = "Normale";
        super.dealDamage(victim);
      }
    } else {
      alert(this.name + " a déjà été éliminé et ne peut plus jouer!");
    }
  }
}

class Monk extends Character {
  constructor(name) {
    super(name);
    this.reset();
  }

  reset() {
    this._status = "playing";
    this._lastSpecialAttack = "Normale";
    this.hp = "8";
    this.dmg = "2";
    this.mana = "200";
  }

  dealDamage(victim) {
    if (this._hp > 0) {
      if (this._mana >= 25) {
        if (confirm("Voulez-vous lancer une attaque spéciale Heal?")) {
	  //alert("True pour Heal?");
          this.lastSpecialAttack = "Heal";
	  this.hp = 8;
          super.dealDamage(victim);
	  this.mana = -25;
        } else {
          this.lastSpecialAttack = "Normale";
          super.dealDamage(victim);
        }
      } else {
        this.lastSpecialAttack = "Normale";
        super.dealDamage(victim);
      }
    } else {
      alert(this.name + " a déjà été éliminé et ne peut plus jouer!");
    }
  }
}

class Berzerker extends Character {
  constructor(name) {
    super(name);
    this.reset();
  }

  reset() {
    this._status = "playing";
    this._lastSpecialAttack = "Normale";
    this.hp = "8";
    this.dmg = "4";
    this.mana = "0";
  }

  dealDamage(victim) {
    if (this._hp > 0) {
      if (confirm("Voulez-vous lancer une attaque spéciale Rage?")) {
	//alert("True pour Rage?");
        this.lastSpecialAttack = "Rage";
        this.hp = -1;
        this.dmg = 1;
        super.dealDamage(victim);
      } else {
        this.lastSpecialAttack = "Normale";
        super.dealDamage(victim);
      }
    } else {
      alert(this.name + " a déjà été éliminé et ne peut plus jouer!");
    }
  }
}

class Assassin extends Character {
  constructor(name) {
    super(name);
    this.reset();
  }

  reset() {
    this._status = "playing";
    this._lastSpecialAttack = "Normale";
    this.hp = "6";
    this.dmg = "6";
    this.mana = "20";
  }

  dealDamage(victim) {
    if (this._hp > 0) {
      if (this._mana >= 20) {
        if (confirm("Voulez-vous lancer une attaque spéciale Shadow hit?")) {
	  //alert("True pour Shadow hit?");
          this.lastSpecialAttack = "Shadow hit";
          super.dealDamage(victim, 7);
	  this.mana = -20;
	  if (victim._hp > 0) {
            this.hp = -7;
          }
        } else {
          this.lastSpecialAttack = "Normale";
          super.dealDamage(victim);
        }
      } else {
        this.lastSpecialAttack = "Normale";
        super.dealDamage(victim);
      }
    } else {
      alert(this.name + " a déjà été éliminé et ne peut plus jouer!");
    }
  }
}

class Wizard extends Character {
  constructor(name) {
    super(name);
    this.reset();
  }

  reset() {
    this._status = "playing";
    this._lastSpecialAttack = "Normale";
    this.hp = "10";
    this.dmg = "2";
    this.mana = "200";
  }

  dealDamage(victim) {
    if (this._hp > 0) {
      if (this._mana >= 25) {
        if (confirm("Voulez-vous lancer une attaque spéciale Fireball?")) {
	  //alert("True pour Fireball?");
          this.lastSpecialAttack = "Fireball";
          super.dealDamage(victim, 7);
	  this.mana = -25;
        } else {
          this.lastSpecialAttack = "Normale";
          super.dealDamage(victim);
        }
      } else {
        this.lastSpecialAttack = "Normale";
        super.dealDamage(victim);
      }
    } else {
      alert(this.name + " a déjà été éliminé et ne peut plus jouer!");
    }
  }
}

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
      //this._turn = new Turn();
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
    //alert("newTurnLeft = " + newTurnLeft);
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
  console.log("Ce jeu se jouera au maximum en : " + game.turnLeft + " tour(s).");
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
