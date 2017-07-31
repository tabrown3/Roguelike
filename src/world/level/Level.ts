import LevelData from './LevelData';
import Scene from './Scene';
import WorldSpot from '../WorldSpot';
import Transition from './Transition';
import ITransitionable from './ITransitionable';
import Vec2 from '../../common/Vec2';
import IDrawable from '../../display/IDrawable';
import Color from '../../common/Color';
import { VIEW_DIMS } from '../../worldConfig';
import SceneData from './SceneData';
import WorldSpotData from '../WorldSpotData';

export default class Level implements ITransitionable<string> {

    constructor(data?: Level | LevelData) {

        if(data) {

            let inLevel = data;

            if (!(inLevel instanceof Level))
                inLevel = Level.fromLevelData(inLevel);

            this.worldSpots = inLevel.worldSpots;
            this.name = inLevel.name;
            this.scenes = inLevel.scenes;
            this.adjacentLevels = inLevel.adjacentLevels;
            this.defaultScene = inLevel.defaultScene;
            this.currentScene = inLevel.currentScene || inLevel.defaultScene;
        }
    }

    public worldSpots: WorldSpot[][];
    public name: string;
    private scenes: Scene[];
    private currentScene: Scene;
    private adjacentLevels: Transition<string>[];
    private defaultScene: Scene;

    public checkForTransition = (pos: Vec2): Transition<string> => {

        return this.adjacentLevels.find(item => Vec2.equal(item.transitionAt, pos));
    }
    
    private checkForSceneTransition = (pos: Vec2): Transition<Scene> => {

        return this.currentScene.checkForTransition(pos);
    }

    public update = (pos: Vec2) => {

        let sceneTransition = this.checkForSceneTransition(pos);
        if(sceneTransition)
            this.currentScene = sceneTransition.node;
    }

    public getCurrentSceneView = (): IDrawable[][] => {

        let outArr: IDrawable[][] = [];
        let map = this.worldSpots;

        for (let i = 0; i < VIEW_DIMS.X; i++) {
            outArr[i] = [];
            for (let j = 0; j < VIEW_DIMS.Y; j++) {

                if (this.outOfBounds(this.currentScene.camOrigin.x + i, this.currentScene.camOrigin.y + j))
                    outArr[i][j] = this.blackDrawable;
                else
                    outArr[i][j] = map[this.currentScene.camOrigin.x + i][this.currentScene.camOrigin.y + j].toDrawable();
            }
        }

        return outArr;
    }

    public toLevelData = (): LevelData => {

        let sceneDataArr: SceneData[] = this.scenes.map(elem => elem.toSceneData())

        let outWorldSpots: WorldSpotData[][] = [];
        for (let [i, spotCol] of this.worldSpots.entries()) {
            outWorldSpots.push([]);

            for (let [j, spot] of spotCol.entries()) {
                outWorldSpots[i][j] = spot.toWorldSpotData();
            }
        }

        return {
            worldSpots: this.worldSpots,
            name: this.name,
            scenes: sceneDataArr,
            defaultScene: this.defaultScene.toSceneData(),
            adjacentLevels: this.adjacentLevels
        };
    }

    public static fromLevelData = (data: LevelData): Level => {
        let outLevel: Level = new Level();
        outLevel.name = data.name;
        outLevel.adjacentLevels = data.adjacentLevels;
        outLevel.scenes = Level.getScenesFromSceneData(data.scenes);
        outLevel.defaultScene = outLevel.scenes.find(scene => scene.name === data.defaultScene.name);
        outLevel.currentScene = outLevel.defaultScene;

        let outWorldSpots: WorldSpot[][] = [];
        for(let [i, spotCol] of data.worldSpots.entries()) {
            outWorldSpots.push([]);

            for(let [j, spot] of spotCol.entries()) {
                outWorldSpots[i][j] = WorldSpot.fromWorldSpotData(spot);
            }
        }

        outLevel.worldSpots = outWorldSpots; // TODO: make sure worldSpots serialize correctly, etc

        return outLevel;
    }

    private static getScenesFromSceneData = (sceneDatas: SceneData[]): Scene[] => {

        let outScenes = sceneDatas.map(elem => new Scene(elem.name, elem.camOrigin, []));

        for(let outScene of outScenes) {
            
            let matchingSceneData = sceneDatas.find(data => data.name === outScene.name);

            for(let tran of matchingSceneData.transitions) {

                outScene.transitions.push({
                    node: outScenes.find(scene => scene.name === tran.node),
                    transitionAt: tran.transitionAt
                });
            }
        }

        return outScenes;
    }

    private blackDrawable: IDrawable = {
        colorFore: Color.black,
        colorBack: Color.black,
        icon: " " // empty space
    };

    public outOfBounds = (x: number, y: number) => {

        return x < 0 || x >= this.worldSpots.length || y < 0 || y >= this.worldSpots[0].length;
    }
}