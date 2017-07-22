import IScheduler from './IScheduler';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import IEventHandler from './IEventHandler';
import Being from './Being';

@injectable()
export default class Scheduler implements IScheduler {

    constructor(
        @inject(TYPES.EventHandler) private eventHandler: IEventHandler) {

    }

    addWorldTickListener = (iterator: IterableIterator<void>): void => {

        //this.eventHandler.addKeyDownListener(iterator); // TODO: this shouldn't be a pass through, need actual scheduling

        // iterator.next();

        // setInterval(() => {
        //     iterator.next();
        // }, 200);
    }
    
}