import GameState from "./GameState";


export default interface IGameStateInjector {

    stateList: GameState[];
    stateType: { [k: string]: symbol };
    getState: (stateType: symbol) => GameState;
}