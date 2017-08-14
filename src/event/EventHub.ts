
export default class EventHub {

    private listeners: IterableIterator<void>[] = [];

    public addListener = (listener: IterableIterator<void>) => {

        this.listeners.push(listener);
    }

    public publishEvent = (...args: any[]) => {

        for (let ind = this.listeners.length - 1; ind >= 0; ind--) {

            let result = this.listeners[ind].next(...args);

            if (result.done)
                this.listeners.splice(ind, 1);
        }
    }
}