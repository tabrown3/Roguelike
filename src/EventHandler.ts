import IEventHandler from './IEventHandler';
import { injectable } from "inversify";

@injectable()
export class EventHandler implements IEventHandler {

    private iterators: IterableIterator<void>[] = [];

    constructor() {

        window.addEventListener("keydown", (ev) => {

            this.whenKeyDown(ev);
        });
    }

    public addKeyDownListener = (iterator: IterableIterator<void>): void => {

        iterator.next(); // bleed the line (move generator execution to first yield)
        this.iterators.push(iterator); // subscribe to the event
    }

    private whenKeyDown = (ev: KeyboardEvent) => {

        for (let ind = this.iterators.length - 1; ind >= 0; ind--) {

            let result = this.iterators[ind].next(ev.key);

            if (result.done)
                this.iterators.splice(ind, 1);
        }
    }
}