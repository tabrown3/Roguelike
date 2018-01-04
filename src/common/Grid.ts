export default class Grid<T> {

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

        throw new TypeError('Grid.superimpose not implemented');
    }

    public map = <U>(mapFunc: (element: T) => U): Grid<U> => {

        throw new TypeError('Grid.map not implemented');
    }

    public toArray = (): T[][] => {

        let outArr = [];

        for (let column of this.dataArr) {
            outArr.push([...column]);
        }

        return outArr;
    }
}