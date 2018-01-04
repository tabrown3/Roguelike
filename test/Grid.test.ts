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

        xdescribe('superimpose method', function () {

            it('should superimpose grids if their dimensions and position are within bounds', function() {

            });

            it('should throw exception if input grid is larger in dimension (x or y) than original', function() {

            });

            it('should throw exception if input position would cause input grid to be out of bounds', function() {

            });
        });

        xdescribe('map method', function () {

            it('should return grid of identical dimension where each element has been transformed by the input map function', function() {

            });
        });
    });
}());