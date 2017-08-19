
export default class EventHub {

    private listeners: IterableIterator<void>[] = [];
    private frozen: boolean = false;

    public addListener = (listener: IterableIterator<void>) => {

        this.listeners.push(listener);
    }

    public publishEvent = (...args: any[]): boolean => {

        if(!this.isFrozen()) {

            for (let ind = this.listeners.length - 1; ind >= 0; ind--) {

                let result = this.listeners[ind].next(...args);

                if (result.done)
                    this.listeners.splice(ind, 1);
            }
        }
        
        return this.isFrozen(); // was hub frozen when you tried to publish?
    }
    
    public freeze = () => {

        this.frozen = true;
    }

    public unfreeze = () => {

        this.frozen = false;
    }

    public isFrozen = () => {

        return this.frozen;
    }

    public relay = (hub: EventHub): IterableIterator<void> => {

        let outIterator = (function* (): IterableIterator<void> {

            while (true)
                hub.publishEvent(yield);
        }());

        outIterator.next();
        this.addListener(outIterator);

        return outIterator;
    }
}