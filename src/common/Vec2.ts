import Vec2Data from './Vec2Data';
import IComparable from './IComparable';

export default class Vec2 implements IComparable<Vec2> {

    constructor(public x: number, public y: number) {

    }

    public static equal(vec1: Vec2, vec2: Vec2) {
        return vec1.equals(vec2);
    }

    public equals = (vec: Vec2): boolean => {
        return this.x === vec.x && this.y === vec.y;
    }

    public static fromVec2Data(data: Vec2Data) {

        return new Vec2(data.x, data.y);
    }

    public toVec2Data = (): Vec2Data => {

        return {
            x: this.x,
            y: this.y
        };
    }
}