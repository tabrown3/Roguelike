import Entity from './Entity';

export class WorldSpot {

    constructor(
        public entities: Entity[],
        private icon: string, // TODO: consider making Terrain
        public navigable: boolean) // TODO: consider making Terrain
    {
        this.entities = [];
    }

    // TODO: figure out the actual method for determining what to show
    public getDisplayIcon = () => {

        if(this.entities.length > 0)
            return this.entities[0].getIcon();
        else
            return this.icon;
    }
}