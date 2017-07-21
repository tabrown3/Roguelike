import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Game } from './Game';
import { World } from './world/World';
import { ViewEngine } from './display/ViewEngine';
import { EventHandler } from './EventHandler';
import { Display } from './display/Display';
import { Player } from './Player';
import WorldManager from './world/WorldManager';


var container = new Container();
container.bind(TYPES.Game).to(Game);
container.bind(TYPES.World).to(World);
container.bind(TYPES.ViewEngine).to(ViewEngine);
container.bind(TYPES.Display).to(Display).inSingletonScope();
container.bind(TYPES.EventHandler).to(EventHandler);
container.bind(TYPES.Player).to(Player).inSingletonScope();
container.bind(TYPES.WorldManager).to(WorldManager).inSingletonScope();

export { container };