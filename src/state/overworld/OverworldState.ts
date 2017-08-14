import GameState from '../GameState';
import IGameEventHandler from '../../event/IGameEventHandler';
import { StateType } from '../StateType';
import GameEventHubs from './../../event/GameEventHubs';
import NavigationSubState from './NavigationSubState';

export default class OverworldState implements GameState {

    public readonly navigationSubState: NavigationSubState = new NavigationSubState();

    private _gameEventHubs: GameEventHubs = new GameEventHubs();
    private currentSubState: GameState = this.navigationSubState;

    constructor() {

        let _this = this; 

        // TODO: Seriously, refactor this to "relay" pattern where
        //  Hub has "relay" and "removeRelay" methods or something
        var bob1: IterableIterator<void> = (function* (): IterableIterator<void> {

            while (true)
                _this.getCurrentSubState().gameEventHubs.keyDownHub.publishEvent(yield);
        }());

        var bob2: IterableIterator<void> = (function* (): IterableIterator<void> {

            while (true)
                _this.getCurrentSubState().gameEventHubs.worldTickHub.publishEvent(yield);
        }());

        bob1.next();
        this.gameEventHubs.keyDownHub.addListener(bob1);
        bob2.next();
        this.gameEventHubs.worldTickHub.addListener(bob2);
    }

    public get stateType(): StateType {

        return StateType.Overworld;
    } 

    public get gameEventHubs() {

        return this._gameEventHubs;
    }

    public getCurrentSubState = (): GameState => {

        return this.currentSubState;
    }

    public getCurrentSubStateType = (): StateType => {

        return this.currentSubState.stateType;
    }
}