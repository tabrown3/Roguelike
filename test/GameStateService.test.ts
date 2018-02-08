import GameStateService from "../src/state/GameStateService";
import GameStateInitializer from "../src/state/GameStateInitializer";
import GameState from "../src/state/GameState";
import IGameStateInjector from "../src/state/IGameStateInjector";
import GameEventHubs from "../src/event/GameEventHubs";
import { KEYS } from "../src/state/StateRegistry";
import { StateType } from "./mock/StateType";
import EventHub from "../src/event/EventHub";

export default (function() {

    describe('GameStateService class', function() {

        let mockState1Symbol: symbol, mockState2Symbol: symbol, mockState3Symbol: symbol;
        let mockState1: GameState, mockState2: GameState, mockState3: GameState;

        let allThreeStates: GameState[];
        let allThreeSymbolTypes: { [key: string]: symbol };

        let noop = (...inputs: any[]): any => { };

        let freeze = function() {
            this.onStateEnter.freeze();
            this.onStateExit.freeze();
            this.onStateArrive.freeze();
            this.onStateDisembark.freeze();
            this.gameEventHubs.freeze();
        };

        let unfreeze = function() {
            this.onStateEnter.unfreeze();
            this.onStateExit.unfreeze();
            this.onStateArrive.unfreeze();
            this.onStateDisembark.unfreeze();
            this.gameEventHubs.unfreeze();
        };

        let gameStateService: GameStateService;

        beforeEach(function () {

            mockState1Symbol = StateType.Root;
            mockState2Symbol = StateType.Navigation;
            mockState3Symbol = StateType.MockState3Symbol;

            mockState1 = {
                stateType: mockState1Symbol,
                gameEventHubs: new GameEventHubs(),
                onStateEnter: new EventHub(),
                onStateExit: new EventHub(),
                onStateArrive: new EventHub(),
                onStateDisembark: new EventHub(),
                setViewHandler: noop,
                getView: noop,
                freeze: freeze,
                unfreeze: unfreeze
            };

            mockState2 = {
                stateType: mockState2Symbol,
                gameEventHubs: new GameEventHubs(),
                onStateEnter: new EventHub(),
                onStateExit: new EventHub(),
                onStateArrive: new EventHub(),
                onStateDisembark: new EventHub(),
                setViewHandler: noop,
                getView: noop,
                freeze: freeze,
                unfreeze: unfreeze
            };

            mockState3 = {
                stateType: mockState3Symbol,
                gameEventHubs: new GameEventHubs(),
                onStateEnter: new EventHub(),
                onStateExit: new EventHub(),
                onStateArrive: new EventHub(),
                onStateDisembark: new EventHub(),
                setViewHandler: noop,
                getView: noop,
                freeze: freeze,
                unfreeze: unfreeze
            };

            mockState2[KEYS.ChildOf] = mockState1.stateType;
            mockState3[KEYS.ChildOf] = mockState1.stateType;

            allThreeStates = [mockState1, mockState2, mockState3];

            for (let oneOfThree of allThreeStates) { // make gameEventHubs for each relayable containers
                oneOfThree[KEYS.RelayableContainer] = ['gameEventHubs'];
            }

            allThreeSymbolTypes = { mockState1Symbol, mockState2Symbol, mockState3Symbol };

            let mockGameStateInjector: IGameStateInjector = {
                stateList: [
                    mockState1,
                    mockState2,
                    mockState3
                ],
                stateType: {
                    Root: mockState1Symbol,
                    Navigation: mockState2Symbol,
                    MockState3Symbol: mockState3Symbol
                },
                getState: null
            };

            mockGameStateInjector.getState = (stateType: symbol): GameState => {

                return mockGameStateInjector.stateList.find(u => u.stateType === stateType);
            };

            gameStateService = new GameStateService(new GameStateInitializer(), mockGameStateInjector);
        });

        describe('init method', function() {

            it('should transition to Navigation state', function(done) {

                gameStateService.init().then(() => {

                    expect(gameStateService.currentState.stateType).toBe(StateType.Navigation);
                    done();
                });
            });
        });

        describe('navPush/navPop methods', function() {

            it('should push designated state onto navStack and navigate to it; should return an object with two promises that resolve after leaving and returning', async function(done) {

                await gameStateService.init();
                expect(gameStateService.currentState.stateType).toBe(StateType.Navigation);

                var promiseDict = gameStateService.navPush(StateType.MockState3Symbol);
                await promiseDict.toPromise;
                expect(gameStateService.currentState.stateType).toBe(StateType.MockState3Symbol);

                await gameStateService.navPop(5);
                let popReturnValue = await promiseDict.fromPromise;
                expect(gameStateService.currentState.stateType).toBe(StateType.Navigation);
                expect(popReturnValue).toBe(5);

                done();
            });

            it('should succeed for multiple navPush/navPop transitions', async function (done) {

                await gameStateService.init();
                expect(gameStateService.currentState.stateType).toBe(StateType.Navigation);

                // first state to push on stack (bottom state)
                var bottomPromiseDict = gameStateService.navPush(StateType.MockState3Symbol);
                await bottomPromiseDict.toPromise;
                expect(gameStateService.currentState.stateType).toBe(StateType.MockState3Symbol);

                // second state to push on stack (top state)
                var topPromiseDict = gameStateService.navPush(StateType.Root);
                await topPromiseDict.toPromise;
                expect(gameStateService.currentState.stateType).toBe(StateType.Root);

                // first state to pop off stack (top state)
                await gameStateService.navPop(20);
                let topPopReturnValue = await topPromiseDict.fromPromise;
                expect(gameStateService.currentState.stateType).toBe(StateType.MockState3Symbol);
                expect(topPopReturnValue).toBe(20);

                // second state to pop off stack (bottom state)
                await gameStateService.navPop(5);
                let bottomPopReturnValue = await bottomPromiseDict.fromPromise;
                expect(gameStateService.currentState.stateType).toBe(StateType.Navigation);
                expect(bottomPopReturnValue).toBe(5);

                done();
            });

            it('should throw exception if calling navPop with no state on stack', async function(done) {

                await gameStateService.init();

                expect(await (async () => {

                    try {
                        await gameStateService.navPop('test string');
                    }
                    finally {
                        done();
                    }
                })()).toThrow(new TypeError('Cannot perform navPop: no state in stack to go back to'));
            });

            it('should reject entire navStack on call to transitionTo', async function (done) {

                await gameStateService.init();

                let promiseDict = gameStateService.navPush(StateType.MockState3Symbol);

                await promiseDict.toPromise;

                promiseDict.fromPromise.catch(() => {

                    // if we get to this point, the 'return promise' was rejected
                    expect(true).toBeTruthy();
                    done();
                });

                gameStateService.transitionTo(StateType.Root);
            });
        });

        describe('Navigation lifecycle events', function() {

            it('should fire 4 lifecycle events in correct order if transitioning from one sibling to another', async function(done) {

                let eventOrder: string[] = [];

                await gameStateService.init();

                mockState2.onStateDisembark.addListener(function*(): IterableIterator<any>{

                    eventOrder.push('Navigation.onStateDisembark');
                }());

                mockState2.onStateExit.addListener(function* (): IterableIterator<any> {

                    eventOrder.push('Navigation.onStateExit');
                }());

                mockState3.onStateEnter.addListener(function* (): IterableIterator<any> {

                    eventOrder.push('MockState3.onStateEnter');
                }());

                mockState3.onStateArrive.addListener(function* (): IterableIterator<any> {

                    eventOrder.push('MockState3.onStateArrive');
                }());

                await gameStateService.transitionTo(mockState3Symbol);

                expect(eventOrder.length).toBe(4);
                expect(eventOrder[0]).toBe('Navigation.onStateDisembark');
                expect(eventOrder[1]).toBe('Navigation.onStateExit');
                expect(eventOrder[2]).toBe('MockState3.onStateEnter');
                expect(eventOrder[3]).toBe('MockState3.onStateArrive');

                done();
            });

            it('should fire 3 lifecycle events in correct order if transitioning from child to parent', async function (done) {

                let eventOrder: string[] = [];

                await gameStateService.init();

                mockState2.onStateDisembark.addListener(function* (): IterableIterator<any> {

                    eventOrder.push('Navigation.onStateDisembark');
                }());

                mockState2.onStateExit.addListener(function* (): IterableIterator<any> {

                    eventOrder.push('Navigation.onStateExit');
                }());

                mockState1.onStateArrive.addListener(function* (): IterableIterator<any> {

                    eventOrder.push('Root.onStateArrive');
                }());

                await gameStateService.transitionTo(mockState1Symbol);

                expect(eventOrder.length).toBe(3);
                expect(eventOrder[0]).toBe('Navigation.onStateDisembark');
                expect(eventOrder[1]).toBe('Navigation.onStateExit');
                expect(eventOrder[2]).toBe('Root.onStateArrive');

                done();
            });

            it('should fire 3 lifecycle events in correct order if transitioning from parent to child', async function (done) {

                let eventOrder: string[] = [];

                await gameStateService.init();

                await gameStateService.transitionTo(mockState1Symbol);

                mockState1.onStateDisembark.addListener(function* (): IterableIterator<any> {

                    eventOrder.push('Root.onStateDisembark');
                }());

                mockState2.onStateEnter.addListener(function* (): IterableIterator<any> {

                    eventOrder.push('Navigation.onStateEnter');
                }());

                mockState2.onStateArrive.addListener(function* (): IterableIterator<any> {

                    eventOrder.push('Navigation.onStateArrive');
                }());

                await gameStateService.transitionTo(mockState2Symbol);

                expect(eventOrder.length).toBe(3);
                expect(eventOrder[0]).toBe('Root.onStateDisembark');
                expect(eventOrder[1]).toBe('Navigation.onStateEnter');
                expect(eventOrder[2]).toBe('Navigation.onStateArrive');

                done();
            });
        });
    });
}());