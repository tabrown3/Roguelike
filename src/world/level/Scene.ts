import Vec2 from '../../common/Vec2';
import Transition from './Transition';

export default class Scene {

    constructor(
        public name: string,
        public camOrigin: Vec2,
        public transitions: Transition[]) {
    }

    public checkForTransition = (pos: Vec2): Transition => {

        return this.transitions.find(item => Vec2.equal(item.transitionAt, pos));
    }
}