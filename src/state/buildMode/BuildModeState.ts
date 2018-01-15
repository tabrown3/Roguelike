import { inject, injectable } from 'inversify';
import { childOf } from '../StateRegistry';
import { StateType } from '../StateType';
import BaseState from '../BaseState';

@injectable()
@childOf(StateType.Root)
export default class BuildModeState extends BaseState {

    public get stateType(): symbol {

        return StateType.BuildMode;
    }
}