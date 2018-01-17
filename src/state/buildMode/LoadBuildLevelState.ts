import { StateType } from './../StateType';
import { injectable } from 'inversify';
import { childOf } from '../StateRegistry';
import BaseState from '../BaseState';

@injectable()
@childOf(StateType.BuildMode)
export default class LoadBuildLevelState extends BaseState {

    public get stateType(): symbol {

        return StateType.LoadBuildLevel;
    }
}