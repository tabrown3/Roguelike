import Being from './../Being';

export default interface IEventHandler {
    addKeyDownListener: (iterator: IterableIterator<void>) => void;
    addWorldTickListener: (iterator: IterableIterator<void>) => void;
    addPlayerActionListener: (iterator: IterableIterator<void>) => void;
    addGameUpdateListener: (iterator: IterableIterator<void>) => void;
    publishPlayerAction: (being: Being) => void;
}