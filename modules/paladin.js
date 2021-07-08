class Paladin extends Character {
  constructor(name) {
    super(name);
    this.reset();
  }
  
  reset() {
    this.hp = "16";
    this.dmg = "3";
    this.mana = "160";
  }
  
  dealDamage(victim) {
    if (this._hp > 0) {
      if (this._mana >= 40 && confirm("Voulez-vous lancer une attaque spéciale Healing Lighting?")) {
        this.lastSpecialAttack = "Healing Lighting";
	this.hp = 5;
        this.dealDamage(victim, 4);
	this.mana = -40;
      } else {
        this.lastSpecialAttack = "Normale";
        this.dealDamage(victim);
      }
    } else {
      alert("Ce joueur a déjà été éliminé et ne peut plus jouer!");
    }
  }
}

export { Paladin };