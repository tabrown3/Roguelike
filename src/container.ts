import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Game } from './Game';
import { World } from './world/World';
import { ViewEngine } from './display/ViewEngine';
import { EventHandler } from './event/EventHandler';
import { Display } from './display/Display';
import { Player } from './Player';
import WorldManager from './world/WorldManager';
import Scheduler from './Scheduler';
import WorldMap from './world/WorldMap';
import GameStateManager from './state/GameStateManager';


var container = new Container();
container.bind(TYPES.Game).to(Game);
container.bind(TYPES.World).to(World);
container.bind(TYPES.ViewEngine).to(ViewEngine);
container.bind(TYPES.Display).to(Display).inSingletonScope();
container.bind(TYPES.EventHandler).to(EventHandler).inSingletonScope();
container.bind(TYPES.Player).to(Player).inSingletonScope();
container.bind(TYPES.WorldManager).to(WorldManager).inSingletonScope();
container.bind(TYPES.Scheduler).to(Scheduler).inSingletonScope();
container.bind(TYPES.WorldMap).to(WorldMap).inSingletonScope();
container.bind(TYPES.GameStateManager).to(GameStateManager).inSingletonScope();

export { container };