import WorldSpot from '../WorldSpot';
import Scene from './Scene';
import Transition from './Transition';

export default interface LevelData {
    worldSpots: WorldSpot[][];
    name: string;
    scenes: Scene[];
    currentScene: Scene;
    adjacentLevels: Transition<string>[];
}