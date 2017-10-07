
export default class EventHub {

    private listeners: IterableIterator<void>[] = [];
    private frozen: boolean = false;

    public addListener = (listener: IterableIterator<void>) => {

        this.listeners.push(listener);
    }

    public publishEvent = (...args: any[]): boolean => {

        if(!this.isFrozen()) {

            Promise.resolve().then(() => { // execute all listeners next event loop

                this.publish(args);
            });
        }
        
        return this.isFrozen(); // was hub frozen when you tried to publish?
    }

    public publishEventSync = (...args: any[]): boolean => {

        if (!this.isFrozen()) {

            this.publish(args);
        }

        return this.isFrozen(); // was hub frozen when you tried to publish?
    }

    private publish = (args: any[]): void => {

        for (let ind = this.listeners.length - 1; ind >= 0; ind--) {

            let result = this.listeners[ind].next(...args);

            if (result.done)
                this.listeners.splice(ind, 1);
        }
    }
    
    // used to prevent publishEvent from publishing
    public freeze = () => {

        this.frozen = true;
    }

    public unfreeze = () => {

        this.frozen = false;
    }

    public isFrozen = () => {

        return this.frozen;
    }

    // will publish argument when this EventHub is published
    public relay = (hub: EventHub): IterableIterator<void> => {

        let outIterator = (function* (): IterableIterator<void> {

            while (true)
                hub.publishEvent(yield);
        }());

        outIterator.next();
        this.addListener(outIterator);

        return outIterator;
    }

    public get listenerCount() {
        
        return this.listeners.length;
    }
}