import { injectable, inject } from "inversify";
import IWorldManager from './IWorldManager';
import ActionRequest from './ActionRequest';
import ActionPermission from './ActionPermission';
import { ActionType } from './ActionType';
import { PermissionType } from './PermissionType';
import Vec2 from './../common/Vec2';
import WorldMap from './WorldMap';
import WorldSpot from './WorldSpot';
import Entity from '../Entity';
import { TYPES } from '../types';
import IWorldMap from './IWorldMap';
import IDrawable from '../display/IDrawable';


@injectable()
export default class WorldManager implements IWorldManager {

    //private readonly worldMap: WorldMap = new WorldMap(); // TODO: inject this

    constructor(
        @inject(TYPES.WorldMap) private worldMap: IWorldMap) {

    }

    public requestAction = (request: ActionRequest): ActionPermission => {

        if (request.type === ActionType.Move) {
            if (this.canMoveTo(request.pos)) {
                return {
                    type: PermissionType.Granted,
                    alternatives: <ActionType[]>[]
                };
            }
            else {
                return {
                    type: PermissionType.Denied,
                    alternatives: <ActionType[]>[]
                };
            }
        }
    }

    public commitAction = (request: ActionRequest): void => {

        if(request.type == ActionType.Move) {
            // TODO: consider updating world tick at this point
            this.worldMap.removeEntity(request.requestor);
            this.worldMap.setEntity(request.requestor, request.pos);
        }
    }

    public initEntity = (entity: Entity) => {

        this.worldMap.setEntity(entity, entity.getPos());
    }

    public getWorldMap = (): IDrawable[][] => {
        return this.worldMap.getMap();
    }

    private canMoveTo = (pos: Vec2): boolean => {

        let worldSpot = this.worldMap.getSpot(pos);

        let navigableSpot: boolean = worldSpot.terrain.navigable; // does this tile allow movement to it?
        let hasEntities: boolean = worldSpot.entities && worldSpot.entities.length > 0; // is there anything on this tile?

        let navigableFixtures = true; // if there are no entities, no fixtures to obstruct
        let hasBeings = false; // if there are no entities, there are no beings
        if (hasEntities) {

            let fixtures = worldSpot.fixtures;
            let beings = worldSpot.beings;

            hasBeings = beings.length > 0;
            navigableFixtures = fixtures.every(fixture => fixture.navigable);
        }

        return navigableSpot && navigableFixtures && !hasBeings;
    }
}