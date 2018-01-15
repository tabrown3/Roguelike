import { injectable, inject } from "inversify";
import IPauseManager from './IPauseManager';
import { StateType } from './../state/StateType';
import PauseState from './../state/overworld/PauseState';
import { TYPES } from './../types';
import IGameStateService from './../state/IGameStateService';
import IDrawable from './../display/IDrawable';
import Color from './../common/Color';
import { VIEW_DIMS } from './../worldConfig';
import Grid from './../common/Grid';
import InteractiveMenu from './InteractiveMenu';

@injectable()
export default class PauseManager implements IPauseManager {

    constructor(
        @inject(StateType.Pause) private pauseState: PauseState,
        @inject(TYPES.GameStateService) private gameStateService: IGameStateService) {

    }

    private interactiveMenu: InteractiveMenu;

    public init = () => {

        this.interactiveMenu = new InteractiveMenu([
            {
                message: 'Resume',
                action: () => this.gameStateService.goTo(StateType.Navigation)
            },
            {
                message: 'Option 2',
                action: () => console.log('Option 2')
            },
            {
                message: 'Option 3',
                action: () => console.log('Option 3')
            }
        ]);

        this.pauseState.setViewHandler(() => {

            let outGrid = Grid.fill(VIEW_DIMS.X, VIEW_DIMS.Y, () => {

                return <IDrawable> {
                    colorFore: new Color('F', 'F', 'F'),
                    colorBack: Color.black,
                    icon: ' '
                };
            });

            outGrid.superimpose(this.interactiveMenu.getView(), 12, 5);

            return outGrid.toArray();
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

                    _this.gameStateService.goTo(StateType.Navigation);
                }
                else if(keyPressed === 'w') {

                    _this.interactiveMenu.moveSelectorUp();
                }
                else if(keyPressed === 's') {
                    
                    _this.interactiveMenu.moveSelectorDown();
                }
                else if(keyPressed === 'Enter') {

                    _this.interactiveMenu.executeMenuOption();
                }
            }
        })();

        outIterator.next();

        return outIterator;
    }
}