import WorldSpotData from '../WorldSpotData';
import Scene from './Scene';
import Transition from './Transition';
import SceneData from './SceneData';

export default interface LevelData {
    worldSpots: WorldSpotData[][];
    name: string;
    scenes: SceneData[];
    defaultScene: SceneData;
    adjacentLevels: Transition<string>[];
}