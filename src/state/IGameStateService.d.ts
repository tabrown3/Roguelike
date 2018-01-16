import GameState from './GameState';

export default interface IGameStateService {
    currentState: GameState;
    init: () => Promise<void>;
    goTo: (stateType: symbol, ...args: any[]) => Promise<void>;
}