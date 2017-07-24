import WorldSpot from '../WorldSpot';
import Scene from './Scene';
import Transition from './Transition';
import SceneData from './SceneData';

export default interface LevelData {
    worldSpots: WorldSpot[][];
    name: string;
    scenes: SceneData[];
    defaultScene: SceneData;
    adjacentLevels: Transition<string>[];
}