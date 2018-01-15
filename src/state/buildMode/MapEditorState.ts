import { StateType } from './../StateType';
import { injectable } from 'inversify';
import { childOf } from '../StateRegistry';
import BaseState from '../BaseState';

@injectable()
@childOf(StateType.BuildMode)
export default class MapEditorState extends BaseState {

    public get stateType(): symbol {

        return StateType.MapEditor;
    }

    // public freeze(): void {

    //     super.freeze();
    // }

    // public unfreeze(): void {

    //     super.unfreeze();
    // }
}