import IDrawable from '../display/IDrawable';
import Color from '../common/Color';

export default class Terrain implements IDrawable {

    private _icon: string;
    private _colorFore: Color;
    private _colorBack: Color;
    
    constructor(drawable: IDrawable, private _navigable: boolean) {
        this._icon = drawable.icon;
        this._colorFore = drawable.colorFore;
        this._colorBack = drawable.colorBack;
    }

    public get icon() { return this._icon; }

    public get colorFore() { return this._colorFore; }

    public get colorBack() { return this._colorBack; }

    public get navigable() { return this._navigable; }
    public set navigable(inNavigable: boolean) { this._navigable = inNavigable; }
}