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

    public init = () => {

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

            let pauseText = "This is the PAUSE menu".split('');
            let pauseDrawables = pauseText.map((val) => {

                return <IDrawable> {
                    colorFore: new Color('F', 'F', 'F'),
                    colorBack: Color.black,
                    icon: val
                }
            });

            outArr[4].splice(0, pauseText.length, ...pauseDrawables);

            return outArr;
        });

        this.pauseState.gameEventHubs.keyDownHub.addListener(this.getMenuKeyListener());
    }

    private getMenuKeyListener = (): IterableIterator<void> => {

        let _this = this;

        let outIterator = (function* (): IterableIterator<void> {

            while (true) {

                let keyDownEvent = yield;
                let keyPressed = keyDownEvent.key;

                if (keyPressed === 'Escape') {

                    console.log('Attempting to UN-pause!!!');

                    _this.gameStateService.goTo(StateType.Navigation);
                }
                else if(keyPressed === 'w') {

                    console.log('MOVE UP');
                }
                else if(keyPressed === 's') {

                    console.log('MOVE DOWN');
                }
            }
        })();

        outIterator.next();

        return outIterator;
    }
}