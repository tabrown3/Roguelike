import { injectable, inject } from "inversify";
import { StateType } from './StateType';
import IGameStateService from './IGameStateService';
import GameState from './GameState';
import { TYPES } from '../types';
import IGameStateInitializer from './IGameStateInitializer';
import Graph from './../common/Graph';
import IGameStateInjector from "./IGameStateInjector";

@injectable()
export default class GameStateService implements IGameStateService {

    private transitionPending: boolean = false;

    private readonly stateGraph: Graph<GameState>;

    private _transitionHistory: GameState[] = [];
    private get transitionHistory() {

        return this._transitionHistory;
    }

    private _navStack: NavStackEntry[] = [];
    private get navStack() {

        return this._navStack;
    }

    private _currentState: GameState = null;
    public get currentState() {

        return this._currentState;
    }

    public set currentState(inState: GameState) {

        this._currentState = inState;
    }

    constructor(
        @inject(TYPES.GameStateInitializer) private initializer: IGameStateInitializer,
        @inject(TYPES.GameStateInjector) private stateInjector: IGameStateInjector
    ) {

        // verify all states in StateType are being injected (and only once)
        this.initializer.verifyStates(this.stateInjector.stateList, StateType);
        // relay events that have relay decorator
        this.initializer.autoRelay(this.stateInjector.stateList);
        this.stateGraph = this.initializer.buildStateGraph(this.stateInjector.stateList, StateType);
    }

    public init = async () => {

        this.currentState = this.stateInjector.getState(StateType.Root);

        let myGraph = this.stateGraph.sibling()
        myGraph.moveByIndex(this.currentState.stateType);

        // all states start frozen; need to unfreeze current state
        myGraph.currentData.unfreeze();

        await this.transitionTo(StateType.Navigation);
    }

    public navPush = async (stateType: symbol, ...args: any[]) => {

        // Because there's no more deferred API, we basically have to capture a resolve/reject CB from the promise
        let resolveRejectCb: (shouldResolve: boolean, resolveVal: any) => void;

        const outPromise: Promise<any> = new Promise((res, rej) => {
            
            resolveRejectCb = (shouldResolve: boolean, resolveVal: any) => {

                if(shouldResolve) {
                    res(resolveVal);
                }
                else {
                    rej();
                }
            };
        });

        this.goTo(stateType, currentState => {

            this.navStack.push({
                state: currentState,
                deferred: resolveRejectCb
            });
        }, args);

        return outPromise;
    }

    public navPop = async (...args: any[]) => {

        const navStackLength = this.navStack.length;

        if(!(navStackLength > 1)) {

            throw new TypeError('Cannot perform navPop: no state in stack to go back to');
        }

        let oldNavEntry = this.navStack.pop();
        await this.goTo(this.navStack[navStackLength - 1].state.stateType, null, args);

        oldNavEntry.deferred(true, args);
    }

    public transitionTo = async (stateType: symbol, ...args: any[]) => {

        while(this.navStack.length > 0) // clear out navStack before transition
            this.navStack.pop();

        await this.goTo(stateType, currentState => { 

            this.transitionHistory.push(currentState);
            this.navStack.push({
                state: currentState,
                deferred: null
            });
         }, args);
    }

    private goTo = async (stateType: symbol, manageHistory: (currentState: GameState) => void, args: any[]) => {

        if(this.transitionPending) {
            console.error(`Cannot transition to state with symbol-type ${stateType.toString()}: transition in progress`);
            return;
        }

        if(!stateType || (typeof stateType !== 'symbol')) {

            throw new TypeError('stateType must be of type \'symbol\'');
        }

        let targetState = this.stateInjector.getState(stateType);
        if(!targetState) {

            throw new TypeError(`Could not transition to state with symbol-type ${stateType.toString()}: no state with symbol-type ${stateType.toString()} found`);
        }

        if(stateType === this.currentState.stateType) {
            
            throw new TypeError(`Could not transition to state with symbol-type ${stateType.toString()}: already on state w/ symbol-type ${stateType.toString()}`)
        }

        this.transitionPending = true;
        return Promise.resolve().then(() => {

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
            
                if (fromStateStack.length === 1 || toStateStack.length === 1) { // straight down; only entering

                    enterStateStack.pop(); // because the top state is the state we're on; don't need to enter

                    leaveStateStack.pop(); // because the top state is the state we're going to; don't need to leave
                }
                else {

                    throw new TypeError('something went real wrong; if the topStates are the same, one of the stacks should have only one element');
                }
            }
            

            return this.fireLifecycleEvents(fromState, toState, leaveStateStack, enterStateStack, manageHistory, args);

        }).then(() => {

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

    private fireLifecycleEvents = async (fromState: GameState, toState: GameState, leaveStates: GameState[], enterStates: GameState[], manageHistory: (currentState: GameState) => void, args: any[]) => {

        await fromState.onStateDisembark.publishEvent();

        await this.leaveAndFreeze(leaveStates);
        await this.enterAndUnfreeze(enterStates);

        this.currentState = toState;

        if (manageHistory) { // add state to respective stack unless it was a 'pop'

            manageHistory(this.currentState);
        }

        await toState.onStateArrive.publishEvent(...args);
    }

    private leaveAndFreeze = async (states: GameState[]) => {

        for(let i = 0; i < states.length; i++) {

            let state = states[i];
            await state.onStateExit.publishEvent();
            state.freeze();
        }
    }

    private enterAndUnfreeze = async (states: GameState[]) => {

        for(let i = states.length - 1; i >= 0; i--) {

            let state = states[i];
            state.unfreeze();
            await state.onStateEnter.publishEvent();
        }
    }
}

// promise resolves when state is popped off nav stack or rejected in event of transition
interface NavStackEntry {
    state: GameState;
    deferred: (shouldResolve: boolean, resolveVal: any) => void;
}