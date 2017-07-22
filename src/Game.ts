import { IWorld } from './world/IWorld';
import { IViewEngine } from './display/IViewEngine';
import { injectable, inject } from "inversify";
import { TYPES } from './types';

@injectable()
export class Game {

    constructor(
        @inject(TYPES.World) private world: IWorld,
        @inject(TYPES.ViewEngine) private viewEngine: IViewEngine) {
    }

    public start = () => {
        // setInterval(() => {
        //     this.world.update();
        // }, 200);

        let renderLoop = (timeStamp: number) => {
            this.viewEngine.renderWorld(this.world);
            window.requestAnimationFrame(renderLoop); // call render loop recursively
        }

        window.requestAnimationFrame(renderLoop); // kick off render loop
    }
}