import GameState from './GameState';

export default interface IGameStateInitializer {
    autoRelay: (states: GameState[]) => void;
    verifyStates: (states: GameState[], stateType: { [key: string]: symbol }) => void;
}