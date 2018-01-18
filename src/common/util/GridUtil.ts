import Grid from "../Grid";
import IDrawable from "../../display/IDrawable";
import Color from "../Color";

export default class GridUtil {

    // takes string, returns grid of characters
    public static stringToGrid = (inString: string, rowOrientation: boolean = true): Grid<string> => {

        let splitString = inString.split('');
        let stringGrid = new Grid([splitString]);

        // The string would appear as a column without transposition;
        //  it's likely most people would expect a row, so defaulting to that
        if (rowOrientation) {

            stringGrid.transpose();
        }

        return stringGrid;
    }

    // shortcut mapping function; takes string grid, maps to drawable grid
    public static stringGridToDrawable = (inStringGrid: Grid<string>) => {

        return inStringGrid.map((val) => {

            return <IDrawable>{
                colorFore: new Color('F', 'F', 'F'),
                colorBack: Color.black,
                icon: val
            }
        });
    }

    // shortcut mapping function; takes string, return grid of drawables
    public static stringToGridDrawable = (inString: string, rowOrientation: boolean = true): Grid<IDrawable> => {

        return GridUtil.stringGridToDrawable(GridUtil.stringToGrid(inString, rowOrientation));
    }
}