
export default class EventHub {

    private listeners: IterableIterator<any>[] = [];
    private frozen: boolean = true; // all hubs start frozen; unfrozen by GameStateService

    public addListener = (listener: IterableIterator<any>) => {

        this.listeners.push(listener);
    }

    public publishEvent = (...args: any[]): Promise<boolean> => {

        return Promise.resolve().then(() => { // execute all listeners next event loop

            if (!this.isFrozen())
                return this.publish(args);

        }).then(() => {
            
            return this.isFrozen(); // was hub frozen when you tried to publish?
        });
    }

    private publish = async (args: any[]): Promise<void> => {

        for (let ind = this.listeners.length - 1; ind >= 0; ind--) {

            let result = this.listeners[ind].next(...args);

            if(result.value instanceof Promise) { // if it's a promise, wait for it to resolve
                await result.value;
            }

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