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

    private transitionPending: boolean = false;

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

        if(this.transitionPending) {
            console.error(`Cannot transition to state with symbol-type ${stateType.toString()}: transition in progress`);
            return;
        }

        if(!stateType || (typeof stateType !== 'symbol')) {

            throw new TypeError('stateType must be of type \'symbol\'');
        }

        let targetState = this.stateList.find(u => u.stateType === stateType);
        if(!targetState) {

            throw new TypeError(`Could not transition to state with symbol-type ${stateType.toString()}: no state with symbol-type ${stateType.toString()} found`);
        }

        if(stateType === this.currentState.stateType) {
            
            throw new TypeError(`Could not transition to state with symbol-type ${stateType.toString()}: already on state w/ symbol-type ${stateType.toString()}`)
        }

        this.transitionPending = true;
        Promise.resolve().then(() => {

            let fromStateGraph: Graph<GameState> = this.stateGraph.sibling();
            let fromState = fromStateGraph.moveByIndex(this.currentState.stateType);
            let fromStateStack = this.constructStateStack(fromStateGraph);

            let toStateGraph: Graph<GameState> = this.stateGraph.sibling();
            let toState = toStateGraph.moveByIndex(targetState.stateType);
            let toStateStack = this.constructStateStack(toStateGraph);

            let fromTopState = fromStateStack[fromStateStack.length - 1];
            let toTopState = toStateStack[toStateStack.length - 1];

            if(fromTopState !== toTopState) {

                throw new TypeError('State stacks do not share a root state');
            }

            // while there are at least 2 in each and the top state is the same
            while (fromStateStack.length > 1 && toStateStack.length > 1 && (fromTopState === toTopState)) {

                fromStateStack.pop();
                toStateStack.pop();
                fromTopState = fromStateStack[fromStateStack.length - 1];
                toTopState = toStateStack[toStateStack.length - 1];
            }

            let leaveStateStack: GameState[] = [...fromStateStack];
            let enterStateStack: GameState[] = [...toStateStack];

            /** There are two special cases we are accounting for below: what if we're going from a child straight up to a parent, or parent straight down to a child? */
            if (fromTopState === toTopState) { // if this is true, the two stacks haven't diverged

                if (fromStateStack.length === 1) { // straight down; only entering

                    enterStateStack.pop(); // because the top state is the state we're on; don't need to enter
                }
                else if (toStateStack.length === 1) { // straight up; only leaving

                    leaveStateStack.pop(); // because the top state is the state we're going to; don't need to leave
                }
                else {

                    throw new TypeError('something went real wrong; if the topStates are the same, one of the stacks should have only one element');
                }
            }
            

            this.fireLifecycleEvents(fromState, toState, leaveStateStack, enterStateStack, args);

            this.transitionPending = false;
        });
    }

    private constructStateStack = (stateGraph: Graph<GameState>): GameState[] => {

        let outStack: GameState[] = [];
        outStack.push(stateGraph.currentData); // add initial state to stack

        // iterate through parents (if applicable) and add them
        while (stateGraph.currentHasParent()) { 

            stateGraph.moveToParent();
            outStack.push(stateGraph.currentData);
        }

        return outStack;
    }

    private fireLifecycleEvents = (fromState: GameState, toState: GameState, leaveStates: GameState[], enterStates: GameState[], args: any[]) => {

        fromState.onStateDisembark.publishEventSync();

        this.leaveAndFreeze(leaveStates);
        this.enterAndUnfreeze(enterStates);

        this.currentState = toState;

        toState.onStateArrive.publishEventSync(...args);
    }

    private leaveAndFreeze = (states: GameState[]) => {

        for(let i = 0; i < states.length; i++) {

            let state = states[i];
            state.onStateExit.publishEventSync();
            state.freeze();
        }
    }

    private enterAndUnfreeze = (states: GameState[]) => {

        for(let i = states.length - 1; i >= 0; i--) {

            let state = states[i];
            state.unfreeze();
            state.onStateEnter.publishEventSync();
        }
    }
}