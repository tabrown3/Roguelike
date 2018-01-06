import Grid from './../src/common/Grid';

export default (function() {

    describe('Grid class', function() {

        describe('toArray method', function () {

            it('should return a shallow copy of the grid\'s underlying array', function () {

                let testArray1 = [
                    //x=0    x=1
                    [1, 3], [2, 4]
                ];

                let testGrid1 = new Grid(testArray1);
                let outArr = testGrid1.toArray();

                expect(outArr[0][0]).toBe(1);
                expect(outArr[1][0]).toBe(2);
                expect(outArr[0][1]).toBe(3);
                expect(outArr[1][1]).toBe(4);
            });

            it('should not return an array that shares outer array or column references with the grid\'s underlying array', function () {

                let testArray1 = [
                    //x=0    x=1
                    [1, 3], [2, 4]
                ];

                let testGrid1 = new Grid(testArray1);
                let outArr = testGrid1.toArray();

                expect(outArr).not.toBe(testArray1);
                expect(outArr[0]).not.toBe(testArray1[0]);
                expect(outArr[1]).not.toBe(testArray1[1]);
            });

            it('should maintain references for each element', function() {

                let testArray1 = [
                    //x=0    x=1
                    [{ prop: 1 }, { prop: 2 }], [{ prop: 3 }, { prop: 4 }]
                ];

                let testGrid1 = new Grid(testArray1);
                let outArr = testGrid1.toArray();

                expect(outArr[0][0]).toBe(testArray1[0][0]);
                expect(outArr[0][1]).toBe(testArray1[0][1]);
                expect(outArr[1][0]).toBe(testArray1[1][0]);
                expect(outArr[1][1]).toBe(testArray1[1][1]);
            });
        });

        describe('transpose method', function() {

            it('should transpose square grids', function() {

                let testArray1 = [
                    //x=0      x=1      x=2
                    [1,4,7], [2,5,8], [3,6,9] 
                ];

                let testGrid1 = new Grid(testArray1);
                testGrid1.transpose();

                let outArray1 = testGrid1.toArray();
                expect(outArray1[0][0]).toBe(1);
                expect(outArray1[0][1]).toBe(2);
                expect(outArray1[0][2]).toBe(3);
                expect(outArray1[1][0]).toBe(4);
                expect(outArray1[1][1]).toBe(5);
                expect(outArray1[1][2]).toBe(6);
                expect(outArray1[2][0]).toBe(7);
                expect(outArray1[2][1]).toBe(8);
                expect(outArray1[2][2]).toBe(9);
                
                let testArray2 = [
                    //x=0    x=1
                    [1, 3], [2, 4]
                ];

                let testGrid2 = new Grid(testArray2);
                testGrid2.transpose();

                let outArray2 = testGrid2.toArray();
                expect(outArray2[0][0]).toBe(1);
                expect(outArray2[0][1]).toBe(2);
                expect(outArray2[1][0]).toBe(3);
                expect(outArray2[1][1]).toBe(4);

                let testArray3 = [
                    [1]
                ];

                let testGrid3 = new Grid(testArray3);
                testGrid3.transpose();

                let outArray3 = testGrid3.toArray();
                expect(outArray3[0][0]).toBe(1);
            });

            it('should transpose from wide grids', function() {

                let testArray1 = [
                    //x=0    x=1     x=2
                    [1, 4], [2, 5], [3, 6]
                ];

                let testGrid1 = new Grid(testArray1);
                testGrid1.transpose();

                let outArray1 = testGrid1.toArray();
                expect(outArray1[0][0]).toBe(1);
                expect(outArray1[0][1]).toBe(2);
                expect(outArray1[0][2]).toBe(3);
                expect(outArray1[1][0]).toBe(4);
                expect(outArray1[1][1]).toBe(5);
                expect(outArray1[1][2]).toBe(6);

                let testArray2 = [
                   //x=0 x=1
                    [1], [2]
                ];

                let testGrid2 = new Grid(testArray2);
                testGrid2.transpose();

                let outArray2 = testGrid2.toArray();
                expect(outArray1[0][0]).toBe(1);
                expect(outArray1[0][1]).toBe(2);
            });

            it('should transpose from tall grids', function() {

                let testArray1 = [
                    [1, 3, 5], [2, 4, 6]
                ];

                let testGrid1 = new Grid(testArray1);
                testGrid1.transpose();

                let outArray1 = testGrid1.toArray();
                expect(outArray1[0][0]).toBe(1);
                expect(outArray1[0][1]).toBe(2);
                expect(outArray1[1][0]).toBe(3);
                expect(outArray1[1][1]).toBe(4);
                expect(outArray1[2][0]).toBe(5);
                expect(outArray1[2][1]).toBe(6);

                let testArray2 = [
                    [1, 2]
                ];

                let testGrid2 = new Grid(testArray2);
                testGrid2.transpose();

                let outArray2 = testGrid2.toArray();
                expect(outArray2[0][0]).toBe(1);
                expect(outArray2[1][0]).toBe(2);
            });
        });

        describe('superimpose method', function () {

            it('should superimpose grids if their dimensions and position are within bounds', function() {

                let testArray1 = [
                    //x=0      x=1      x=2
                    [1, 4, 7], [2, 5, 8], [3, 6, 9]
                ];

                let testGrid1 = new Grid(testArray1);

                testGrid1.superimpose(testGrid1, 0, 0); // superimpose on itself

                expect(testGrid1.get(0, 0)).toBe(1);
                expect(testGrid1.get(0, 2)).toBe(7);
                expect(testGrid1.get(2, 0)).toBe(3);

                let testArray2 = [
                    [100, 200]
                ];

                let testGrid2 = new Grid(testArray2);

                testGrid1.superimpose(testGrid2, 0,0);

                expect(testGrid1.get(0, 0)).toBe(100);
                expect(testGrid1.get(0, 1)).toBe(200);

                testGrid1.superimpose(testGrid2, 0, 1);

                expect(testGrid1.get(0, 1)).toBe(100);
                expect(testGrid1.get(0, 2)).toBe(200);

                let testArray3 = [
                    [300], [400]
                ];

                let testGrid3 = new Grid(testArray3);

                testGrid1.superimpose(testGrid3, 0, 0);
                
                expect(testGrid1.get(0, 0)).toBe(300);
                expect(testGrid1.get(1, 0)).toBe(400);

                testGrid1.superimpose(testGrid3, 1, 0);

                expect(testGrid1.get(1, 0)).toBe(300);
                expect(testGrid1.get(2, 0)).toBe(400);
            });

            it('should throw exception if input grid is wider than original', function() {

                // 2x2 grid
                let testArray1 = [
                    //x=0    x=1
                    [1, 3], [2, 4]
                ];

                let testGrid1 = new Grid(testArray1);

                // 3x2 grid; Too wide
                let testArray2 = [
                    //x=0    x=1     x=2
                    [1, 4], [2, 5], [3, 6]
                ];

                let testGrid2 = new Grid(testArray2);

                expect(() => {

                    testGrid1.superimpose(testGrid2, 0, 0);

                }).toThrow(new TypeError('Input grid is too wide'));
            });

            xit('should throw exception if input coords are outside grid dimensions', function () {

                throw new TypeError('test not implemented');
            });

            it('should throw exception if input grid is taller than original', function () {

                // 2x2 grid
                let testArray1 = [
                    //x=0    x=1
                    [1, 3], [2, 4]
                ];

                let testGrid1 = new Grid(testArray1);

                // 2x3 grid; too tall
                let testArray2 = [
                    [1, 3, 5], [2, 4, 6]
                ];

                let testGrid2 = new Grid(testArray2);

                expect(() => { 

                    testGrid1.superimpose(testGrid2, 0, 0);

                }).toThrow(new TypeError('Input grid is too tall'));
            });

            it('should throw exception if input position would cause input grid to be out of bounds', function() {

                let testArray1 = [
                    //x=0      x=1      x=2
                    [1, 4, 7], [2, 5, 8], [3, 6, 9]
                ];

                let testGrid1 = new Grid(testArray1);

                let testArray2 = [
                    [100, 200]
                ];

                let testGrid2 = new Grid(testArray2);
                
                let testArray3 = [
                    [100], [200]
                ];

                let testGrid3 = new Grid(testArray3);

                expect(() => {

                    testGrid1.superimpose(testGrid2, 0, 1);

                }).not.toThrow(new TypeError('Input grid would extend out of bounds at current position'));

                expect(() => {

                    testGrid1.superimpose(testGrid3, 1, 0);

                }).not.toThrow(new TypeError('Input grid would extend out of bounds at current position'));

                expect(() => {

                    testGrid1.superimpose(testGrid2, 0, 2);

                }).toThrow(new TypeError('Input grid would extend out of bounds at current position'));

                expect(() => {

                    testGrid1.superimpose(testGrid3, 2, 0);

                }).toThrow(new TypeError('Input grid would extend out of bounds at current position'));
            });

            it('should throw exception if input coordinates are negative', function () {

                let testArray1 = [
                    //x=0      x=1      x=2
                    [1, 4, 7], [2, 5, 8], [3, 6, 9]
                ];

                let testGrid1 = new Grid(testArray1);

                let testArray2 = [
                    [100, 200]
                ];

                let testGrid2 = new Grid(testArray2);

                let testArray3 = [
                    [100], [200]
                ];

                let testGrid3 = new Grid(testArray3);

                expect(() => {

                    testGrid1.superimpose(testGrid2, -1, 0);

                }).toThrow(new TypeError('Input coordinates must be positive'));

                expect(() => {

                    testGrid1.superimpose(testGrid3, 0, -1);

                }).toThrow(new TypeError('Input coordinates must be positive'));
            });
        });

        describe('subset method', function() {

            it('should return a subset of the grid designated by the starting coordinates and widths', function() {

                let testArray1 = [
                    //x=0      x=1      x=2
                    [1, 4, 7], [2, 5, 8], [3, 6, 9]
                ];

                let testGrid1 = new Grid(testArray1);

                let subGrid1 = testGrid1.subset(0, 0, 3, 1);

                expect(subGrid1.getWidth()).toBe(3);
                expect(subGrid1.getHeight()).toBe(1);
                expect(subGrid1.get(0, 0)).toBe(1);
                expect(subGrid1.get(1, 0)).toBe(2);
                expect(subGrid1.get(2, 0)).toBe(3);

                let testArray2 = [
                    //x=0      x=1      x=2
                    [1, 4, 7], [2, 5, 8], [3, 6, 9]
                ];

                let testGrid2 = new Grid(testArray2);

                let subGrid2 = testGrid2.subset(2, 0, 1, 3);

                expect(subGrid2.getWidth()).toBe(1);
                expect(subGrid2.getHeight()).toBe(3);
                expect(subGrid2.get(0, 0)).toBe(3);
                expect(subGrid2.get(0, 1)).toBe(6);
                expect(subGrid2.get(0, 2)).toBe(9);

                let testArray3 = [
                    //x=0      x=1      x=2
                    [1, 4, 7], [2, 5, 8], [3, 6, 9]
                ];

                let testGrid3 = new Grid(testArray3);

                let subGrid3 = testGrid3.subset(2, 2, 1, 1);

                expect(subGrid3.getWidth()).toBe(1);
                expect(subGrid3.getHeight()).toBe(1);
                expect(subGrid3.get(0, 0)).toBe(9);
            });

            it('should throw exception if input coords are negative', function() {

                let testArray1 = [
                    //x=0      x=1      x=2
                    [1, 4, 7], [2, 5, 8], [3, 6, 9]
                ];

                let testGrid1 = new Grid(testArray1);

                expect(() => {

                    testGrid1.subset(0, -1, 1, 1);
                }).toThrow(new TypeError('Input coordinates must be positive'));

                expect(() => {

                    testGrid1.subset(-1, 0, 1, 1);
                }).toThrow(new TypeError('Input coordinates must be positive'));
            });

            it('should throw exception if input coords are outside grid dimensions', function() {

                let testArray1 = [
                    //x=0      x=1      x=2
                    [1, 4, 7], [2, 5, 8], [3, 6, 9]
                ];

                let testGrid1 = new Grid(testArray1);

                expect(() => {

                    testGrid1.subset(3, 2, 1, 1);
                }).toThrow(new TypeError('Input coordinates are greater than or equal to grid width or height'));

                expect(() => {

                    testGrid1.subset(2, 3, 1, 1);
                }).toThrow(new TypeError('Input coordinates are greater than or equal to grid width or height'));
            });

            it('should throw exception if input width would cause subset to be out of bounds', function() {

                let testArray1 = [
                    //x=0      x=1      x=2
                    [1, 4, 7], [2, 5, 8], [3, 6, 9]
                ];

                let testGrid1 = new Grid(testArray1);

                expect(() => {

                    testGrid1.subset(0, 0, 4, 1);
                }).toThrow(new TypeError('Input grid would extend out of bounds at current position'));
            });

            it('should throw exception if input height would cause subset to be out of bounds', function() {

                let testArray1 = [
                    //x=0      x=1      x=2
                    [1, 4, 7], [2, 5, 8], [3, 6, 9]
                ];

                let testGrid1 = new Grid(testArray1);

                expect(() => {

                    testGrid1.subset(0, 0, 1, 4);
                }).toThrow(new TypeError('Input grid would extend out of bounds at current position'));
            });
        });

        describe('map method', function () {

            it('should return grid of identical dimension where each element has been transformed by the input map function', function() {

                let testArray1 = [
                    //x=0      x=1      x=2
                    [1, 4, 7], [2, 5, 8], [3, 6, 9]
                ];

                let testGrid1 = new Grid(testArray1);

                let mappedGrid = testGrid1.map((elem, x, y) => {

                    return elem - 1;
                });

                let outArray1 = mappedGrid.toArray();

                expect(outArray1[0][0]). toBe(0);
                expect(outArray1[0][2]).toBe(6);
                expect(outArray1[2][0]).toBe(2);
                expect(outArray1[2][2]).toBe(8);
            });

            it('should transform each element to whatever type is returned from map function', function() {

                let testArray1 = [
                    [1, 3, 5], [2, 4, 6]
                ];

                let testGrid1 = new Grid(testArray1);

                let mappedGrid = testGrid1.map((elem, x, y) => {

                    return {prop: elem};
                });

                let outArray1 = mappedGrid.toArray();

                expect(outArray1[0][0].prop).toBe(1);
                expect(outArray1[0][2].prop).toBe(5);
                expect(outArray1[1][0].prop).toBe(2);
                expect(outArray1[1][2].prop).toBe(6);
            });

            it('should iterate through all elements of first column, then move to the next, etc', function() {

                let testArray1 = [
                    //x=0      x=1      x=2
                    [1, 4, 7], [2, 5, 8], [3, 6, 9]
                ];

                let testGrid1 = new Grid(testArray1);

                let coordArr: {x: number, y: number}[] = [];

                let mappedGrid = testGrid1.map((elem, x, y) => {

                    coordArr.push({x: x, y: y});
                    return;
                });

                expect(coordArr[0].x).toBe(0); expect(coordArr[0].y).toBe(0);
                expect(coordArr[1].x).toBe(0); expect(coordArr[1].y).toBe(1);
                expect(coordArr[2].x).toBe(0); expect(coordArr[2].y).toBe(2);
                expect(coordArr[6].x).toBe(2); expect(coordArr[6].y).toBe(0);
                expect(coordArr[7].x).toBe(2); expect(coordArr[7].y).toBe(1);
                expect(coordArr[8].x).toBe(2); expect(coordArr[8].y).toBe(2);
            });
        });

        describe('Symbol.iterator method', function() {

            it('should allow Grid objects to be iterated over using for-of syntax', function() {

                let testArray1 = [
                    [1, 3, 5], [2, 4, 6]
                ];

                let testGrid1 = new Grid(testArray1);

                let testOutArr = [];

                for(let column of testGrid1) {
                    for(let elem of column) {

                        testOutArr.push(elem);
                    }
                }

                expect(testOutArr[0]).toBe(1);
                expect(testOutArr[1]).toBe(3);
                expect(testOutArr[2]).toBe(5);
                expect(testOutArr[3]).toBe(2);
                expect(testOutArr[4]).toBe(4);
                expect(testOutArr[5]).toBe(6);
            });
        });
    });
}());