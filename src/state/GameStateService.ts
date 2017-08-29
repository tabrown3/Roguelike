import { injectable, inject } from "inversify";
import { StateType } from './StateType';
import RootState from './RootState';
import OverworldState from './overworld/OverworldState';
import NavigationState from './overworld/NavigationState';
import IGameStateService from './IGameStateService';
import GameState from './GameState';
import { KEYS } from './StateRegistry';
import EventHub from './../event/EventHub';
import { TYPES } from '../types';
import IGameStateInitializer from './IGameStateInitializer';
import PauseState from './overworld/PauseState';
import Graph from './../common/Graph';

@injectable()
export default class GameStateService implements IGameStateService {

    private readonly MAX_NAV_STACK_SIZE = 10;

    private readonly stateList: GameState[] = [
        this.rootState,
        this.overworldState,
        this.navigationState,
        this.pauseState
    ];

    private readonly stateGraph: Graph<GameState>;

    private _navStack: GameState[] = [];
    private get navStack() {

        return this._navStack;
    }

    public get currentState() {

        let lastIndex = this.navStack.length - 1;
        
        return (lastIndex >= 0) ? this.navStack[lastIndex] : null;
    }

    public set currentState(inState: GameState) {

        this.navStack.push(inState);
        
        while(this.navStack.length > this.MAX_NAV_STACK_SIZE) {
            this.navStack.shift();
        }
    }

    constructor(
        @inject(TYPES.GameStateInitializer) private initializer: IGameStateInitializer,
        @inject(StateType.Root) private rootState: RootState,
        @inject(StateType.Overworld) private overworldState: OverworldState,
        @inject(StateType.Navigation) private navigationState: NavigationState,
        @inject(StateType.Pause) private pauseState: PauseState
    ) {

        // verify all states in StateType are being injected (and only once)
        this.initializer.verifyStates(this.stateList, StateType);
        // relay events that have relay decorator
        this.initializer.autoRelay(this.stateList);
        this.stateGraph = this.initializer.buildStateGraph(this.stateList, StateType);
    }

    public init = () => {

    }

    public goTo = (stateType: symbol, ...args: any[]) => {

        if(!stateType || (typeof stateType !== 'symbol')) {

            throw new TypeError('stateType must be of type \'symbol\'');
        }

        let targetState = this.stateList.find(u => u.stateType === stateType);
        if(!targetState) {
            throw new TypeError(`Could not transition to state with symbol-type ${stateType.toString()}: no state with symbol-type ${stateType.toString()} found`);
        }

        // TODO: traverse parent state tree and find first divergence;
        //  only freeze old states from divergence down, and only unfreeze
        //  new states from divergence down; fire off all 'onStateLeave/Enter' events
        Promise.resolve().then(() => {

            this.currentState.onStateLeave.publishEvent();
            this.currentState = targetState;
            this.currentState.onStateEnter.publishEvent(args);
        });
    }
}