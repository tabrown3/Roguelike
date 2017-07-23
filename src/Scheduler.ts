import IScheduler from './IScheduler';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import IEventHandler from './IEventHandler';
import Being from './Being';

@injectable()
export default class Scheduler implements IScheduler {

    private iterators: IterableIterator<void>[] = [];

    constructor(
        @inject(TYPES.EventHandler) private eventHandler: IEventHandler) {

    }

    public addWorldTickListener = (iterator: IterableIterator<void>): void => {

        iterator.next();
        this.iterators.push(iterator);
    }

    public executeWorldTick = (being: Being): void => {
        
        for (let ind = this.iterators.length - 1; ind >= 0; ind--) {

            let result = this.iterators[ind].next(being.getPos());

            if (result.done)
                this.iterators.splice(ind, 1);
        }
    }
}