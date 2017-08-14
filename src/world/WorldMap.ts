import WorldSpot from './WorldSpot';
import Vec2 from './../common/Vec2';
import Entity from './../Entity';
import Terrain from './Terrain';
import Color from '../common/Color';
import Level from './level/Level';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import IWorldMap from './IWorldMap';
import LevelData from './level/LevelData';
import IDrawable from '../display/IDrawable';
import Being from '../Being';
import IGameEventHandler from '../event/IGameEventHandler';
import Scene from './level/Scene';
import WorldSpotData from './WorldSpotData';
import GameStateManager from './../state/GameStateManager';

@injectable()
export default class WorldMap implements IWorldMap {
    
    private currentLevel: Level;

    constructor(
        @inject(TYPES.GameStateManager) private gameStateManager: GameStateManager) {

        let initLevelData = this.loadLevelData("maru_entrance"); // TODO: replace with actual level loading service

        this.currentLevel = new Level(initLevelData);

        this.gameStateManager.overworld.navigationSubState.playerActionHub.addListener(this.getPlayerActionListener());
    }

    public getMap = (): IDrawable[][] => {

        return this.currentLevel.getCurrentSceneView();
    }

    public getSpot = (pos: Vec2): WorldSpot => {

        return this.currentLevel.worldSpots[pos.x][pos.y];
    }

    public setEntity = (entity: Entity, pos: Vec2): void => {
        
        let toSpot = this.getSpot(pos);
        toSpot.entities.push(entity);
    }

    public removeEntity = (entity: Entity): void => {

        let fromSpot = this.getSpot(entity.getOldPos());
        let ind = fromSpot.entities.indexOf(entity);
        if (ind > -1) fromSpot.entities.splice(ind, 1);
    }

    private getPlayerActionListener = (): IterableIterator<void> => {

        let _this = this;

        let outIterator = (function* (): IterableIterator<void> {

            while (true) {

                let playerBeing: Being = yield;
                let playerPos: Vec2 = playerBeing.getPos();

                console.log(playerPos);

                let levelTransition = _this.currentLevel.checkForTransition(playerPos);
                if (levelTransition)
                    _this.loadLevelData(levelTransition.node);
                else
                    _this.currentLevel.update(playerPos);
            }
        })();

        outIterator.next();

        return outIterator;
    }

    private loadLevelData = (name: string): LevelData => {
        
        // let initWorldSpots: WorldSpot[][] = [];
        let initWorldSpotDatas: WorldSpotData[][] = [];

        for (let i = 0; i < 80; i++) { // TODO: replace this with logic to generate init LevelData
            initWorldSpotDatas[i] = [];

            for (let j = 0; j < 25; j++) {
                initWorldSpotDatas[i][j] = {
                    terrain: {
                        icon: ".",
                        colorFore: {r: "F", g: "F", b: "F"},
                        colorBack: { r: "0", g: "0", b: "0"},
                        navigable: true
                    }
                };
            }
        }

        let outData: LevelData = {
            worldSpots: initWorldSpotDatas,
            name: name,
            scenes: [],
            defaultScene: null,
            adjacentLevels: []
        };

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

        testScene1.transitions.push(testTransition1);
        testScene2.transitions.push(testTransition2);

        outData.scenes.push(testScene1.toSceneData());
        outData.scenes.push(testScene2.toSceneData());

        outData.defaultScene = testScene1.toSceneData();

        return outData;
    }
}