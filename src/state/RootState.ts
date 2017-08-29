import OverworldState from './overworld/OverworldState';
import { injectable, inject } from "inversify";
import { GameEventHandler } from './../event/GameEventHandler';
import { TYPES } from './../types';
import { StateType } from './StateType';
import GameEventHubs from './../event/GameEventHubs';
import EventHub from './../event/EventHub';
import BaseState from './BaseState';

@injectable()
export default class RootState extends BaseState {

    public get gameEventHubs() {

        return this.gameEventHandler.gameEventHubs;
    }

    constructor(
        @inject(TYPES.GameEventHandler) private gameEventHandler: GameEventHandler) {

        super();
    }

    public get stateType(): symbol {

        return StateType.Root;
    }
}