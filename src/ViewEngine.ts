import { IViewEngine } from './IViewEngine';
import { IWorld } from './IWorld';

import { VIEW_DIMS } from './worldConfig';

export class ViewEngine implements IViewEngine {

    constructor(private display: any) {

    }

    public renderWorld = (world: IWorld) => {

        let map = world.getView();

        for(let x = 0; x < VIEW_DIMS.X; x++) {
            for(let y = 0; y < VIEW_DIMS.Y; y++) {
                this.display.draw(x, y, map[x][y]);
            }
        }
    }
}
