import { Application, VERSION } from "pixi.js";
// import GameManager from "./core/gameManager";
import { Manager } from "./core/gameManager";

function main() {

    // document.body.appendChild(app.view);
    console.log('Javideas presents... Luck to Unlock!');
    console.log('PixiJS app initialized. Version:', VERSION);

    // Initialize the GameManager
    // const gameManager = new GameManager(app);
    Manager.initialize(5995, 3000, 0xf9e2b7);
}

main();