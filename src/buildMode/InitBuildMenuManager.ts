import { injectable, inject } from "inversify";
import IInitBuildMenuManager from "./IInitBuildMenuManager";
import PauseState from "../state/overworld/PauseState";
import { StateType } from './../state/StateType';
import InitBuildMenuState from "../state/buildMode/InitBuildMenuState";
import InteractiveMenu from "../pause/InteractiveMenu";
import IGameStateService from "../state/IGameStateService";
import { TYPES } from './../types';
import { VIEW_DIMS } from './../worldConfig';
import Grid from './../common/Grid';
import Color from './../common/Color';
import IDrawable from './../display/IDrawable';

@injectable()
export default class InitBuildMenuManager implements IInitBuildMenuManager {

    constructor(
        @inject(StateType.InitBuildMenu) private initBuildMenuState: InitBuildMenuState,
        @inject(TYPES.GameStateService) private gameStateService: IGameStateService) {

    }

    private interactiveMenu: InteractiveMenu;

    public init = () => {

        this.interactiveMenu = new InteractiveMenu([
            {
                message: 'Back',
                action: () => this.gameStateService.goTo(StateType.Pause)
            },
            {
                message: 'New Level',
                action: () => console.log('New Level')
            },
            {
                message: 'Load Level',
                action: () => this.gameStateService.goTo(StateType.LoadBuildLevel)
            }
        ]);

        this.initBuildMenuState.setViewHandler(() => {

            let outGrid = Grid.fill(VIEW_DIMS.X, VIEW_DIMS.Y, () => {

                return <IDrawable>{
                    colorFore: new Color('F', 'F', 'F'),
                    colorBack: Color.black,
                    icon: ' '
                };
            });

            outGrid.superimpose(this.interactiveMenu.getView(), 12, 5);

            return outGrid.toArray();
        });

        this.initBuildMenuState.gameEventHubs.keyDownHub.addListener(this.getMenuKeyListener());
    }

    private getMenuKeyListener = (): IterableIterator<void> => {

        let _this = this;

        let outIterator = (function* (): IterableIterator<void> {

            while (true) {

                let keyDownEvent = yield;
                let keyPressed = keyDownEvent.key;

                if (keyPressed === 'Escape') {

                    _this.gameStateService.goTo(StateType.Pause);
                }
                else if (keyPressed === 'ArrowUp') {

                    _this.interactiveMenu.moveSelectorUp();
                }
                else if (keyPressed === 'ArrowDown') {

                    _this.interactiveMenu.moveSelectorDown();
                }
                else if (keyPressed === 'Enter') {

                    _this.interactiveMenu.executeMenuOption();
                }
            }
        })();

        outIterator.next();

        return outIterator;
    }
}