import { IEventHandler } from './IEventHandler';
import { injectable, inject } from "inversify";

@injectable()
export class EventHandler implements IEventHandler {

    private lastKeyDown: string;

    constructor() {
        window.addEventListener("keydown", (ev) => {
            this.lastKeyDown = ev.key;
        });
    }

    public getLastMove = (): string => {
        let key = this.lastKeyDown;
        this.lastKeyDown = null;
        return key;
    }
}