class Assassin extends Character {
  constructor(name) {
    super(name);
    this.reset();
  }
  
  reset() {
    this.resetCharacter();
    this.hp = "6";
    this.dmg = "6";
    this.mana = "20";
  }
  
  dealDamage(victim) {
    if (this._hp > 0) {
      if (this._mana >= 20 && confirm("Voulez-vous lancer une attaque spéciale Shadow hit?")) {
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
      alert(this.name + " a déjà été éliminé et ne peut plus jouer!");
    }
  }
}
