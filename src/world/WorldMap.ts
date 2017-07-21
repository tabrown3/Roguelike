import WorldSpot from './WorldSpot';
import Vec2 from './../common/Vec2';
import Entity from './../Entity';
import Terrain from './Terrain';
import Color from '../common/Color';

export default class WorldMap {
    
    private worldSpots: WorldSpot[][] = [];

    constructor() {

        for (let i = 0; i < 80; i++) {
            this.worldSpots[i] = [];

            for (let j = 0; j < 25; j++) {
                this.worldSpots[i][j] = new WorldSpot( [],
                    new Terrain({
                        icon: ".",
                        colorFore: new Color("F", "F", "F"),
                        colorBack: new Color("0", "0", "0")
                    }, true)
                )
            }
        }
    }

    public getMap = (): WorldSpot[][] => {

        return this.worldSpots;
    }

    public getSpot = (pos: Vec2): WorldSpot => {

        return this.worldSpots[pos.x][pos.y];
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
}