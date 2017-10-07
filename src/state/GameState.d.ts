import IGameEventHandler from '../event/IGameEventHandler';
import GameEventHubs from '../event/GameEventHubs'
import EventHub from '../event/EventHub';

export default interface GameState {

    stateType: symbol;
    gameEventHubs: GameEventHubs;
    onStateEnter: EventHub;
    onStateExit: EventHub;
    onStateDisembark: EventHub;
    onStateArrive: EventHub;
    freeze: () => void;
    unfreeze: () => void;
}