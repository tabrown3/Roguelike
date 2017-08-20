import GameState from '../GameState';
import IGameEventHandler from '../../event/IGameEventHandler';
import { StateType } from '../StateType';
import GameEventHubs from './../../event/GameEventHubs';
import NavigationState from './NavigationState';
import { inject, injectable } from 'inversify';
import { relayableContainer, childOf } from '../StateRegistry';

@injectable()
@childOf(StateType.Root)
export default class OverworldState implements GameState {

    private _gameEventHubs: GameEventHubs = new GameEventHubs();
    private currentState: GameState = this.navigationState;

    constructor(
        @inject(StateType.Navigation) public navigationState: NavigationState) {
            
    }

    public get stateType(): symbol {

        return StateType.Overworld;
    } 

    @relayableContainer()
    public get gameEventHubs() {

        return this._gameEventHubs;
    }

    public getCurrentState = (): GameState => {

        return this.currentState;
    }

    public getCurrentStateType = (): symbol => {

        return this.currentState.stateType;
    }
}