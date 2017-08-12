import IEventHandler from '../event/IEventHandler';
import { StateType } from './StateType';

export default interface GameState {

    eventHandler: IEventHandler;
    stateType: StateType;
}