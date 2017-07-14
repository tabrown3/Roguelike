import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Game } from './Game';
import { World } from './World';
import { ViewEngine } from './ViewEngine';
import { EventHandler } from './EventHandler';
import { Display } from './Display';

var myContainer = new Container();
myContainer.bind(TYPES.Game).to(Game);
myContainer.bind(TYPES.World).to(World);
myContainer.bind(TYPES.ViewEngine).to(ViewEngine);
myContainer.bind(TYPES.Display).to(Display);
myContainer.bind(TYPES.EventHandler).to(EventHandler);

export { myContainer };