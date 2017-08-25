import GameStateInitializer from './../src/state/GameStateInitializer';
import GameState from './../src/state/GameState';
import GameEventHubs from './../src/event/GameEventHubs';

export default (function(){

    describe('GameStateService class', function(){

        describe('verifyStates method (private)', function(){

            let gameStateInitializer = new GameStateInitializer();
            // let gameStateInitializer = <any>{};
            
            let mockState1Symbol = Symbol('mockState1Symbol');

            let mockState1: GameState = {
                stateType: mockState1Symbol,
                gameEventHubs: new GameEventHubs()
            };

            it('should not throw if states are well defined and passed in', function(){

                 gameStateInitializer.verifyStates([mockState1], {mockState1Symbol});
            });
        });
    });
}());