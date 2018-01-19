import Grid from "../common/Grid";
import IDrawable from "../display/IDrawable";
import Color from "../common/Color";
import GridUtil from "../common/util/GridUtil";

export default class TextEntryComponent {

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

        if (initVal && this.isValidInput(initVal)) {

            this.setValue(initVal);
        }
        else {

            this.drawableGrid = this.cursorGrid;
        }
    }

    public getView = (): Grid<IDrawable> => {

        return this.drawableGrid;
    }

    public getValue = () => {

        return this.enteredValue;
    }

    public processKey = (code: string): boolean => { // returns whether the key was processed

        let keyWasProcessed = false;

        if (code !== 'Shift') {

            if (code.length === 1 && this.isValidInput(code)) {

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

    private setValue = (val: string) => {

        this.enteredValue = val;
        this.enteredValueGrid = GridUtil.stringToGridDrawable(this.enteredValue);

        let tempGrid = Grid.fill<IDrawable>(this.enteredValue.length + 1, 1, () => null);
        tempGrid.superimpose(this.cursorGrid, this.enteredValue.length, 0);
        tempGrid.superimpose(this.enteredValueGrid, 0, 0);

        this.drawableGrid = tempGrid;
    }

    // Returns true if the input string is a valid value for text entry
    private isValidInput = (inString: string): boolean => {

        return /^[a-zA-Z/_.-]+$/g.test(inString);
    }
}