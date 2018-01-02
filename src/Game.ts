import { IWorld } from './world/IWorld';
import { IViewEngine } from './display/IViewEngine';
import { injectable, inject } from "inversify";
import { TYPES } from './types';
import IGameStateService from './state/IGameStateService';

@injectable()
export class Game {

    constructor(
        @inject(TYPES.World) private world: IWorld,
        @inject(TYPES.ViewEngine) private viewEngine: IViewEngine,
        @inject(TYPES.GameStateService) private gameStateService: IGameStateService) {
    }

    public start = () => {
        
        let renderLoop = (timeStamp: number) => {
            //this.viewEngine.renderWorld(this.world.getView());
            this.viewEngine.renderWorld(this.gameStateService.currentState.getView());
            window.requestAnimationFrame(renderLoop); // call render loop recursively
        }

        window.requestAnimationFrame(renderLoop); // kick off render loop

        this.gameStateService.init();
    }
}