import { Application, VERSION } from "pixi.js";
import GameManager from "./core/gameManager";

function main() {
    // Create a new PixiJS application
    const app = new Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x1099bb,
        resizeTo: document.body
    });

    document.body.appendChild(app.view);
    console.log('Javideas presents... Luck to Unlock!');
    console.log('PixiJS app initialized. Version:', VERSION);

    // Initialize the GameManager
    const gameManager = new GameManager(app);
}

main();