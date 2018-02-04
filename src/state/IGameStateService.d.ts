import GameState from './GameState';

export default interface IGameStateService {
    currentState: GameState;
    init: () => Promise<void>;
    navPush: (stateType: symbol, ...args: any[]) => Promise<void>;
    navPop: (stateType: symbol, ...args: any[]) => Promise<void>;
    transitionTo: (stateType: symbol, ...args: any[]) => Promise<void>;
}