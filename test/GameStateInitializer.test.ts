import GameStateInitializer from './../src/state/GameStateInitializer';
import GameState from './../src/state/GameState';
import GameEventHubs from './../src/event/GameEventHubs';
import { KEYS } from './../src/state/StateRegistry';

export default (function(){

    describe('GameStateInitializer class', function(){

        let gameStateInitializer: GameStateInitializer = new GameStateInitializer();

        let mockState1Symbol: symbol, mockState2Symbol: symbol, mockState3Symbol: symbol;
        let mockState1: GameState, mockState2: GameState, mockState3: GameState;

        let allThreeStates: GameState[];
        let allThreeSymbolTypes: { [key: string]: symbol };

        let noop = () => {};

        beforeEach(function () {

            mockState1Symbol = Symbol('mockState1Symbol');
            mockState2Symbol = Symbol('mockState2Symbol');
            mockState3Symbol = Symbol('mockState3Symbol');

            mockState1 = {
                stateType: mockState1Symbol,
                gameEventHubs: new GameEventHubs(),
                onStateEnter: null,
                onStateLeave: null,
                freeze: noop,
                unfreeze: noop
            };

            mockState2 = {
                stateType: mockState2Symbol,
                gameEventHubs: new GameEventHubs(),
                onStateEnter: null,
                onStateLeave: null,
                freeze: noop,
                unfreeze: noop
            };

            mockState3 = {
                stateType: mockState3Symbol,
                gameEventHubs: new GameEventHubs(),
                onStateEnter: null,
                onStateLeave: null,
                freeze: noop,
                unfreeze: noop
            };

            allThreeStates = [mockState1, mockState2, mockState3];

            for(let oneOfThree of allThreeStates) { // make gameEventHubs for each relayable containers
                oneOfThree[KEYS.RelayableContainer] = ['gameEventHubs'];
            }

            allThreeSymbolTypes = { mockState1Symbol, mockState2Symbol, mockState3Symbol };
        });

        describe('verifyStates method', function(){

            it('should not throw if states are well defined and passed in', function(){

                 expect(function() {

                     gameStateInitializer.verifyStates(allThreeStates, allThreeSymbolTypes);
                 }).not.toThrow();
            });

            it('should throw if no states are passed in', function() {

                expect(function () {

                    gameStateInitializer.verifyStates(null, allThreeSymbolTypes);
                }).toThrowError('No states have been injected into the GamaStateService');

                expect(function () {

                    gameStateInitializer.verifyStates([], allThreeSymbolTypes);
                }).toThrowError('No states have been injected into the GamaStateService');
            });

            it('should throw if non-objects are passed in the state array', function () {

                expect(function () {

                    gameStateInitializer.verifyStates(<any>[1, 2, 3], allThreeSymbolTypes);
                }).toThrowError('One or more injected arguments is not an object');

                expect(function () {

                    gameStateInitializer.verifyStates(<any>[mockState1, mockState2, null], allThreeSymbolTypes);
                }).toThrowError('One or more injected arguments is not an object');
            });

            it('should throw if the number of StateTypes is not equal to the number of States passed in', function () {

                expect(function () {

                    gameStateInitializer.verifyStates(allThreeStates, {mockState1Symbol, mockState2Symbol});
                }).toThrowError('There are fewer StateTypes than there are States being injected');

                expect(function () {

                    gameStateInitializer.verifyStates([mockState1, mockState2], allThreeSymbolTypes);
                }).toThrowError('There are more StateTypes than there are States being injected');
            });

            it('should throw if one of the symbol-types is actually null or undefined', function () {

                expect(function () {

                    gameStateInitializer.verifyStates(allThreeStates, { mockState1Symbol, mockState2Symbol, mockState3Symbol: null });
                }).toThrowError('StateType with key \'mockState3Symbol\' was null, undefined, or otherwise falsey');
            });

            it('should throw if a symbol-type exists but no state has that symbol-type', function () {

                let fakeSymbolType = Symbol('made up symbol-type');

                expect(function () {

                    gameStateInitializer.verifyStates(allThreeStates, { mockState1Symbol, mockState2Symbol, mockState3Symbol: fakeSymbolType });
                }).toThrowError(`No state with symbol-type ${fakeSymbolType.toString()} has been injected into the GameStateService`);
            });

            it('should throw if two or more states have the same symbol-type', function () {

                let stateWithRepeatedSymbol: GameState = {
                    stateType: mockState1.stateType,
                    gameEventHubs: new GameEventHubs(),
                    onStateEnter: null,
                    onStateLeave: null,
                    freeze: noop,
                    unfreeze: noop
                };

                expect(function () {

                    gameStateInitializer.verifyStates([mockState1, mockState2, stateWithRepeatedSymbol], {mockState1Symbol, mockState2Symbol, mockState3Symbol: mockState1Symbol});
                }).toThrowError(`More than one state with symbol-type ${mockState1.stateType.toString()} has been injected into the GameStateService`);
            });
        });

        describe('autoRelay method', function() {

            it('should not relay events in either direction if no ChildOf property; listener count for all events of both should be 0', function() {

                gameStateInitializer.autoRelay([mockState1, mockState2]);

                expect(mockState1.gameEventHubs.keyDownHub.listenerCount).toBe(0);
                expect(mockState2.gameEventHubs.keyDownHub.listenerCount).toBe(0);

                expect(mockState1.gameEventHubs.worldTickHub.listenerCount).toBe(0);
                expect(mockState2.gameEventHubs.worldTickHub.listenerCount).toBe(0);
            });

            it('should relay events of mockState1 to mockState2 since mockState2 is ChildOf mockState1', function (done) {

                mockState2[KEYS.ChildOf] = mockState1.stateType;

                gameStateInitializer.autoRelay([mockState1, mockState2]);

                expect(mockState1.gameEventHubs.keyDownHub.listenerCount).toBe(1);
                expect(mockState2.gameEventHubs.keyDownHub.listenerCount).toBe(0);

                expect(mockState1.gameEventHubs.worldTickHub.listenerCount).toBe(1);
                expect(mockState2.gameEventHubs.worldTickHub.listenerCount).toBe(0);

                let testListener = (function* (): IterableIterator<any> {

                    expect(yield).toBe(5);
                    done();
                }());

                testListener.next();

                mockState2.gameEventHubs.keyDownHub.addListener(testListener);

                mockState1.gameEventHubs.keyDownHub.publishEvent(5);
            });
        });
    });
}());