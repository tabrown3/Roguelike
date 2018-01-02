import { injectable, inject } from "inversify";
import IPauseManager from './IPauseManager';
import { StateType } from './../state/StateType';
import PauseState from './../state/overworld/PauseState';
import { TYPES } from './../types';
import IGameStateService from './../state/IGameStateService';
import IDrawable from './../display/IDrawable';
import Color from './../common/Color';
import { VIEW_DIMS } from './../worldConfig';

@injectable()
export default class PauseManager implements IPauseManager {

    constructor(
        @inject(StateType.Pause) private pauseState: PauseState,
        @inject(TYPES.GameStateService) private gameStateService: IGameStateService) {

    }

    init = () => {

        this.pauseState.setViewHandler(() => {

            let myDrawable: IDrawable = {
                colorFore: new Color('F', 'F', 'F'),
                colorBack: Color.black,
                icon: '*'
            };

            let outArr: IDrawable[][] = [];

            for (let i=0; i<VIEW_DIMS.X; i++) {

                let tempArr: IDrawable[] = [];

                for (let j=0; j<VIEW_DIMS.Y; j++) {
                    tempArr.push(myDrawable);
                }

                outArr.push(tempArr);
            }

            return outArr;
        });
    }
}