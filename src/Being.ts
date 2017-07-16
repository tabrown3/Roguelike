import Vec2 from './Vec2';
import Entity from './Entity';
import Color from './Color';

export default class Being extends Entity {
    
    constructor(private icon:string, private colorFore: Color, private colorBack: Color) {
        super();
    }

    public getIcon = (): string => this.icon;
    public setIcon = (icon: string) => this.icon = icon;
    public getColorFore = () => this.colorFore;
    public setColorFore = (color: Color) => this.colorFore = color;
    public getColorBack = () => this.colorBack;
    public setColorBack = (color: Color) => this.colorFore = color;

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