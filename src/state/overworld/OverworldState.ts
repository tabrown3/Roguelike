import GameState from '../GameState';
import IGameEventHandler from '../../event/IGameEventHandler';
import { StateType } from '../StateType';
import GameEventHubs from './../../event/GameEventHubs';
import NavigationState from './NavigationState';
import { inject, injectable } from 'inversify';
import { relayableContainer, childOf } from '../StateRegistry';
import EventHub from './../../event/EventHub';
import BaseState from '../BaseState';

@injectable()
@childOf(StateType.Root)
export default class OverworldState extends BaseState {

    public get stateType(): symbol {

        return StateType.Overworld;
    } 
}