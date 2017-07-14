import { Vec2 } from './Vec2';

export interface IDrawable {
    getCharMatrix(): string | string[][];
    getAnchorPos(): Vec2;
    getWorldPos(): Vec2;
}