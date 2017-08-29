import IGameEventHandler from '../event/IGameEventHandler';
import GameEventHubs from '../event/GameEventHubs'
import EventHub from '../event/EventHub';

export default interface GameState {

    stateType: symbol;
    gameEventHubs: GameEventHubs;
    onStateEnter: EventHub;
    onStateLeave: EventHub;
    freeze: () => void;
    unfreeze: () => void;
}