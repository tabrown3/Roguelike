import { PermissionType } from './PermissionType';
import { ActionType } from './ActionType';

export default interface ActionPermission {
    type: PermissionType;
    alternatives: ActionType[];
}