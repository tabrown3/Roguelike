import GridUtil from "../src/common/util/GridUtil";

export default (function() {

    describe('GridUtil class', function() {

        describe('stringToGrid method', function() {

            it('should transform an input string into a grid of chars defaulted to row orientation', function() {

                let stringGrid = GridUtil.stringToGrid('Hello World!');

                // guarantee row orientation
                expect(stringGrid.getWidth()).toBe(12);
                expect(stringGrid.getHeight()).toBe(1);

                expect(stringGrid.get(0, 0)).toBe('H');
                expect(stringGrid.get(1, 0)).toBe('e');
                expect(stringGrid.get(10, 0)).toBe('d');
                expect(stringGrid.get(11, 0)).toBe('!');
            });

            it('should allow orientation to be set to column instead of default row', function() {

                let stringGrid = GridUtil.stringToGrid('Hello World!', false);

                // guarantee column orientation
                expect(stringGrid.getWidth()).toBe(1);
                expect(stringGrid.getHeight()).toBe(12);

                expect(stringGrid.get(0, 0)).toBe('H');
                expect(stringGrid.get(0, 1)).toBe('e');
                expect(stringGrid.get(0, 10)).toBe('d');
                expect(stringGrid.get(0, 11)).toBe('!');
            });

            it('should default word wrap to max width of 50 and trim results', function() {

                let stringGrid = GridUtil.stringToGrid('0123 0123 0123 0123 0123 0123 0123 0123 0123 0123 0123 0123 ', true, true);

                expect(stringGrid.getWidth()).toBe(49); // last space char of top string was trimmed; that's why it's 49 in width
                expect(stringGrid.getHeight()).toBe(2);

                expect(stringGrid.get(0, 0)).toBe('0');
                expect(stringGrid.get(1, 0)).toBe('1');
                expect(stringGrid.get(47, 0)).toBe('2');
                expect(stringGrid.get(48, 0)).toBe('3');

                expect(stringGrid.get(0, 1)).toBe('0');
                expect(stringGrid.get(1, 1)).toBe('1');
                expect(stringGrid.get(47, 1)).toBe(' ');
                expect(stringGrid.get(48, 1)).toBe(' ');
            });
        });

        describe('stringGridToDrawable method', function() {

            it('should map Grid<string> to Grid<IDrawable> with defaulted IDrawable values', function() {

                let stringGrid = GridUtil.stringToGrid('0123 0123 0123 0123 0123 0123 0123 0123 0123 0123 0123 0123 ', true, true);

                let drawableGrid = GridUtil.stringGridToDrawable(stringGrid);

                expect(drawableGrid.get(0, 0).icon).toBe('0');
                expect(drawableGrid.get(1, 0).icon).toBe('1');
                expect(drawableGrid.get(47, 0).icon).toBe('2');
                expect(drawableGrid.get(48, 0).icon).toBe('3');

                expect(drawableGrid.get(0, 1).icon).toBe('0');
                expect(drawableGrid.get(1, 1).icon).toBe('1');
                expect(drawableGrid.get(47, 1).icon).toBe(' ');
                expect(drawableGrid.get(48, 1).icon).toBe(' ');

                expect(drawableGrid.get(0, 0).colorBack.getFull()).toBe('#000');
                expect(drawableGrid.get(48, 1).colorBack.getFull()).toBe('#000');
                
                expect(drawableGrid.get(0, 0).colorFore.getFull()).toBe('#FFF');
                expect(drawableGrid.get(48, 1).colorFore.getFull()).toBe('#FFF');
            });
        });

        describe('stringToGridDrawable method', function() {

            it('should map a string to Grid<IDrawable> with defaulted IDrawable values', function() {

                let drawableGrid = GridUtil.stringToGridDrawable('0123 0123 0123 0123 0123 0123 0123 0123 0123 0123 0123 0123 ', true, true);

                expect(drawableGrid.get(0, 0).icon).toBe('0');
                expect(drawableGrid.get(1, 0).icon).toBe('1');
                expect(drawableGrid.get(47, 0).icon).toBe('2');
                expect(drawableGrid.get(48, 0).icon).toBe('3');

                expect(drawableGrid.get(0, 1).icon).toBe('0');
                expect(drawableGrid.get(1, 1).icon).toBe('1');
                expect(drawableGrid.get(47, 1).icon).toBe(' ');
                expect(drawableGrid.get(48, 1).icon).toBe(' ');

                expect(drawableGrid.get(0, 0).colorBack.getFull()).toBe('#000');
                expect(drawableGrid.get(48, 1).colorBack.getFull()).toBe('#000');

                expect(drawableGrid.get(0, 0).colorFore.getFull()).toBe('#FFF');
                expect(drawableGrid.get(48, 1).colorFore.getFull()).toBe('#FFF');
            });
        });
    });
}());