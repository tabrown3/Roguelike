import { injectable, inject } from "inversify";
import { StateType } from './../state/StateType';
import { TYPES } from './../types';
import IGameStateService from './../state/IGameStateService';
import IDrawable from './../display/IDrawable';
import Color from './../common/Color';
import { VIEW_DIMS } from './../worldConfig';
import Grid from './../common/Grid';
import InteractiveMenu from './../ui/InteractiveMenu';
import LoadBuildLevelState from "../state/buildMode/LoadBuildLevelState";
import ILoadBuildLevelManager from "./ILoadBuildLevelManager";
import GridUtil from "../common/util/GridUtil";
import TextEntryComponent from "../ui/TextEntryComponent";

@injectable()
export default class LoadBuildLevelManager implements ILoadBuildLevelManager {

    constructor(
        @inject(StateType.LoadBuildLevel) private loadBuildLevelState: LoadBuildLevelState,
        @inject(TYPES.GameStateService) private gameStateService: IGameStateService) {

    }

    private textEntry: TextEntryComponent;

    public init = () => {

        this.textEntry = new TextEntryComponent();

        this.loadBuildLevelState.setViewHandler(() => {

            let outGrid = Grid.fill(VIEW_DIMS.X, VIEW_DIMS.Y, () => {

                return <IDrawable>{
                    colorFore: new Color('F', 'F', 'F'),
                    colorBack: Color.black,
                    icon: ' '
                };
            });

            outGrid.superimpose(GridUtil.stringToGridDrawable('Enter Level Path:'), 10, 9);
            outGrid.superimpose(this.textEntry.getView(), 10, 10);

            return outGrid.toArray();
        });

        this.loadBuildLevelState.gameEventHubs.keyDownHub.addListener(this.getMenuKeyListener());
    }

    private getMenuKeyListener = (): IterableIterator<void> => {

        let _this = this;

        let outIterator = (function* (): IterableIterator<void> {

            while (true) {

                let keyDownEvent = yield;
                let keyPressed = keyDownEvent.key;

                if (keyPressed === 'Escape') {

                    _this.gameStateService.transitionTo(StateType.InitBuildMenu);
                }
                else if(_this.textEntry.processKey(keyPressed)) {

                }
                else if(keyPressed === 'Enter') {

                    console.log(_this.textEntry.getValue())
                }
            }
        })();

        outIterator.next();

        return outIterator;
    }
}