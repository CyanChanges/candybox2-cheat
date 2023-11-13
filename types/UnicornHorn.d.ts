///<reference path="GridItem.ts"/>

export default class UnicornHorn extends GridItem{
    public update(player: Player, quest: Quest): void{
        player.heal(3);
    }
}