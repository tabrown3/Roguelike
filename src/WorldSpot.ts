import Entity from './Entity';
import Being from './Being';
import Fixture from './Fixture';

export default class WorldSpot {

    constructor(
        public entities: Entity[],
        private icon: string, // TODO: consider making Terrain
        public navigable: boolean) // TODO: consider making Terrain
    {
        this.entities = [];
    }

    public get beings(): Being[] {

        if (!this.entities)
            return [];
        
        let beings = <Being[]>this.entities.filter(entity => {
            return entity instanceof Being;
        });

        return beings;
    }

    public get fixtures(): Fixture[] {

        if(!this.entities)
            return [];

        let fixtures = <Fixture[]>this.entities.filter(entity => {
            return entity instanceof Fixture;
        });

        return fixtures;
    }

    // TODO: figure out the actual method for determining what to show
    public getDisplayIcon = () => {

        if (this.entities && this.entities.length > 0)
            return this.entities[0].getIcon();
        else
            return this.icon;
    }
}