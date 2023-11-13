///<reference path="QuestEntityWeapon.ts"/>

export default class PlayerBludgeon extends QuestEntityWeapon{
    // Public methods
    public getRealDamage(): number{
        return Random.between(12, 16);
    }
    
    public getRealDamageText(): string{
        return "12-16";
    }
}