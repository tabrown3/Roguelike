import Grid from "../Grid";
import IDrawable from "../../display/IDrawable";
import Color from "../Color";
import StringUtil from "./StringUtil";

export default class GridUtil {

    // takes string, returns grid of characters
    public static stringToGrid = (inString: string, rowOrientation: boolean = true, useWordwrap: boolean = false, wordwrapOptions?: WordwrapOptions): Grid<string> => {

        let wrappedString: string[];

        let defaultWordwrapOptions: WordwrapOptions = {
            maxWidth: 50,
            trimResults: true
        };

        if(useWordwrap) {

            let completeOptions: WordwrapOptions;

            if(wordwrapOptions) {

                completeOptions = Object.assign(defaultWordwrapOptions, wordwrapOptions);
            }
            else {

                completeOptions = defaultWordwrapOptions;
            }

            wrappedString = StringUtil.wordwrap(inString, completeOptions.maxWidth, completeOptions.trimResults, false);
        }
        else {

            wrappedString = [inString];
        }

        let splitStrings = wrappedString.map(elem => elem.split(''));
        let stringGrid = new Grid(splitStrings);

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
    public static stringToGridDrawable = (inString: string, rowOrientation: boolean = true, useWordwrap: boolean = false, wordwrapOptions?: WordwrapOptions): Grid<IDrawable> => {

        return GridUtil.stringGridToDrawable(GridUtil.stringToGrid(inString, rowOrientation, useWordwrap, wordwrapOptions));
    }
}

type WordwrapOptions = {
    maxWidth: number,
    trimResults: boolean
};