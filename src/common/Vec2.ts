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
}