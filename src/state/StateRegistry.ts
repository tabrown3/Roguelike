import { StateType } from './StateType';

let KEYS = {
    ChildOf: Symbol("ChildOf"),
    Relayable: Symbol("Relayable"),
    RelayableContainer: Symbol("RelayableContainer")
};

export { KEYS };

export function childOf(parentType: symbol): ClassDecorator {

    return function (targetClass) {

        targetClass.prototype[KEYS.ChildOf] = parentType;
    };
}

// designates a property for relay which is wired up in GameStateService
export function relayable(): PropertyDecorator {

    return attachMetadata(KEYS.Relayable);
}

// identifies a container with relayable properties
export function relayableContainer(): PropertyDecorator {

    return attachMetadata(KEYS.RelayableContainer);
}

function attachMetadata(key: symbol) {

    return function (targetClass: Object, propertyName: string|symbol) {

        if (!targetClass[key])
            targetClass[key] = [];

        targetClass[key].push(propertyName);
    };
}