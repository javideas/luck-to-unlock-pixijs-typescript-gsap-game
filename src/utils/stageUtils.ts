import { Application, Container, Sprite } from "pixi.js";

export function fitToScreen(app: Application, container: Container, texture: Sprite) {
    const resize = () => {
        const scale = app.screen.width / texture.width;
        container.scale.set(scale);
        container.x = app.screen.width * 0.5;
        container.y = app.screen.height * 0.5;
    };
    resize();

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
}