import { injectable } from 'inversify';
import { VIEW_DIMS } from './../worldConfig';
import { IDisplay } from './IDisplay';

declare var ROT: any;

@injectable()
export class Display implements IDisplay {

    private display: any;

    constructor() {
        
    }

    public getDisplay = (): any => {

        if(!this.display) {
            this.display = new ROT.Display({ width: VIEW_DIMS.X, height: VIEW_DIMS.Y });
            document.body.appendChild(this.display.getContainer());
        }

        return this.display;
    }
}