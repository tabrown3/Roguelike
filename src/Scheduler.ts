import IScheduler from './IScheduler';
import { injectable } from 'inversify';

@injectable()
export default class Scheduler implements IScheduler {

    public onKeyPress = (gen: () => IterableIterator<void>): void => {

        let iterator = gen();
        iterator.next();

        window.addEventListener("keydown", (ev) => {

            iterator.next(ev.key);
        });
    }
}