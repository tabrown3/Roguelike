import Vec2 from '../../common/Vec2';
import Scene from './Scene';

export default interface Transition {
    transitionAt: Vec2;
    scene: Scene;
}