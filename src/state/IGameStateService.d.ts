import GameState from './GameState';

export default interface IGameStateService {
    currentState: GameState;
    init: () => Promise<void>;
    navPush: (stateType: symbol, ...args: any[]) => { toPromise: Promise<any>, fromPromise: Promise<any> };
    navPop: (stateType: symbol, ...args: any[]) => Promise<void>;
    transitionTo: (stateType: symbol, ...args: any[]) => Promise<void>;
}