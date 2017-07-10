import { IWorld } from './IWorld';
import { World } from './World';
import { IViewEngine } from './IViewEngine';
import { ViewEngine } from './ViewEngine';
import { IEventHandler } from './IEventHandler';
import { EventHandler } from './EventHandler';
import { Player } from './Player';

export class Game {

    private eventHandler: IEventHandler;
    private world: IWorld;
    private viewEngine: IViewEngine;
    private player: Player;

    constructor(private display: any) {

    }

    public initialize = () => {
        this.player = new Player();
        this.world = new World(this.player);
        this.viewEngine = new ViewEngine(this.display);
        this.eventHandler = new EventHandler();
    }

    public start = () => {
        setInterval(() => {
            this.player.update(this.eventHandler);
            //this.world.update();
            this.viewEngine.renderWorld(this.world);
        }, 200);
    }
}