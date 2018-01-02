import Vec2 from './common/Vec2';
import { injectable, inject } from "inversify";
import Color from './common/Color';
import Being from './Being';
import { ActionType } from './world/ActionType';
import { PermissionType } from './world/PermissionType';
import IWorldManager from './world/IWorldManager';
import { TYPES } from './types';
import GameStateManager from './state/RootState';
import { StateType } from './state/StateType';
import NavigationState from './state/overworld/NavigationState';


@injectable()
export class Player {

    public being: Being;

    constructor(
        @inject(TYPES.WorldManager) private worldManager: IWorldManager,
        @inject(StateType.Navigation) private navigationState: NavigationState) {

        
    }

    public init = () => {

        this.being = new Being(
            "@",
            new Color("0", "0", "0"),
            new Color("F", "F", "F")
        );

        this.worldManager.initEntity(this.being);

        let _this = this;

        let listenerIterator = (function* (): IterableIterator<void> {

            while (true) {

                _this.act(yield);
            }

        })();

        listenerIterator.next();

        this.navigationState.gameEventHubs.keyDownHub.addListener(listenerIterator);
    }

    public act = (keyDownEvent: any) => {

        let attemptLocalPos: Vec2;
        let char = keyDownEvent.key;

        switch (char) {
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
            this.navigationState.playerActionHub.publishEvent(this.being);
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

        if (response && response.type === PermissionType.Granted) {
            this.being.setPosLocal(attemptLocalPos);
            this.worldManager.commitAction(request);
        }
    }
}