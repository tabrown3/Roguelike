import GameState from './GameState';
import Graph from './../common/Graph';

export default interface IGameStateInitializer {
    autoRelay: (states: GameState[]) => void;
    verifyStates: (states: GameState[], stateType: { [key: string]: symbol }) => void;
    buildStateGraph: (inStateList: GameState[], stateType: { [key: string]: symbol }) => Graph<GameState>
}