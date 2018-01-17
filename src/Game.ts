import { IWorld } from './world/IWorld';
import { IViewEngine } from './display/IViewEngine';
import { injectable, inject } from "inversify";
import { TYPES } from './types';
import IGameStateService from './state/IGameStateService';
import IWorldManager from './world/IWorldManager';
import IPauseManager from './pause/IPauseManager';
import IInitBuildMenuManager from './buildMode/IInitBuildMenuManager';

@injectable()
export class Game {

    constructor(
        @inject(TYPES.World) private world: IWorld,
        @inject(TYPES.ViewEngine) private viewEngine: IViewEngine,
        @inject(TYPES.GameStateService) private gameStateService: IGameStateService,
        @inject(TYPES.PauseManager) private pauseManager: IPauseManager,
        @inject(TYPES.InitBuildMenuManager) private initBuildMenuManager: IInitBuildMenuManager) {
    }

    public start = async () => {
        
        await this.gameStateService.init(); // THIS CALL MUST BE FIRST

        
        this.world.init();
        this.pauseManager.init();
        this.initBuildMenuManager.init();

        // THESE CALLS (below) MUST BE LAST
        let renderLoop = (timeStamp: number) => {
            this.viewEngine.renderWorld(this.gameStateService.currentState.getView());
            window.requestAnimationFrame(renderLoop); // call render loop recursively
        }

        window.requestAnimationFrame(renderLoop); // kick off render loop
    }
}