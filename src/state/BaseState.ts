import GameState from './GameState';
import { relayableContainer, childOf } from './StateRegistry';
import { StateType } from './StateType';
import GameEventHubs from './../event/GameEventHubs';
import EventHub from './../event/EventHub';
import { injectable } from "inversify";

@injectable()
export default abstract class BaseState implements GameState {

    private _gameEventHubs: GameEventHubs = new GameEventHubs();
    private _onStateEnter: EventHub = new EventHub();
    private _onStateLeave: EventHub = new EventHub();

    public abstract get stateType(): symbol;

    @relayableContainer()
    public get gameEventHubs() {

        return this._gameEventHubs;
    }

    public get onStateEnter() {

        return this._onStateEnter;
    }

    public get onStateLeave() {

        return this._onStateLeave;
    }

    public freeze = (): void => {

        this.gameEventHubs.freeze();
        this.onStateEnter.freeze();
        this.onStateLeave.freeze();
    }

    public unfreeze = (): void => {

        this.gameEventHubs.unfreeze();
        this.onStateEnter.unfreeze();
        this.onStateLeave.unfreeze();
    }
}