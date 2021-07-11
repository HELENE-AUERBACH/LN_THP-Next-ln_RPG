class Monk extends Character {
  constructor(name) {
    super(name);
    this.reset();
  }
  
  reset() {
    this.resetCharacter();
    this.hp = "8";
    this.dmg = "2";
    this.mana = "200";
  }
  
  dealDamage(victim) {
    if (this._hp > 0) {
      if (this._mana >= 25 && confirm("Voulez-vous lancer une attaque spéciale Heal?")) {
        this.lastSpecialAttack = "Heal";
	this.hp = 8;
        super.dealDamage(victim);
	this.mana = -25;
      } else {
        this.lastSpecialAttack = "Normale";
        super.dealDamage(victim);
      }
    } else {
      alert(this.name + " a déjà été éliminé et ne peut plus jouer!");
    }
  }
}
