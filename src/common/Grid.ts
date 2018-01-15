export default class Grid<T> implements Iterable<T[]> {

    private dataArr: T[][] = [];
    private width: number = 0;
    private height: number = 0;

    constructor(inArr: T[][]) {

        for(let column of inArr) {
            this.dataArr.push([...column]);
        }

        this.width = inArr.length;

        if(this.width > 0) {

            this.height = inArr[0].length;
        }
        else {

            this.height = 0;
        }
    }

    public transpose = (): void => {

        if(this.width > 0 && this.height > 0) {

            let transposedArr = [];

            for(let i=0; i<this.width; i++) {

                for(let j=0; j<this.height; j++) {

                    if(i===0)
                        transposedArr.push([]);

                    transposedArr[j].push(this.dataArr[i][j]);
                }
            }

            this.dataArr = transposedArr;

            let swapTemp = this.height;
            this.height = this.width;
            this.width = swapTemp;
        }
    }

    public superimpose = (inGrid: Grid<T>, xPos: number, yPos: number): void => {

        this.pointBoundaryCheck(this.width, this.height, xPos, yPos);

        if(inGrid.width > this.width) {

            throw new TypeError('Input grid is too wide');
        }
        else if(inGrid.height > this.height) {

            throw new TypeError('Input grid is too tall');
        }
        else if ((xPos + inGrid.width > this.width) || (yPos + inGrid.height > this.height)) {

            throw new TypeError('Input grid would extend out of bounds at current position');
        }

        for(let i=xPos; i<(xPos + inGrid.width); i++) {

            for(let j=yPos; j<(yPos + inGrid.height); j++) {

                //this.dataArr[i][j] = inGrid.get(i-xPos, j-yPos);
                this.set(inGrid.get(i - xPos, j - yPos), i, j);
            }
        }
    }

    public subset = (xPos: number, yPos: number, width: number, height: number): Grid<T> => {

        this.pointBoundaryCheck(this.width, this.height, xPos, yPos);

        if ((xPos + width > this.width) || (yPos + height > this.height)) {

            throw new TypeError('Input grid would extend out of bounds at current position');
        }
        
        let outArr: T[][] = [];

        for (let i = xPos; i < (xPos + width); i++) {

            outArr.push([]);

            for (let j = yPos; j < (yPos + height); j++) {

                outArr[i - xPos][j - yPos] = this.get(i, j);
            }
        }

        return new Grid<T>(outArr);
    }

    public map = <U>(mapFunc: (element: T, x?: number, y?: number) => U): Grid<U> => {

        let outArr: U[][] = [];

        for (let i = 0; i < this.width; i++) {

            outArr.push([]);

            for (let j = 0; j < this.height; j++) {

                outArr[i].push(mapFunc(this.dataArr[i][j], i, j));
            }
        }

        return new Grid(outArr);
    }

    // Creates copy
    public toArray = (): T[][] => {

        let outArr = [];

        for (let column of this.dataArr) {
            outArr.push([...column]);
        }

        return outArr;
    }

    // allows me to pass a Grid to for-of; iterator returns columns of Grid
    public [Symbol.iterator] = () => {

        let matrix = this.dataArr;

        return (function* (): IterableIterator<T[]> {

            for (let column of matrix) {

                yield [...column]; // shallow copy of column
            }
        }());
    }

    public set = (elem: T, x: number, y: number) => {

        this.pointBoundaryCheck(this.width, this.height, x, y);

        this.dataArr[x][y] = elem;
    }

    public get = (x: number, y: number) => {

        this.pointBoundaryCheck(this.width, this.height, x, y);

        return this.dataArr[x][y];
    }

    public getWidth = () => {

        return this.width;
    }

    public getHeight = () => {

        return this.height;
    }

    public clone = () => {

        return new Grid(this.dataArr);
    }

    // creates a new grid with width and height specified, filled with
    //  values returned by fillFunc
    public static fill = <C>(width: number, height: number, fillFunc: (x: number, y: number) => C): Grid<C> => {

        let outArr: C[][] = [];

        for(let i=0; i<width; i++) {

            outArr.push([]);

            for(let j=0; j<height; j++) {
                
                outArr[i].push(fillFunc(i, j));
            }
        }

        return new Grid(outArr);
    }

    private pointBoundaryCheck = (width: number, height: number, x: number, y: number) => {

        if (x >= width || y >= height) {

            throw new TypeError('Input coordinates are greater than or equal to grid width or height');
        }
        else if (x < 0 || y < 0) {

            throw new TypeError('Input coordinates must be positive');
        }
    }
}