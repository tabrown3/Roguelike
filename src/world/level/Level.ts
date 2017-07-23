import LevelData from './LevelData';
import Scene from './Scene';
import WorldSpot from '../WorldSpot';
import Transition from './Transition';
import ITransitionable from './ITransitionable';
import Vec2 from '../../common/Vec2';
import IDrawable from '../../display/IDrawable';
import Color from '../../common/Color';
import { VIEW_DIMS } from '../../worldConfig';

export default class Level implements ITransitionable<string> {

    constructor(data: LevelData) {

        this.worldSpots = data.worldSpots;
        this.name = data.name;
        this.scenes = data.scenes;
        this.adjacentLevels = data.adjacentLevels;

        // TODO: REMOVE TEST CODE
        let testScene1 = new Scene("entrance", new Vec2(-10, -5), []);
        let testScene2 = new Scene("antechamber", new Vec2(5, 5), []);

        let testTransition1 = {
            transitionAt: new Vec2(6, 6),
            node: testScene2
        };

        let testTransition2 = {
            transitionAt: new Vec2(5, 5),
            node: testScene1
        };

        this.scenes.push(testScene1);
        this.scenes.push(testScene2);

        testScene1.transitions.push(testTransition1);
        testScene2.transitions.push(testTransition2);

        // TODO: replace with LevelData.currentScene (defaultScene?)
        this.currentScene = testScene1;
    }

    public worldSpots: WorldSpot[][];
    public name: string;
    private scenes: Scene[];
    private currentScene: Scene;
    private adjacentLevels: Transition<string>[];

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

    private blackDrawable: IDrawable = {
        colorFore: Color.black,
        colorBack: Color.black,
        icon: " " // empty space
    };

    private outOfBounds = (x: number, y: number) => {

        return x < 0 || x >= this.worldSpots.length || y < 0 || y >= this.worldSpots[0].length;
    }
}