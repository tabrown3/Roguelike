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

export function relayable(): PropertyDecorator {

    return function (targetClass, propertyName) {
        
        if (!targetClass[KEYS.Relayable])
            targetClass[KEYS.Relayable] = [];

        targetClass[KEYS.Relayable].push(propertyName);
    };
}

export function relayableContainer(): PropertyDecorator {

    return function (targetClass, propertyName) {

        if (!targetClass[KEYS.RelayableContainer])
            targetClass[KEYS.RelayableContainer] = [];

        targetClass[KEYS.RelayableContainer].push(propertyName);
    };
}