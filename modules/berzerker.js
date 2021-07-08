import { Character } from './character.js';

class Berzerker extends Character {
  constructor(name) {
    super(name);
    this.reset();
  }
  
  reset() {
    this.hp = "8";
    this.dmg = "4";
    this.mana = "0";
  }
  
  dealDamage(victim) {
    if (this._hp > 0) {
      if (confirm("Voulez-vous lancer une attaque spéciale Rage?")) {
        this.lastSpecialAttack = "Rage";
        this.hp = -1;
        this.dmg = 1;
        this.dealDamage(victim);
      } else {
        this.lastSpecialAttack = "Normale";
        this.dealDamage(victim);
      }
    } else {
      alert("Ce joueur a déjà été éliminé et ne peut plus jouer!");
    }
  }
}

export { Berzerker };