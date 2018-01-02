import { IWorld } from './IWorld';
import { Player } from '../Player';
import { injectable, inject } from "inversify";
import { TYPES } from '../types';
import IWorldManager from './IWorldManager';
import IDrawable from '../display/IDrawable';

@injectable()
export class World implements IWorld {

    constructor(
        @inject(TYPES.Player) private player: Player,
        @inject(TYPES.WorldManager) private worldManager: IWorldManager) {
    }

    public init = () => {

        this.player.init();
        this.worldManager.init();
    }
}