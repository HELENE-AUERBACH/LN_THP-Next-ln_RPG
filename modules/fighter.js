import { Character } from './character.js';

class Fighter extends Character {
  constructor(name) {
    super(name);
    this.reset();
  }
  
  reset() {
    this.hp = "12";
    this.dmg = "4";
    this.mana = "40";
  }
  
  dealDamage(victim) {
    if (this._hp > 0) {
      if (this._mana >= 20 && confirm("Voulez-vous lancer une attaque spéciale Dark Vision?")) {
        this.lastSpecialAttack = "Dark Vision";
        this.dealDamage(victim, 5);
	this.mana = -20;
      } else {
        this.lastSpecialAttack = "Normale";
        this.dealDamage(victim);
      }
    } else {
      alert("Ce joueur a déjà été éliminé et ne peut plus jouer!");
    }
  }
}

export { Fighter };