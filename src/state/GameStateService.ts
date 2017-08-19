import { injectable, inject } from "inversify";
import { StateType } from './StateType';
import RootState from './RootState';
import OverworldState from './overworld/OverworldState';
import NavigationState from './overworld/NavigationState';
import IGameStateService from './IGameStateService';

@injectable()
export default class GameStateService implements IGameStateService {

    constructor(
        @inject(StateType.Root) private rootState: RootState,
        @inject(StateType.Overworld) private overworldState: OverworldState,
        @inject(StateType.Navigation) private navigationState: NavigationState) {
    }

    public init = () => {

    }
}