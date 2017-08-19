import GameState from '../GameState';
import IGameEventHandler from '../../event/IGameEventHandler';
import { StateType } from '../StateType';
import GameEventHubs from './../../event/GameEventHubs';
import NavigationState from './NavigationState';
import { inject, injectable } from 'inversify';

@injectable()
export default class OverworldState implements GameState {

    private _gameEventHubs: GameEventHubs = new GameEventHubs();
    private currentSubState: GameState = this.navigationState;

    constructor(
        @inject(StateType.Navigation) public navigationState: NavigationState) {

        this.gameEventHubs.keyDownHub.relay(this.getCurrentSubState().gameEventHubs.keyDownHub);

        this.gameEventHubs.worldTickHub.relay(this.getCurrentSubState().gameEventHubs.worldTickHub);
    }

    public get stateType(): symbol {

        return StateType.Overworld;
    } 

    public get gameEventHubs() {

        return this._gameEventHubs;
    }

    public getCurrentSubState = (): GameState => {

        return this.currentSubState;
    }

    public getCurrentSubStateType = (): symbol => {

        return this.currentSubState.stateType;
    }
}