import GameState from './GameState';
import { KEYS } from './StateRegistry';
import EventHub from './../event/EventHub';
import IGameStateInitializer from './IGameStateInitializer';
import { injectable } from 'inversify';
 
@injectable()
export default class GameStateInitializer implements IGameStateInitializer {

    public autoRelay = (states: GameState[]) => {

        // TODO: consider making this recursive; right now it only goes one level deep
        for (let state of states) {

            let parentType: symbol = state[KEYS.ChildOf];
            if (parentType) {

                let parentState = states.find(u => u.stateType === parentType);
                if (parentState) {

                    this.linkHubsToParent(state, parentState);
                }
                else {
                    // this exception should never be thrown since state injection is being verified in verifyStates
                    throw new TypeError(`State with symbol-type ${state.stateType.toString()} claims to be child of state with symbol-type ${parentType.toString()} but state with symbol-type ${parentType.toString()} could not be found`);
                }

                let relayableContainerKeys = <string[]>state[KEYS.RelayableContainer];
                if (relayableContainerKeys && relayableContainerKeys.length > 0) {

                    for (let relayableContainerKey of relayableContainerKeys) {

                        let parentContainer = parentState[relayableContainerKey];
                        let childContainer = state[relayableContainerKey];

                        if (parentContainer) {

                            this.linkHubsToParent(childContainer, parentContainer);
                        }
                    }
                }
            }
        }
    }

    private linkHubsToParent = (childObj: any, parentObj: any) => {

        let relayableKeys = <string[]>childObj[KEYS.Relayable];

        if (Array.isArray(relayableKeys)) {
            for (let relayableKey of relayableKeys) {

                if (parentObj[relayableKey] && parentObj[relayableKey] instanceof EventHub) {

                    let parentHub: EventHub = parentObj[relayableKey];
                    let childHub: EventHub = childObj[relayableKey];

                    parentHub.relay(childHub);
                }
            }
        }
    }

    // verifyStates should essentially guarantee that each state passed in actually is a state, has a symbol-type, and that there's no disparity between the injected states and known symbol-types (e.g. throws if more symbol-types than states)
    public verifyStates = (states: GameState[], stateType: { [key: string]: symbol }) => {

        if (!states || states.length === 0) {

            throw new TypeError('No states have been injected into the GamaStateService');
        }

        // TODO: if I make a parent class for State classes, this should change
        if (!states.every(u => !!u && (u instanceof Object))) {

            throw new TypeError('One or more injected arguments is not an object');
        }

        let stateTypeKeys = Object.keys(stateType);

        if (stateTypeKeys.length < states.length) {

            throw new TypeError('There are fewer StateTypes than there are States being injected');
        }
        else if (stateTypeKeys.length > states.length) {

            throw new TypeError('There are more StateTypes than there are States being injected');
        }

        for (let key of stateTypeKeys) {

            let type = stateType[key];
            if (!type) {

                throw new TypeError(`StateType with key '${key}' was null, undefined, or otherwise falsey`);
            }

            let foundStates = states.filter(u => u.stateType === type);
            // no states had a type in StateType
            if (foundStates.length < 1) {

                throw new TypeError(`No state with symbol-type ${type.toString()} has been injected into the GameStateService`);
            }

            // more than one state had a type in StateType
            if (foundStates.length > 1) {

                throw new TypeError(`More than one state with symbol-type ${type.toString()} has been injected into the GameStateService`)
            }
        }

        // TODO: make sure there are no circular childOf decorator (parent state) references
    }
}