export default interface IScheduler {

    onKeyPress: (gen: () => IterableIterator<void>) => void;
}