import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { StateType } from './state/StateType';
import { Game } from './Game';
import { World } from './world/World';
import { ViewEngine } from './display/ViewEngine';
import { GameEventHandler } from './event/GameEventHandler';
import { Display } from './display/Display';
import { Player } from './Player';
import WorldManager from './world/WorldManager';
import Scheduler from './Scheduler';
import WorldMap from './world/WorldMap';
import RootState from './state/RootState';
import OverworldState from './state/overworld/OverworldState';
import NavigationState from './state/overworld/NavigationState';
import GameStateService from './state/GameStateService';
import GameStateInitializer from './state/GameStateInitializer';
import PauseState from './state/overworld/PauseState';

var container = new Container();
container.bind(TYPES.Game).to(Game);
container.bind(TYPES.World).to(World);
container.bind(TYPES.ViewEngine).to(ViewEngine);
container.bind(TYPES.Display).to(Display).inSingletonScope();
container.bind(TYPES.GameEventHandler).to(GameEventHandler).inSingletonScope();
container.bind(TYPES.Player).to(Player).inSingletonScope();
container.bind(TYPES.WorldManager).to(WorldManager).inSingletonScope();
container.bind(TYPES.Scheduler).to(Scheduler).inSingletonScope();
container.bind(TYPES.WorldMap).to(WorldMap).inSingletonScope();
container.bind(TYPES.GameStateService).to(GameStateService).inSingletonScope();
container.bind(TYPES.GameStateInitializer).to(GameStateInitializer);

container.bind(StateType.Root).to(RootState).inSingletonScope();
container.bind(StateType.Overworld).to(OverworldState).inSingletonScope();
container.bind(StateType.Navigation).to(NavigationState).inSingletonScope();
container.bind(StateType.Pause).to(PauseState).inSingletonScope();

export { container };