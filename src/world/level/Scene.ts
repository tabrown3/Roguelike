import Vec2 from '../../common/Vec2';
import Transition from './Transition';
import ITranstionable from './ITransitionable';
import SceneData from './SceneData';

export default class Scene implements ITranstionable<Scene> {

    constructor(
        public name: string,
        public camOrigin: Vec2,
        public transitions: Transition<Scene>[]) {
    }

    public checkForTransition = (pos: Vec2): Transition<Scene> => {

        return this.transitions.find(item => Vec2.equal(item.transitionAt, pos));
    }

    public toSceneData = (): SceneData => {

        let outSceneData: SceneData = {
            name: this.name,
            camOrigin: this.camOrigin,
            transitions: this.getSceneDataTransitions()
        }

        return outSceneData;
    }

    private getSceneDataTransitions = (): Transition<string>[] => {

        let outTransitions: Transition<string>[] = [];

        for(let tran of this.transitions) {
            
            let outTran: Transition<string>;
            outTran.transitionAt = tran.transitionAt;
            outTran.node = tran.node.name;

            outTransitions.push(outTran);
        }

        return outTransitions;
    }
}