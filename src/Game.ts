import { IWorld } from './IWorld';
import { IViewEngine } from './IViewEngine';
import { injectable, inject } from "inversify";
import { TYPES } from './types';

@injectable()
export class Game {

    constructor(
        @inject(TYPES.World) private world: IWorld,
        @inject(TYPES.ViewEngine) private viewEngine: IViewEngine) {
        
    }

    public start = () => {
        setInterval(() => {
            this.world.update();
            this.viewEngine.renderWorld(this.world);
        }, 200);
    }
}