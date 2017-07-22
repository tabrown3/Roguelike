import WorldSpot from './WorldSpot';
import Vec2 from './../common/Vec2';
import Entity from './../Entity';
import Terrain from './Terrain';
import Color from '../common/Color';
import Level from './level/Level';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import IScheduler from '../IScheduler';
import IWorldMap from './IWorldMap';
import LevelData from './level/LevelData';
import IDrawable from '../display/IDrawable';


@injectable()
export default class WorldMap implements IWorldMap {
    
    private currentLevel: Level;

    constructor(
        @inject(TYPES.Scheduler) private scheduler: IScheduler) {

        let initLevelData = this.loadLevelData("maru_entrance"); // TODO: replace with actual level loading service

        this.currentLevel = new Level(initLevelData);

        scheduler.addWorldTickListener(this.worldTick());
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

    private worldTick = (): IterableIterator<void> => {

        let _this = this;

        return (function* (): IterableIterator<void> {

            while(true) {

                let playerPos: Vec2 = yield;

                let levelTransition = _this.currentLevel.checkForTransition(playerPos);
                if(levelTransition)
                    _this.loadLevelData(levelTransition.node);
                else
                    _this.currentLevel.update(playerPos);
            }
        })();
    }

    private loadLevelData = (name: string): LevelData => {
        
        let initWorldSpots: WorldSpot[][] = [];

        for (let i = 0; i < 80; i++) { // TODO: replace this with logic to generate init LevelData
            initWorldSpots[i] = [];

            for (let j = 0; j < 25; j++) {
                initWorldSpots[i][j] = new WorldSpot([],
                    new Terrain({
                        icon: ".",
                        colorFore: new Color("F", "F", "F"),
                        colorBack: new Color("0", "0", "0")
                    }, true)
                )
            }
        }

        return {
            worldSpots: initWorldSpots,
            name: "maru_entrance",
            scenes: [],
            currentScene: null,
            adjacentLevels: []
        };
    }
}