import GameState, { ViewHandler } from './GameState';
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
    private _viewHandler: ViewHandler

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

    public setViewHandler = (handler: ViewHandler) => {

        if(this._viewHandler) { // if trying to set for a second time

            throw new TypeError(`A view handler has already been set for state of state-type ${this.stateType.toString()}; view handler can only be set once and cannot be overridden`);
        }
        else {

            this._viewHandler = handler;
        }
    }

    public getView = () => {

        if(!this._viewHandler) {

            throw new TypeError(`No view handler set for state of state-type ${this.stateType.toString()}`);
        }

        return this._viewHandler(); // executes the bound view handler and returns current state's view
    }
}