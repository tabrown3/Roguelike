import ActionRequest from './ActionRequest';
import ActionPermission from './ActionPermission';
import WorldMap from './WorldMap';
import WorldSpot from './WorldSpot';
import Entity from '../Entity';
import IDrawable from '../display/IDrawable';

export default interface IWorldManager {
    requestAction: (request: ActionRequest) => ActionPermission;
    commitAction: (request: ActionRequest) => void;
    initEntity: (entity: Entity) => void;
}