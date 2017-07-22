import LevelData from './LevelData';
import Scene from './Scene';

export default class Level {

    constructor(data: LevelData) {

    }

    public name: string;
    public scenes: Scene[];
    public currentScene: Scene;

    
}