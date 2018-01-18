import { IWorld } from './world/IWorld';
import { IViewEngine } from './display/IViewEngine';
import { injectable, inject } from "inversify";
import { TYPES } from './types';
import IGameStateService from './state/IGameStateService';
import IWorldManager from './world/IWorldManager';
import IPauseManager from './pause/IPauseManager';
import IInitBuildMenuManager from './buildMode/IInitBuildMenuManager';
import ILoadBuildLevelManager from './buildMode/ILoadBuildLevelManager';

@injectable()
export class Game {

    constructor(
        @inject(TYPES.World) private world: IWorld,
        @inject(TYPES.ViewEngine) private viewEngine: IViewEngine,
        @inject(TYPES.GameStateService) private gameStateService: IGameStateService,
        @inject(TYPES.PauseManager) private pauseManager: IPauseManager,
        @inject(TYPES.InitBuildMenuManager) private initBuildMenuManager: IInitBuildMenuManager,
        @inject(TYPES.LoadBuildLevelManager) private loadBuildLevelManager: ILoadBuildLevelManager) {
    }

    public start = async () => {
        
        await this.gameStateService.init(); // THIS CALL MUST BE FIRST

        /* Overworld */
        this.world.init();
        this.pauseManager.init();
        /* Build Mode */
        this.initBuildMenuManager.init();
        this.loadBuildLevelManager.init();

        // THESE CALLS (below) MUST BE LAST
        let renderLoop = (timeStamp: number) => {
            this.viewEngine.renderWorld(this.gameStateService.currentState.getView());
            window.requestAnimationFrame(renderLoop); // call render loop recursively
        }

        window.requestAnimationFrame(renderLoop); // kick off render loop
    }
}