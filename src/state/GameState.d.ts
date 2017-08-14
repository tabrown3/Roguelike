import IGameEventHandler from '../event/IGameEventHandler';
import { StateType } from './StateType';
import GameEventHubs from '../event/GameEventHubs'

export default interface GameState {

    stateType: StateType;
    gameEventHubs: GameEventHubs;
}