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
import GameStateInitializer from './GameStateInitializer';

@injectable()
export default class GameStateService implements IGameStateService {

    constructor(
        @inject(TYPES.GameStateInitializer) private initializer: GameStateInitializer,
        @inject(StateType.Root) private rootState: RootState,
        @inject(StateType.Overworld) private overworldState: OverworldState,
        @inject(StateType.Navigation) private navigationState: NavigationState
    ) {

        let injectedStates: GameState[] = [
            this.rootState,
            this.overworldState,
            this.navigationState
        ];

        // verify all states in StateType are being injected (and only once)
        this.initializer.verifyStates(injectedStates, StateType);
        // relay events that have relay decorator
        this.initializer.autoRelay(injectedStates);
    }

    public init = () => {

    }

    
}