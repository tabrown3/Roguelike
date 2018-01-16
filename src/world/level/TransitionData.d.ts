import Vec2Data from '../../common/Vec2Data';
import Scene from './Scene';

export default interface TransitionData<T> {
    transitionAt: Vec2Data;
    node: T;
}