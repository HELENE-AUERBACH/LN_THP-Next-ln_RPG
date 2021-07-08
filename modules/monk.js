import { Character } from './character.js';

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
      if (this._mana >= 25 && confirm("Voulez-vous lancer une attaque spéciale Heal?")) {
        this.lastSpecialAttack = "Heal";
	this.hp = 8;
        this.dealDamage(victim);
	this.mana = -25;
      } else {
        this.lastSpecialAttack = "Normale";
        this.dealDamage(victim);
      }
    } else {
      alert("Ce joueur a déjà été éliminé et ne peut plus jouer!");
    }
  }
}

export { Monk };
