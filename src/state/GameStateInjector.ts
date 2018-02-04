import { injectable, inject } from "inversify";
import IGameStateInjector from "./IGameStateInjector";
import { StateType } from "./StateType";
import RootState from "./RootState";
import OverworldState from "./overworld/OverworldState";
import NavigationState from "./overworld/NavigationState";
import PauseState from "./overworld/PauseState";
import BuildModeState from "./buildMode/BuildModeState";
import MapEditorState from "./buildMode/MapEditorState";
import InitBuildMenuState from "./buildMode/InitBuildMenuState";
import LoadBuildLevelState from "./buildMode/LoadBuildLevelState";
import GameState from "./GameState";


@injectable()
export default class GameStateInjector implements IGameStateInjector {

    public readonly stateList: GameState[];

    // Any state added to the game needs to go here
    constructor(
        @inject(StateType.Root) private rootState: RootState,
        @inject(StateType.Overworld) private overworldState: OverworldState,
        @inject(StateType.Navigation) private navigationState: NavigationState,
        @inject(StateType.Pause) private pauseState: PauseState,
        @inject(StateType.BuildMode) private buildModeState: BuildModeState,
        @inject(StateType.MapEditor) private mapEditorState: MapEditorState,
        @inject(StateType.InitBuildMenu) private initBuildMenuState: InitBuildMenuState,
        @inject(StateType.LoadBuildLevel) private loadBuildLevelState: LoadBuildLevelState) {

        this.stateList = [
            this.rootState,
            this.overworldState,
            this.navigationState,
            this.pauseState,
            this.buildModeState,
            this.mapEditorState,
            this.initBuildMenuState,
            this.loadBuildLevelState
        ];
    }

    public getState = (stateType: symbol): GameState => {

        return this.stateList.find(u => u.stateType === stateType);
    }
}