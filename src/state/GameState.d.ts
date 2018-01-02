import IGameEventHandler from '../event/IGameEventHandler';
import GameEventHubs from '../event/GameEventHubs'
import EventHub from '../event/EventHub';
import IDrawable from './../display/IDrawable';

export default interface GameState {

    stateType: symbol;
    gameEventHubs: GameEventHubs;
    onStateEnter: EventHub;
    onStateExit: EventHub;
    onStateDisembark: EventHub;
    onStateArrive: EventHub;
    freeze: () => void;
    unfreeze: () => void;
    setViewHandler: (handler: ViewHandler) => void;
    getView: () => IDrawable[][];
}

type ViewHandler = () => IDrawable[][];