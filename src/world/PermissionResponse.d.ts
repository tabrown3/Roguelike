import { PermissionType } from './PermissionType';
import { ActionType } from './ActionType';

export default interface PermissionResponse {
    type: PermissionType;
    alternatives: ActionType[];
}