import { IWorld } from './IWorld';
import { Player } from './Player';

export class World implements IWorld {
    constructor(private player: Player) {

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
        outArr[playerPos.x][playerPos.y] = this.player.avatar;

        return outArr;
    }

    public update = (): void => {

        throw new TypeError("Not implemented");
    }
}