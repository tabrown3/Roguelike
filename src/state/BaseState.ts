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
    private _onStateExit: EventHub = new EventHub();
    private _onStateArrive: EventHub = new EventHub();
    private _onStateDisembark: EventHub = new EventHub();

    public abstract get stateType(): symbol;

    @relayableContainer()
    public get gameEventHubs() {

        return this._gameEventHubs;
    }

    public get onStateEnter() {

        return this._onStateEnter;
    }

    public get onStateExit() {

        return this._onStateExit;
    }

    public get onStateArrive() {

        return this._onStateArrive;
    }

    public get onStateDisembark() {

        return this._onStateDisembark;
    }

    public freeze = (): void => {

        this.gameEventHubs.freeze();
        this.onStateEnter.freeze();
        this.onStateExit.freeze();
    }

    public unfreeze = (): void => {

        this.gameEventHubs.unfreeze();
        this.onStateEnter.unfreeze();
        this.onStateExit.unfreeze();
    }
}