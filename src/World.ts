import { IWorld } from './IWorld';
import { Player } from './Player';
import { IEventHandler } from './IEventHandler';
import { injectable, inject } from "inversify";
import { TYPES } from './types';

@injectable()
export class World implements IWorld {

    private player: Player = new Player();

    constructor(
        // @inject(TYPES.Player) private player: Player,
        @inject(TYPES.EventHandler) private eventHandler: IEventHandler) {

    }

    public getView = (): string[][] => {
        
        let outArr: string[][] = [];

        for(let i = 0; i < 80; i++) {
            outArr[i] = [];
            for(let j = 0; j < 25; j++) {
                outArr[i][j] = "X";
            }
        }

        let playerPos = this.player.getWorldPos();
        outArr[playerPos.x][playerPos.y] = this.player.getCharMatrix();

        return outArr;
    }

    public update = (): void => {
        this.player.update(this.eventHandler);
    }
}