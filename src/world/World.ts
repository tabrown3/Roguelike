import { IWorld } from '../IWorld';
import { Player } from '../Player';
import { IEventHandler } from '../IEventHandler';
import { injectable, inject } from "inversify";
import { TYPES } from '../types';
import Vec2 from '../Vec2';
import { InspectionResult } from '../InspectionResult';
import { WorldMap } from '../WorldMap';
import Entity from '../Entity';
import { ActionRequest } from './ActionRequest';
import { PermissionResponse } from './PermissionResponse';

@injectable()
export class World implements IWorld {

    private readonly worldMap: WorldMap = new WorldMap(); // TODO: inject or treat as data structure?

    constructor(
        @inject(TYPES.Player) private player: Player,
        @inject(TYPES.EventHandler) private eventHandler: IEventHandler) {

        this.worldMap.setEntity(this.player.being, this.player.being.getPos());
    }

    public getView = (): string[][] => {
        
        let outArr: string[][] = [];
        let map = this.worldMap.getMap();

        for(let i = 0; i < 80; i++) {
            outArr[i] = [];
            for(let j = 0; j < 25; j++) {
                outArr[i][j] = map[i][j].getDisplayIcon();
            }
        }

        return outArr;
    }

    public update = (): void => {
        this.player.update(this.eventHandler, this.inspectPos);
        this.worldMap.setEntity(this.player.being, this.player.being.getPos());
        // TODO: everything else updates here?
    }

    private inspectPos = (pos: Vec2): InspectionResult => {
        // return information about this grid square in the world
        return {
            pos: pos,
            worldSpot: this.worldMap.getSpot(pos)
        };
    }

    private requestAction = (request: ActionRequest): PermissionResponse => {

        throw new TypeError("not implemented");
    }
}