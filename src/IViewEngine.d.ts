import { IWorld } from './IWorld';

export interface IViewEngine {

    renderWorld(world: IWorld): void;
}