import { Application, Container, Sprite } from "pixi.js";
import { createDebugPanel, updateDebugPanel } from "../debug/debugPanel";
import { CombinationPair } from '../utils/combinationGenerator';

// export function initDebugPanel(app: Application, container: Container) {
//     const debugPanel = createDebugPanel(app, app.screen.width - 400, (app.screen.height * -1) - 300);
//     container.addChild(debugPanel);
// }

export function updateCombinationDebugPanel(debugPanel: Container | null, combination: CombinationPair[]) {
    if (debugPanel) {
        updateDebugPanel(debugPanel, combination);
    } else {
        console.error('Debug panel is null or undefined in updateCombinationDebugPanel');
    }
}

export function fitToScreen(app: Application, container: Container, texture: Sprite) {
    app.ticker.add(() => {
        const scaleFactor = app.screen.width / texture.width;
        container.scale.set(scaleFactor);
        container.x = app.screen.width * 0.5;
        container.y = app.screen.height * 0.5;
    });
}
