import GameEventHubs from './../../event/GameEventHubs';
import GameState from '../GameState';
import { StateType } from '../StateType';
import EventHub from './../../event/EventHub';

export default class NavigationSubState implements GameState {

    private _gameEventHubs: GameEventHubs = new GameEventHubs();
    private _playerActionHub: EventHub = new EventHub();

    public get gameEventHubs() {

        return this._gameEventHubs;
    }

    public get stateType(): StateType {

        return StateType.OverworldNavigation;
    } 

    public get playerActionHub() {

        return this._playerActionHub;
    }
}