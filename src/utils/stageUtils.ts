import { Application, Container, Sprite } from "pixi.js";

export function fitToScreen(app: Application, container: Container, texture: Sprite) {
    app.ticker.add(() => {
        const scaleFactor = app.screen.width / texture.width;
        container.scale.set(scaleFactor);
        container.x = app.screen.width * 0.5;
        container.y = app.screen.height * 0.5;
    });
}
