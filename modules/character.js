class Character {
  constructor(name) {
    this._name = this.validateName(name);
    this.resetCharacter();
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
  
  resetCharacter() {
    this._status = "playing";
    this._lastSpecialAttack = "Normale";
    this._hp = this.checkHp("1");
    this._dmg = this.checkDmg("0");
    this._mana = this.checkMana("0");
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
    if (victim._hp > 0) {
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
