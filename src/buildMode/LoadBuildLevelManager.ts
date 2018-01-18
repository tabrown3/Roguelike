import { injectable, inject } from "inversify";
import { StateType } from './../state/StateType';
import { TYPES } from './../types';
import IGameStateService from './../state/IGameStateService';
import IDrawable from './../display/IDrawable';
import Color from './../common/Color';
import { VIEW_DIMS } from './../worldConfig';
import Grid from './../common/Grid';
import InteractiveMenu from './../pause/InteractiveMenu';
import LoadBuildLevelState from "../state/buildMode/LoadBuildLevelState";
import ILoadBuildLevelManager from "./ILoadBuildLevelManager";
import GridUtil from "../common/util/GridUtil";

@injectable()
export default class LoadBuildLevelManager implements ILoadBuildLevelManager {

    constructor(
        @inject(StateType.LoadBuildLevel) private loadBuildLevelState: LoadBuildLevelState,
        @inject(TYPES.GameStateService) private gameStateService: IGameStateService) {

    }

    private textEntry: TextEntry;

    public init = () => {

        this.textEntry = new TextEntry();

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

                    _this.gameStateService.goTo(StateType.InitBuildMenu);
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

class TextEntry {

    private drawableGrid: Grid<IDrawable>;

    private enteredValue: string = '';
    private cursorGrid: Grid<IDrawable>;
    private enteredValueGrid: Grid<IDrawable>;

    constructor(initVal?: string) {

        this.cursorGrid = Grid.fill(1, 1, () => {

            return <IDrawable>{
                colorFore: new Color('F', 'F', 'F'),
                colorBack: new Color('F', 'F', 'F'),
                icon: ' '
            }
        });

        if(initVal) {

            this.setValue(initVal);
        }
        else {

            this.drawableGrid = this.cursorGrid;
        }
    }
    
    public getView = (): Grid<IDrawable> => {

        return this.drawableGrid;
    }

    private setValue = (val: string) => {

        this.enteredValue = val;
        this.enteredValueGrid = GridUtil.stringToGridDrawable(this.enteredValue);

        let tempGrid = Grid.fill<IDrawable>(this.enteredValue.length + 1, 1, () => null);
        tempGrid.superimpose(this.cursorGrid, this.enteredValue.length, 0);
        tempGrid.superimpose(this.enteredValueGrid, 0, 0);

        this.drawableGrid = tempGrid;//GridUtil.stringToGridDrawable(this.enteredValue);
    }

    public getValue = () => {

        return this.enteredValue;
    }

    public processKey = (code: string): boolean => { // returns whether the key was processed

        let keyWasProcessed = false;

        if(code !== 'Shift') {

            if (code.length === 1 && /[a-zA-Z/_.-]/.test(code)) {

                this.setValue(this.enteredValue + code);
                keyWasProcessed = true;
            }
            else if (code === 'Backspace') {

                this.setValue(this.enteredValue.substr(0, this.enteredValue.length - 1));
                keyWasProcessed = true;
            }
        }
        
        return keyWasProcessed;
    }
}