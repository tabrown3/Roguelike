import IGameStateManager from './IGameStateManager';
import OverworldState from './overworld/OverworldState';
import GameState from './GameState';
import { injectable, inject } from "inversify";
import { GameEventHandler } from './../event/GameEventHandler';
import { StateType } from './StateType';
import { TYPES } from '../types';

@injectable()
export default class GameStateManager implements IGameStateManager {

    public readonly overworld: OverworldState = new OverworldState(); //TODO: use DI or factory somehow;

    private currentState: GameState = this.overworld;

    constructor(
        @inject(TYPES.GameEventHandler) private gameEventHandler: GameEventHandler) {

        let _this = this;

        var bob1: IterableIterator<void> = (function* (): IterableIterator<void> {

            while (true)
                _this.getCurrentState().gameEventHubs.keyDownHub.publishEvent(yield);
        }());

        var bob2: IterableIterator<void> = (function* (): IterableIterator<void> {

            while (true)
                _this.getCurrentState().gameEventHubs.worldTickHub.publishEvent(yield);
        }());

        bob1.next();
        this.gameEventHandler.gameEventHubs.keyDownHub.addListener(bob1);
        bob2.next();
        this.gameEventHandler.gameEventHubs.worldTickHub.addListener(bob2);
    }

    public getCurrentState = (): GameState => {

        return this.currentState;
    }

    public getCurrentStateType = (): StateType => {

        return this.currentState.stateType;
    }

    public transitionTo = (state: StateType) => {

    }
}