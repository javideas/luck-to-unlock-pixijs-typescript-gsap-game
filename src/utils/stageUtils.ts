import { Application, Container, Sprite } from "pixi.js";
import { createDebugPanel } from "../debug/debugPanel";

export function initDebugPanel(app: Application, container: Container) {
    const debugPanel = createDebugPanel(app, app.screen.width + 300, (app.screen.height * -1) - 300);
    container.addChild(debugPanel);
}

export function fitToScreen(app: Application, container: Container, texture: Sprite) {
    app.ticker.add(() => {
        const scaleFactor = app.screen.width / texture.width;
        container.scale.set(scaleFactor);
        container.x = app.screen.width * 0.5;
        container.y = app.screen.height * 0.5;
    });
}

