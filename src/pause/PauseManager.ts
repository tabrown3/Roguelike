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
import InteractiveMenu from './../ui/InteractiveMenu';

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
                action: () => this.gameStateService.transitionTo(StateType.Navigation)
            },
            {
                message: 'Build Mode',
                action: () => this.gameStateService.transitionTo(StateType.InitBuildMenu)
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

                    _this.gameStateService.transitionTo(StateType.Navigation);
                }
                else if(keyPressed === 'ArrowUp') {

                    _this.interactiveMenu.moveSelectorUp();
                }
                else if (keyPressed === 'ArrowDown') {
                    
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