import { Application, VERSION } from "pixi.js";
import { initStageVault } from "./stages/stageVault";

async function main() {
    const app = new Application();
    await app.init({
        background: 'black',
        resizeTo: document.body,
    });

    console.log('PixiJS app initialized. Version:', VERSION);
    document.body.appendChild(app.canvas);

    initStageVault(app);
}

main().catch(console.error);