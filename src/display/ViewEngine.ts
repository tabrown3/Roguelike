import { IViewEngine } from './IViewEngine';
import { IWorld } from '../world/IWorld';
import { injectable, inject } from "inversify";
import { TYPES } from './../types';
import { VIEW_DIMS } from './../worldConfig';
import IDrawable from './IDrawable';

@injectable()
export class ViewEngine implements IViewEngine {

    constructor(
        @inject(TYPES.Display) private display: any) {

    }

    public renderWorld = (map: IDrawable[][]) => {

        //let map = world.getView();

        for(let x = 0; x < VIEW_DIMS.X; x++) {
            for(let y = 0; y < VIEW_DIMS.Y; y++) {
                this.display.getDisplay().draw(x, y, map[x][y].icon, map[x][y].colorFore.getFull(), map[x][y].colorBack.getFull());
            }
        }
    }
}
