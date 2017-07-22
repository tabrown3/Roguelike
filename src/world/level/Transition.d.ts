import Vec2 from '../../common/Vec2';
import Scene from './Scene';

export default interface Transition<T> {
    transitionAt: Vec2;
    node: T;
}