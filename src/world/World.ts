import { IWorld } from './IWorld';
import { Player } from '../Player';
import { IEventHandler } from '../IEventHandler';
import { injectable, inject } from "inversify";
import { TYPES } from '../types';
import Vec2 from './../common/Vec2';
import InspectionResult from '../InspectionResult';
import WorldMap from './WorldMap';
import Entity from '../Entity';
import ActionRequest from './ActionRequest';
import ActionPermission from './ActionPermission';
import { ActionType } from './ActionType';
import Fixture from '../Fixture';
import { PermissionType } from './PermissionType';
import Being from '../Being';
import IWorldManager from './WorldManager';
import IDrawable from '../display/IDrawable';

@injectable()
export class World implements IWorld {

    constructor(
        @inject(TYPES.Player) private player: Player,
        @inject(TYPES.EventHandler) private eventHandler: IEventHandler,
        @inject(TYPES.WorldManager) private worldManager: IWorldManager) {
    }

    public getView = (): IDrawable[][] => {
        
        let outArr: IDrawable[][] = [];
        let map = this.worldManager.getWorldMap();

        for(let i = 0; i < 80; i++) {
            outArr[i] = [];
            for(let j = 0; j < 25; j++) {
                outArr[i][j] = map[i][j].toDrawable();
            }
        }

        return outArr;
    }

    public update = (): void => {
        this.player.update(this.eventHandler);
        // TODO: everything else updates here?
    }
}