import Level from '../src/world/level/Level';
import SceneData from '../src/world/level/sceneData';
import Vec2 from '../src/common/Vec2';
import Scene from '../src/world/level/Scene';
import LevelData from '../src/world/level/LevelData';

export default (function(){

    describe('Level class', function () {

        describe('outOfBounds method', function() {

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

            it('should return false if within bounds', function () {

                expect(level.outOfBounds(0, 0)).toBe(false);
                expect(level.outOfBounds(0, 4)).toBe(false);
                expect(level.outOfBounds(4, 0)).toBe(false);
                expect(level.outOfBounds(4, 4)).toBe(false);
            });

            it('should return true if out of bounds', function () {

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

        describe('getScenesFromSceneData method', function() {

            let sceneDatas: SceneData[];

            beforeEach(function() {

                sceneDatas = [
                    {
                        name: 'Scene1',
                        camOrigin: new Vec2(0, 0),
                        transitions: [
                            { node: 'Scene2', transitionAt: new Vec2(2, 2) }
                        ]
                    },
                    {
                        name: 'Scene2',
                        camOrigin: new Vec2(2, 2),
                        transitions: [
                            { node: 'Scene1', transitionAt: new Vec2(1, 1) },
                            { node: 'Scene3', transitionAt: new Vec2(3, 3) }
                        ]
                    },
                    {
                        name: 'Scene3',
                        camOrigin: new Vec2(4, 4),
                        transitions: [
                            { node: 'Scene2', transitionAt: new Vec2(2, 2) }
                        ]
                    }
                ];
            });

            it('should correctly map name and camOrigin', function() {

                let scenes = Level.getScenesFromSceneData(sceneDatas);

                expect(scenes[0].name).toBe('Scene1');
                expect(scenes[0].camOrigin.equals(new Vec2(0, 0))).toBeTruthy();
                expect(scenes[0].transitions[0].transitionAt.equals(new Vec2(2, 2))).toBeTruthy();

                expect(scenes[1].name).toBe('Scene2');
                expect(scenes[1].camOrigin.equals(new Vec2(2, 2))).toBeTruthy();
                expect(scenes[1].transitions[0].transitionAt.equals(new Vec2(1, 1))).toBeTruthy();
                expect(scenes[1].transitions[1].transitionAt.equals(new Vec2(3, 3))).toBeTruthy();

                expect(scenes[2].name).toBe('Scene3');
                expect(scenes[2].camOrigin.equals(new Vec2(4, 4))).toBeTruthy();
                expect(scenes[2].transitions[0].transitionAt.equals(new Vec2(2, 2))).toBeTruthy();
                
            });

            it('should replace transition node strings w/ actual Scene objects', function() {

                let scenes = Level.getScenesFromSceneData(sceneDatas);

                expect(scenes[0].transitions[0].node instanceof Scene).toBeTruthy();
                expect(scenes[0].transitions[0].node).toBe(scenes[1]);

                expect(scenes[1].transitions[0].node instanceof Scene).toBeTruthy();
                expect(scenes[1].transitions[0].node).toBe(scenes[0]);
                expect(scenes[1].transitions[1].node instanceof Scene).toBeTruthy();
                expect(scenes[1].transitions[1].node).toBe(scenes[2]);

                expect(scenes[2].transitions[0].node instanceof Scene).toBeTruthy();
                expect(scenes[2].transitions[0].node).toBe(scenes[1]);
            });
        });

        describe('fromLevelData method', function() {

            let worldSpotFactory = (icon: string) => {

                return {
                    terrain: {
                        icon: icon,
                        colorFore: { r: 'A', g: 'B', b: 'C' },
                        colorBack: { r: 'A', g: 'B', b: 'C' },
                        navigable: true
                    }
                };
            }

            let levelData: LevelData = {

                worldSpots: [
                    [
                        worldSpotFactory('1'),
                        worldSpotFactory('2')
                    ],
                    [
                        worldSpotFactory('3'),
                        worldSpotFactory('4')
                    ]
                ],
                name: 'TestLevel',
                scenes: [],
                defaultScene: null,
                adjacentLevels: []
            };

            it('should correctly map world spot data', function() {

                let testLevel = Level.fromLevelData(levelData);

                expect(testLevel.worldSpots[0][0].terrain.icon).toBe('1');
                expect(testLevel.worldSpots[0][1].terrain.icon).toBe('2');
                expect(testLevel.worldSpots[1][0].terrain.icon).toBe('3');
                expect(testLevel.worldSpots[1][1].terrain.icon).toBe('4');

                expect(testLevel.worldSpots[0][0].terrain.colorFore.r).toBe('A');
            });
        });
    });
}());

