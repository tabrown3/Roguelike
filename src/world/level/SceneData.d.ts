import Vec2 from '../../common/Vec2';
import Vec2Data from '../../common/Vec2Data';
import TransitionData from './TransitionData';

export default interface SceneData {
    name: string,
    camOrigin: Vec2Data,
    transitions: TransitionData<string>[];
}