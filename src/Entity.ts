import Vec2 from './common/Vec2';
import Color from './common/Color';
import IDrawable from './display/IDrawable';

export default abstract class Entity implements IDrawable {
    
    private readonly worldPos: Vec2 = new Vec2(0, 0);
    private readonly prevWorldPos: Vec2 = new Vec2(0, 0);

    public abstract get icon(): string;
    public abstract set icon(icon: string);
    public abstract get colorFore(): Color;
    public abstract set colorFore(color: Color);
    public abstract set colorBack(color: Color);
    public abstract get colorBack(): Color;

    public getPos = (): Vec2 => {

        return new Vec2(this.worldPos.x, this.worldPos.y);
    }

    public setPos = (pos: Vec2) => {

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