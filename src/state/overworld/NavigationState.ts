import GameEventHubs from './../../event/GameEventHubs';
import GameState from './../GameState';
import { StateType } from './../StateType';
import EventHub from './../../event/EventHub';
import { injectable } from 'inversify';

@injectable()
export default class NavigationState implements GameState {

    private _gameEventHubs: GameEventHubs = new GameEventHubs();
    private _playerActionHub: EventHub = new EventHub();

    constructor() {
        this.gameEventHubs.keyDownHub.addListener(function*(): IterableIterator<void> {
            while(true)
                console.log(yield);
        }());
    }

    public get gameEventHubs() {

        return this._gameEventHubs;
    }

    public get stateType(): symbol {

        return StateType.Navigation;
    } 

    public get playerActionHub() {

        return this._playerActionHub;
    }
}