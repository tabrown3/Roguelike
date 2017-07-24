import Vec2 from '../../common/Vec2';
import Transition from './Transition';

export default interface SceneData {
    name: string,
    camOrigin: Vec2,
    transitions: Transition<string>[];
}