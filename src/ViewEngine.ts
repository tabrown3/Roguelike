import { IViewEngine } from './IViewEngine';
import { IWorld } from './IWorld';
import { injectable, inject } from "inversify";
import { TYPES } from './types';
import { VIEW_DIMS } from './worldConfig';

@injectable()
export class ViewEngine implements IViewEngine {

    constructor(
        @inject(TYPES.Display) private display: any) {

    }

    public renderWorld = (world: IWorld) => {

        let map = world.getView();

        for(let x = 0; x < VIEW_DIMS.X; x++) {
            for(let y = 0; y < VIEW_DIMS.Y; y++) {
                this.display.getDisplay().draw(x, y, map[x][y]);
            }
        }
    }
}
