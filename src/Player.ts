import { IEventHandler } from './IEventHandler';
import { Vec2 } from './Vec2';

export class Player {

    private worldPosX: number = 5;
    private worldPosY: number = 5;
    public avatar: string = "@";

    public setWorldPos = (x: number, y: number) => {

        this.worldPosX = x;
        this.worldPosY = y;
    }

    public getWorldPos = (): Vec2 => {

        return new Vec2(this.worldPosX, this.worldPosY);
    }

    public update = (eventHandler: IEventHandler) => {

        switch(eventHandler.getLastMove()) {
            case "w":
                this.setWorldPos(this.worldPosX, this.worldPosY - 1);
                break;
            case "d":
                this.setWorldPos(this.worldPosX + 1, this.worldPosY);
                break;
            case "s":
                this.setWorldPos(this.worldPosX, this.worldPosY + 1);
                break;
            case "a":
                this.setWorldPos(this.worldPosX - 1, this.worldPosY);
                break;
            default:
        }
    }
}