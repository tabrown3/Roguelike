import GameState from "./GameState";


export default interface IGameStateInjector {

    stateList: GameState[];
    getState: (stateType: symbol) => GameState;
}