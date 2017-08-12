import IGameStateManager from './IGameStateManager';
import OverworldState from './overworld/OverworldState';
import GameState from './GameState';
import { injectable } from "inversify";
import { EventHandler } from './../event/EventHandler';
import { StateType } from './StateType';

@injectable()
export default class GameStateManager implements IGameStateManager {

    public readonly overworld: OverworldState;

    constructor() {
        this.overworld = new OverworldState(new EventHandler()); //TODO: use DI or factory somehow
    }

    private currentState: GameState;

    public getCurrentState = (): GameState => {

        return this.currentState;
    }

    public getCurrentStateType = (): StateType => {

        return this.currentState.stateType;
    }

    public transitionTo = (state: StateType) => {

    }
}