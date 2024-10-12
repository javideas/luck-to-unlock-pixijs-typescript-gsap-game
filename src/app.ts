import { Application, VERSION } from "pixi.js";
import { initStageVault } from "./stages/stageVault";

function main() {
    // Create a new PixiJS application
    const app = new Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x1099bb,
        resizeTo: document.body
    });

    // Add the view to the DOM
    document.body.appendChild(app.view);
    console.log('PixiJS app initialized. Version:', VERSION);
    // Initialize the stage
    initStageVault(app);
}

// Call the main function to start the application
main();
