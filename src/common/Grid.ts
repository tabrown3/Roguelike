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

        if(inGrid.width > this.width) {

            throw new TypeError('Input grid is too wide');
        }
        else if(inGrid.height > this.height) {

            throw new TypeError('Input grid is too tall');
        }
        else if ((xPos + inGrid.width > this.width) || (yPos + inGrid.height > this.height)) {

            throw new TypeError('Input grid would extend out of bounds at current position');
        }
        else if (xPos < 0 || yPos < 0) {

            throw new TypeError('Input coordinates must be positive');
        }

        for(let i=xPos; i<(xPos + inGrid.width); i++) {

            for(let j=yPos; j<(yPos + inGrid.height); j++) {

                this.dataArr[i][j] = inGrid.get(i-xPos, j-yPos);
            }
        }
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

    // Returns underlying array (not a copy like toArray)
    // public underlyingArray = (): T[][] => {

    //     return this.dataArr;
    // }

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

        this.dataArr[x][y] = elem;
    }

    public get = (x: number, y: number) => {

        return this.dataArr[x][y];
    }
}