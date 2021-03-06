class Paladin extends Character {
  constructor(name) {
    super(name);
    this.reset();
  }
  
  reset() {
    this.resetCharacter();
    this.hp = "16";
    this.dmg = "3";
    this.mana = "160";
  }
  
  dealDamage(victim) {
    if (this._hp > 0) {
      if (this._mana >= 40 && confirm("Voulez-vous lancer une attaque spéciale Healing Lighting?")) {
        this.lastSpecialAttack = "Healing Lighting";
	this.hp = 5;
        super.dealDamage(victim, 4);
	this.mana = -40;
      } else {
        this.lastSpecialAttack = "Normale";
        super.dealDamage(victim);
      }
    } else {
      alert(this.name + " a déjà été éliminé et ne peut plus jouer!");
    }
  }
}
