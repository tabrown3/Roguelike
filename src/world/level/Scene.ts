import Vec2 from '../../common/Vec2';
import Transition from './Transition';
import ITranstionable from './ITransitionable';

export default class Scene implements ITranstionable<Scene> {

    constructor(
        public name: string,
        public camOrigin: Vec2,
        public transitions: Transition<Scene>[]) {
    }

    public checkForTransition = (pos: Vec2): Transition<Scene> => {

        return this.transitions.find(item => Vec2.equal(item.transitionAt, pos));
    }
}