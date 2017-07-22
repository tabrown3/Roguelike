import IDrawable from '../display/IDrawable';

export interface IWorld {
    getView(): IDrawable[][];
}