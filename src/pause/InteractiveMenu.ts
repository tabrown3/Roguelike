import Grid from './../common/Grid';
import IDrawable from './../display/IDrawable';
import Color from './../common/Color';

export default class InteractiveMenu {

    private readonly drawableGrid: Grid<IDrawable>; // will be modified but never reassigned

    private readonly GRID_WIDTH: number = 25;
    private readonly GRID_HEIGHT: number; // assigned in constructor

    private readonly OPTION_HEIGHT: number = 2;
    private readonly OPTION_LEFT_PADDING: number = 1;

    private selectedOption: number = 0;

    constructor(private menuOptions: MenuOption[]) {

        let optionCount = menuOptions.length;
        this.GRID_HEIGHT = optionCount * (this.OPTION_HEIGHT);

        let tempGrid = Grid.fill(25, this.GRID_HEIGHT, () => ' ');

        let loopCount = 0;
        for (const option of menuOptions) {

            tempGrid.superimpose(this.stringToGrid(option.message), this.OPTION_LEFT_PADDING, loopCount * this.OPTION_HEIGHT);
            loopCount++;
        }

        this.drawableGrid = tempGrid.map((val) => {

            return <IDrawable>{
                colorFore: new Color('F', 'F', 'F'),
                colorBack: Color.black,
                icon: val
            }
        });

        this.drawableGrid.get(0, 0).icon = '*';
    }

    public moveSelectorUp = () => {

        if (this.selectedOption > 0) {

            let oldSelection = this.selectedOption--;
            this.moveSelectorSymbol(oldSelection, this.selectedOption);
        }
    }

    public moveSelectorDown = () => {

        if (this.selectedOption < (this.menuOptions.length - 1)) {

            let oldSelection = this.selectedOption++;
            this.moveSelectorSymbol(oldSelection, this.selectedOption);
        }
    }

    public executeMenuOption = () => {

        this.menuOptions[this.selectedOption].action();
    }

    public getView = (): Grid<IDrawable> => {

        return this.drawableGrid;
    }

    private moveSelectorSymbol = (oldSelection: number, newSelection: number) => {

        let oldDrawable = this.drawableGrid.get(0, oldSelection * this.OPTION_HEIGHT);
        oldDrawable.icon = ' ';

        let newDrawable = this.drawableGrid.get(0, newSelection * this.OPTION_HEIGHT);
        newDrawable.icon = '*';
    }

    private stringToGrid = (inString: string, rowOrientation: boolean = true): Grid<string> => {

        let splitString = inString.split('');
        let stringGrid = new Grid([splitString]);

        // The string would appear as a column without transposition;
        //  it's likely most people would expect a row, so defaulting to that
        if (rowOrientation) {

            stringGrid.transpose();
        }

        return stringGrid;
    }
}

type MenuOption = { message: string, action: () => void }