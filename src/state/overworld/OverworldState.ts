import GameState from '../GameState';
import IEventHandler from '../../event/IEventHandler';
import { StateType } from '../StateType';

export default class OverworldState implements GameState {

    public get stateType(): StateType {

        return StateType.Overworld;
    } 

    constructor(public eventHandler: IEventHandler) {

    }
}