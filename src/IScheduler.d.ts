import Being from './Being';

export default interface IScheduler {
    addWorldTickListener: (iterator: IterableIterator<void>) => void;
    executeWorldTick: (being: Being) => void;
}