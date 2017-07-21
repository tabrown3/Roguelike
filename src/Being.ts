import Vec2 from './common/Vec2';
import Entity from './Entity';
import Color from './common/Color';

export default class Being extends Entity {
    
    constructor(private _icon:string, private _colorFore: Color, private _colorBack: Color) {
        super();
    }

    public get icon(): string { return this._icon; }
    public set icon(icon: string) { this._icon = icon; }
    public get colorFore() { return this._colorFore; }
    public set colorFore(color: Color) { this._colorFore = color; }
    public get colorBack() { return this._colorBack; }
    public set colorBack(color: Color) { this._colorFore = color; }

    // sets the world pos of the entity offset by the input
    public setPosLocal = (pos: Vec2) => {

        let worldPos = this.getPos();
        this.setPos(new Vec2(worldPos.x + pos.x, worldPos.y + pos.y));
    }

    // returns the world pos of the entity offset by the input
    public getPosLocal = (pos: Vec2): Vec2 => {

        let worldPos = this.getPos();
        return new Vec2(pos.x + worldPos.x, pos.y + worldPos.y);
    }
}