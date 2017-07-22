import WorldSpot from './WorldSpot';
import Vec2 from '../common/Vec2';
import Entity from '../Entity';
import IDrawable from '../display/IDrawable';


export default interface IWorldMap {
    getMap: () => IDrawable[][];
    getSpot: (pos: Vec2) => WorldSpot;
    setEntity: (entity: Entity, pos: Vec2) => void;
    removeEntity: (entity: Entity) => void;
}