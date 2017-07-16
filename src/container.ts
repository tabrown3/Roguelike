import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Game } from './Game';
import { World } from './World';
import { ViewEngine } from './ViewEngine';
import { EventHandler } from './EventHandler';
import { Display } from './Display';
import { Player } from './Player';

var container = new Container();
container.bind(TYPES.Game).to(Game);
container.bind(TYPES.World).to(World);
container.bind(TYPES.ViewEngine).to(ViewEngine);
container.bind(TYPES.Display).to(Display).inSingletonScope();
container.bind(TYPES.EventHandler).to(EventHandler);
container.bind(TYPES.Player).to(Player).inSingletonScope();

export { container };