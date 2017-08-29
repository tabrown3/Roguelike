import GameEventHubs from './../../event/GameEventHubs';
import GameState from './../GameState';
import { StateType } from './../StateType';
import EventHub from './../../event/EventHub';
import { injectable } from 'inversify';
import { relayable, relayableContainer, childOf } from '../StateRegistry';
import BaseState from '../BaseState';

@injectable()
@childOf(StateType.Overworld)
export default class NavigationState extends BaseState {

    private _playerActionHub: EventHub = new EventHub();

    public get stateType(): symbol {

        return StateType.Navigation;
    } 

    public get playerActionHub() {

        return this._playerActionHub;
    }

    public freeze = (): void => {

        super.freeze();
        this.playerActionHub.freeze();
    }

    public unfreeze = (): void => {

        super.unfreeze();
        this.playerActionHub.unfreeze();
    }
}