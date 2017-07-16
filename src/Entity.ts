import Vec2 from './Vec2';
import Color from './Color';

export default abstract class Entity {
    
    private readonly worldPos: Vec2 = new Vec2(0, 0);
    private readonly prevWorldPos: Vec2 = new Vec2(0, 0);

    public abstract getIcon: () => string;
    public abstract setIcon: (icon: string) => void;
    public abstract getColorFore: () => Color;
    public abstract setColorFore: (color: Color) => void;
    public abstract getColorBack: () => Color;
    public abstract setColorBack: (color: Color) => void;

    public getPos = (): Vec2 => {

        return new Vec2(this.worldPos.x, this.worldPos.y);
    }

    public setPos = (pos: Vec2) => {

        // this.prevWorldPos.x = this.worldPos.x;
        // this.prevWorldPos.y = this.worldPos.y;
        this.setOldPos(this.worldPos);
        this.worldPos.x = pos.x;
        this.worldPos.y = pos.y;
    }

    public getOldPos = (): Vec2 => {

        return new Vec2(this.prevWorldPos.x, this.prevWorldPos.y);
    }

    private setOldPos = (pos: Vec2) => {

        this.prevWorldPos.x = pos.x;
        this.prevWorldPos.y = pos.y;
    }
}