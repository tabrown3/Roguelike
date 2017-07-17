import { IEventHandler } from './IEventHandler';
import Vec2 from './Vec2';
import { injectable, inject } from "inversify";
import Color from './Color';
import Being from './Being';
import InspectionResult from './InspectionResult';
import Fixture from './Fixture';
import ActionRequest from './world/ActionRequest';
import PermissionResponse from './world/PermissionResponse';

@injectable()
export class Player {

    public readonly being: Being;

    constructor() {

        this.being = new Being(
            "@",
            { r: 255, g: 255, b: 255 },
            { r: 0, g: 0, b: 0 }
        );
    }

    public update = (eventHandler: IEventHandler, requestionAction: (request: ActionRequest) => PermissionResponse) => {

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

        if(attemptLocalPos){

            let worldPos = this.being.getPosLocal(attemptLocalPos)
            // let inspectionResult = inspectPos(worldPos)

            // if (this.canMove(inspectionResult)) {
            //     this.being.setPosLocal(attemptLocalPos);
            // }
        }
    }

    // private canMove = (inspectionResult: InspectionResult): boolean => {

    //     let worldSpot = inspectionResult.worldSpot;

    //     let navigableSpot: boolean = worldSpot.navigable; // does this tile allow movement to it?
    //     let hasEntities: boolean = worldSpot.entities && worldSpot.entities.length > 0; // is there anything on this tile?

    //     let navigableFixtures = true;
    //     if(hasEntities) {
    //         let fixtures = <Fixture[]>worldSpot.entities.filter(entity => {
    //             return entity instanceof Fixture;
    //         });

    //         navigableFixtures = fixtures.every(fixture => fixture.navigable);
    //     }

    //     return navigableSpot && navigableFixtures;
    // }
}