import { Game } from './src/Game';
import { VIEW_DIMS } from './src/worldConfig';

declare var ROT: any;

window.onload = (function() {

    var display = new ROT.Display({ width: VIEW_DIMS.X, height: VIEW_DIMS.Y});
    document.getElementById("game-canvas").appendChild(display.getContainer());

    var game = new Game(display);
    game.initialize();
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