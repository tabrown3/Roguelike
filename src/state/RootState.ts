import OverworldState from './overworld/OverworldState';
import GameState from './GameState';
import { injectable, inject } from "inversify";
import { GameEventHandler } from './../event/GameEventHandler';
import { TYPES } from './../types';
import { StateType } from './StateType';
import GameEventHubs from './../event/GameEventHubs';


@injectable()
export default class RootState implements GameState {

    //private _gameEventHubs: GameEventHubs = new GameEventHubs();

    public get gameEventHubs() {

        return this.gameEventHandler.gameEventHubs;
    }

    private currentState: GameState = this.overworldState;

    constructor(
        @inject(TYPES.GameEventHandler) private gameEventHandler: GameEventHandler,
        @inject(StateType.Overworld) public overworldState: OverworldState) {

        // fire children events when parent events fire
        this.gameEventHubs.keyDownHub.relay(this.getCurrentState().gameEventHubs.keyDownHub);

        this.gameEventHubs.worldTickHub.relay(this.getCurrentState().gameEventHubs.worldTickHub);
    }

    public getCurrentState = (): GameState => {

        return this.currentState;
    }

    public getCurrentStateType = (): symbol => {

        return this.currentState.stateType;
    }

    public get stateType(): symbol {

        return StateType.Root;
    } 
}