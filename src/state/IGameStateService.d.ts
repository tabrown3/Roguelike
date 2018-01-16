import GameState from './GameState';

export default interface IGameStateService {
    currentState: GameState;
    init: () => void;
    goTo: (stateType: symbol, ...args: any[]) => Promise<void>;
}