import IEventHandler from './IEventHandler';
import { injectable } from "inversify";
import Being from './Being';
import { GAME_LOOP_INTERVAL } from './worldConfig';

@injectable()
export class EventHandler implements IEventHandler {

    private keyDownListeners: IterableIterator<void>[] = [];
    private worldTickListeners: IterableIterator<void>[] = [];
    private playerActionListeners: IterableIterator<void>[] = [];

    constructor() {

        // keydown event
        window.addEventListener("keydown", this.publishKeyDown);

        // game tick event
        setInterval(this.publishWorldTick, GAME_LOOP_INTERVAL);
    }

    public addKeyDownListener = (iterator: IterableIterator<void>): void => {

        this.addListener(iterator, [this.keyDownListeners]);
    }

    public addWorldTickListener = (iterator: IterableIterator<void>): void => {

        this.addListener(iterator, [this.worldTickListeners]);
    }

    public addPlayerActionListener = (iterator: IterableIterator<void>): void => {

        this.addListener(iterator, [this.playerActionListeners]);
    }

    // fired on worldTick OR playerAction
    public addGameUpdateListener = (iterator: IterableIterator<void>): void => {

        this.addListener(iterator, [this.worldTickListeners, this.playerActionListeners]);
    }

    public publishPlayerAction = (being: Being): void => {

        this.publishEvent(this.playerActionListeners, being);
        
    }

    private publishWorldTick = (): void => {

        this.publishEvent(this.worldTickListeners);
    }

    private publishKeyDown = (ev: KeyboardEvent) => {

        this.publishEvent(this.keyDownListeners, ev.key);
    }

    private addListener = (listener: IterableIterator<void>, listenerArrs: IterableIterator<void>[][]) => {

        let tempListenerArrs: IterableIterator<void>[][] = listenerArrs;

        if (!tempListenerArrs)
            return;

        listener.next();

        for (let tempListenerArr of tempListenerArrs)
            tempListenerArr.push(listener);
    }

    private publishEvent = (listeners: IterableIterator<void>[], ...args: any[]) => {

        for (let ind = listeners.length - 1; ind >= 0; ind--) {

            let result = listeners[ind].next(...args);

            if (result.done)
                listeners.splice(ind, 1);
        }
    }
}