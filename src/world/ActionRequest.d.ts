import { ActionType } from './ActionType';
import Vec2 from './../common/Vec2';
import Being from '../Being';

export default interface ActionRequest {
    type: ActionType;
    pos: Vec2;
    requestor: Being;
}