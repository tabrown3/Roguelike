import GameState from './../GameState';
import { inject, injectable } from 'inversify';
import { relayableContainer, childOf } from './../StateRegistry';
import { StateType } from './../StateType';
import GameEventHubs from './../../event/GameEventHubs';

@injectable()
@childOf(StateType.Overworld)
export default class PauseState implements GameState {

    private _gameEventHubs: GameEventHubs = new GameEventHubs();

    public get stateType(): symbol {

        return StateType.Pause;
    }

    @relayableContainer()
    public get gameEventHubs() {

        return this._gameEventHubs;
    }

    public onStateEnter = (args: any[]) => {

        throw new TypeError('not implemented');
    }

    public onStateLeave = (args: any[]) => {

        throw new TypeError('not implemented');
    }
}