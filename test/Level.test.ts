import Level from '../src/world/level/Level';

export default (function(){

    describe("Level class", function () {

        describe("outOfBounds method", function() {

            let level = new Level();

            // 5x5 tile world
            level.worldSpots = <any>
            [
                [0, 1, 2, 3, 4],
                [0, 1, 2, 3, 4],
                [0, 1, 2, 3, 4],
                [0, 1, 2, 3, 4],
                [0, 1, 2, 3, 4]
            ];

            it("should return false if within bounds", function () {

                expect(level.outOfBounds(0, 0)).toBe(false);
                expect(level.outOfBounds(0, 4)).toBe(false);
                expect(level.outOfBounds(4, 0)).toBe(false);
                expect(level.outOfBounds(4, 4)).toBe(false);
            });

            it("should return true if out of bounds", function () {

                // top left corner
                expect(level.outOfBounds(-1, 0)).toBe(true);
                expect(level.outOfBounds(0, -1)).toBe(true);
                expect(level.outOfBounds(-1, -1)).toBe(true);

                // top right corner
                expect(level.outOfBounds(5, 0)).toBe(true);
                expect(level.outOfBounds(4, -1)).toBe(true);
                expect(level.outOfBounds(5, -1)).toBe(true);

                // bottom right corner
                expect(level.outOfBounds(5, 4)).toBe(true);
                expect(level.outOfBounds(4, 5)).toBe(true);
                expect(level.outOfBounds(5, 5)).toBe(true);

                // bottom left corner
                expect(level.outOfBounds(0, 5)).toBe(true);
                expect(level.outOfBounds(-1, 4)).toBe(true);
                expect(level.outOfBounds(-1, 5)).toBe(true);
            });
        });
    });
}())

