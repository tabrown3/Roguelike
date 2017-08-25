import GameStateInitializer from './../src/state/GameStateInitializer';
import GameState from './../src/state/GameState';
import GameEventHubs from './../src/event/GameEventHubs';

export default (function(){

    describe('GameStateInitializer class', function(){

        describe('verifyStates method', function(){

            let gameStateInitializer: GameStateInitializer = new GameStateInitializer();
            
            let mockState1Symbol: symbol, mockState2Symbol: symbol, mockState3Symbol: symbol;
            let mockState1: GameState, mockState2: GameState, mockState3: GameState;

            let allThreeStates: GameState[];
            let allThreeSymbolTypes: { [key: string]: symbol };

            beforeEach(function() {
                
                mockState1Symbol = Symbol('mockState1Symbol');
                mockState2Symbol = Symbol('mockState2Symbol');
                mockState3Symbol = Symbol('mockState3Symbol');

                mockState1 = {
                    stateType: mockState1Symbol,
                    gameEventHubs: new GameEventHubs()
                };

                mockState2 = {
                    stateType: mockState2Symbol,
                    gameEventHubs: new GameEventHubs()
                };

                mockState3 = {
                    stateType: mockState3Symbol,
                    gameEventHubs: new GameEventHubs()
                };

                allThreeStates = [mockState1, mockState2, mockState3];
                allThreeSymbolTypes = { mockState1Symbol, mockState2Symbol, mockState3Symbol };
            });

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

                let stateWithRepeatedSymbol = {
                    stateType: mockState1.stateType,
                    gameEventHubs: new GameEventHubs()
                };

                expect(function () {

                    gameStateInitializer.verifyStates([mockState1, mockState2, stateWithRepeatedSymbol], {mockState1Symbol, mockState2Symbol, mockState3Symbol: mockState1Symbol});
                }).toThrowError(`More than one state with symbol-type ${mockState1.stateType.toString()} has been injected into the GameStateService`);
            });
        });
    });
}());