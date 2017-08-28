import GameEventHubs from './../../event/GameEventHubs';
import GameState from './../GameState';
import { StateType } from './../StateType';
import EventHub from './../../event/EventHub';
import { injectable } from 'inversify';
import { relayable, relayableContainer, childOf } from '../StateRegistry';

@injectable()
@childOf(StateType.Overworld)
export default class NavigationState implements GameState {

    private _gameEventHubs: GameEventHubs = new GameEventHubs();
    private _playerActionHub: EventHub = new EventHub();

    @relayableContainer()
    public get gameEventHubs() {

        return this._gameEventHubs;
    }

    public get stateType(): symbol {

        return StateType.Navigation;
    } 

    public get playerActionHub() {

        return this._playerActionHub;
    }

    public onStateEnter = (args?: any[]) => {

        throw new TypeError('not implemented');
    }

    public onStateLeave = (args?: any[]) => {

        throw new TypeError('not implemented');
    }
}