import { Game } from './src/Game';
import { container } from './src/container';
import { TYPES } from './src/types';

let game = container.get<Game>(TYPES.Game);
game.start();