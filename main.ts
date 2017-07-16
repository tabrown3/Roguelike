import { Game } from './src/Game';
import { container } from './src/container';
import { TYPES } from './src/types';

window.onload = (function() {

    //let world = new World(new Player(), new EventHandler());

    //let game = new Game(world, new ViewEngine(new Display()));
    let game = container.get<Game>(TYPES.Game);
    game.start();

    // display.draw(5,  3, "╔");
    // display.draw(6,  3, "═");
    // display.draw(7,  3, "═");
    // display.draw(8,  3, "═");
    // display.draw(9,  3, "╗");
    // display.draw(5,  4, "║");
    // display.draw(5,  5, "║");
    // display.draw(5,  6, "╚");
    // display.draw(9,  4, "║");
    // display.draw(9,  5, "║");
    // display.draw(9,  6, "╝");
    // display.draw(8,  6, "§");
    // display.draw(6,  6, "§");
});