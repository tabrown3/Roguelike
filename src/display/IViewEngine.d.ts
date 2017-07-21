import { IWorld } from '../world/IWorld';

export interface IViewEngine {

    renderWorld(world: IWorld): void;
}