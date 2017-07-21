import { IEventHandler } from './IEventHandler';
import Vec2 from './Vec2';
import { injectable, inject } from "inversify";
import Color from './Color';
import Being from './Being';
import InspectionResult from './InspectionResult';
import Fixture from './Fixture';
import ActionRequest from './world/ActionRequest';
import ActionPermission from './world/ActionPermission';
import { ActionType } from './world/ActionType';
import { PermissionType } from './world/PermissionType';
import IWorldManager from './world/IWorldManager';
import { TYPES } from './types';

@injectable()
export class Player {

    public readonly being: Being;

    constructor(
        @inject(TYPES.WorldManager) private worldManager: IWorldManager) {

        this.being = new Being(
            "@",
            { r: 255, g: 255, b: 255 },
            { r: 0, g: 0, b: 0 }
        );

        this.worldManager.initEntity(this.being);
    }

    public update = (eventHandler: IEventHandler) => {

        let attemptLocalPos: Vec2;

        switch(eventHandler.getLastMove()) {
            case "w":
                attemptLocalPos = new Vec2(0, -1);
                break;
            case "d":
                attemptLocalPos = new Vec2(1, 0);
                break;
            case "s":
                attemptLocalPos = new Vec2(0, 1);
                break;
            case "a":
                attemptLocalPos = new Vec2(-1, 0);
                break;
            default:
        }

        if (attemptLocalPos) {

            this.attemptMove(attemptLocalPos);
        }
    }

    private attemptMove = (attemptLocalPos: Vec2) => {

        let worldPos = this.being.getPosLocal(attemptLocalPos);

        let request = {
            type: ActionType.Move,
            pos: worldPos,
            requestor: this.being
        };

        let response = this.worldManager.requestAction(request);

        if (response.type === PermissionType.Granted) {
            this.being.setPosLocal(attemptLocalPos);
            this.worldManager.commitAction(request);
        }
    }
}