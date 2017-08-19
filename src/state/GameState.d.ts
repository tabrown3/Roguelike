import IGameEventHandler from '../event/IGameEventHandler';
import GameEventHubs from '../event/GameEventHubs'

export default interface GameState {

    stateType: symbol;
    gameEventHubs: GameEventHubs;
}