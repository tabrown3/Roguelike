import Vec2 from '../../common/Vec2';
import Transition from './Transition';


export default interface ITransitionable<T> {
    checkForTransition: (pos: Vec2) => Transition<T>;
}