import GameState from './../GameState';
import { inject, injectable } from 'inversify';
import { relayableContainer, childOf } from './../StateRegistry';
import { StateType } from './../StateType';
import GameEventHubs from './../../event/GameEventHubs';
import EventHub from './../../event/EventHub';
import BaseState from '../BaseState';

@injectable()
@childOf(StateType.Overworld)
export default class PauseState extends BaseState {

    public get stateType(): symbol {

        return StateType.Pause;
    }
}