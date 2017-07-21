import Vec2 from './common/Vec2';
import WorldSpot from './world/WorldSpot';

export default interface InspectionResult {
    pos: Vec2;
    worldSpot: WorldSpot;
}