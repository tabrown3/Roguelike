import IGameEventHandler from './IGameEventHandler';
import { injectable } from "inversify";
import Being from './../Being';
import { GAME_LOOP_INTERVAL } from './../worldConfig';
import GameEventHubs from './GameEventHubs';
import EventHub from './EventHub';

@injectable()
export class GameEventHandler implements IGameEventHandler {

    // these are listeners at the global level, independent of state
    private _gameEventHubs: GameEventHubs = new GameEventHubs();

    constructor() {

        // keydown event
        window.addEventListener("keydown", (ev) => {
            this.gameEventHubs.keyDownHub.publishEvent(ev);
        });

        // game tick event
        setInterval(this.gameEventHubs.worldTickHub.publishEvent, GAME_LOOP_INTERVAL);
    }

    public get gameEventHubs() {

        return this._gameEventHubs;
    }
}