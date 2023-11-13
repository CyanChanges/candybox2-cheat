///<reference path="GridItem.ts"/>

export default class XinopherydonClaw extends GridItem{
    public hit(player: Player, quest: Quest, questEntity: QuestEntity, damage: number, reason: QuestEntityDamageReason): number{
        return damage*2;
    }
}