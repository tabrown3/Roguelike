import { IEventHandler } from './IEventHandler';
import { Vec2 } from './Vec2';
import { IDrawable } from './IDrawable';
import { injectable, inject } from "inversify";

@injectable()
export class Player implements IDrawable {

    private worldPosX: number = 5;
    private worldPosY: number = 5;

    constructor() {

    }

    public getCharMatrix = (): string => "@";
    public getAnchorPos = (): Vec2 => this.getWorldPos();

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