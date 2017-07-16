import Entity from './Entity';

export default abstract class Fixture extends Entity {

    public abstract get structureKey(): symbol;
    public abstract get navigable(): boolean;
}