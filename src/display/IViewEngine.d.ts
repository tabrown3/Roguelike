import { IWorld } from '../world/IWorld';
import IDrawable from './IDrawable';

export interface IViewEngine {

    renderWorld(map: IDrawable[][]): void;
}