import { injectable, inject } from "inversify";
import { StateType } from './StateType';
import RootState from './RootState';
import OverworldState from './overworld/OverworldState';
import NavigationState from './overworld/NavigationState';
import IGameStateService from './IGameStateService';
import GameState from './GameState';
import { KEYS } from './StateRegistry';
import EventHub from './../event/EventHub';

@injectable()
export default class GameStateService implements IGameStateService {

    constructor(
        @inject(StateType.Root) private rootState: RootState,
        @inject(StateType.Overworld) private overworldState: OverworldState,
        @inject(StateType.Navigation) private navigationState: NavigationState) {

            this.autoRelay([...arguments]); // relay events that have relay decorator
    }

    public init = () => {

    }

    private autoRelay = (states: GameState[]) => {

        for(let state of states) {

            let parentType: symbol = state[KEYS.ChildOf];
            if (parentType){

                let parentState = states.find(u => u.stateType === parentType);

                let relayableKeys = <string[]>state[KEYS.Relayable];
                if(relayableKeys && relayableKeys.length > 0) {
                    for(let relayableKey of relayableKeys) {

                        if (parentState[relayableKey] && parentState[relayableKey] instanceof EventHub) {

                            let parentHub: EventHub = parentState[relayableKey];
                            let childHub: EventHub = state[relayableKey];

                            parentHub.relay(childHub);
                        }
                    }
                }
                
                let relayableContainerKeys = state[KEYS.RelayableContainer];
                if (relayableContainerKeys && relayableContainerKeys.length > 0) {
                    for (let relayableContainerKey of relayableContainerKeys) {
                        let container = state[relayableContainerKey];
                        let innerKeys = container[KEYS.Relayable];

                        for (let innerKey of innerKeys) {

                            if (parentState[relayableContainerKey] && parentState[relayableContainerKey][innerKey] instanceof EventHub) {

                                let parentHub: EventHub = parentState[relayableContainerKey][innerKey];
                                let childHub: EventHub = state[relayableContainerKey][innerKey];

                                parentHub.relay(childHub);
                            }
                        }
                    }
                }
            }
        }
    }
}