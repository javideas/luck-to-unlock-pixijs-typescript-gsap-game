import { Application, Container, Sprite } from "pixi.js";

export function fitToScreen(app: Application) {
    const resize = () => {
        const gameWidth = 5995;
        const gameHeight = 3000;
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        const scale = Math.min(screenWidth / gameWidth, screenHeight / gameHeight);

        const enlargedWidth = Math.floor(gameWidth * scale);
        const enlargedHeight = Math.floor(gameHeight * scale);

        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        const view = app.view as HTMLCanvasElement;
        view.style.width = enlargedWidth + "px";
        view.style.height = enlargedHeight + "px";
        view.style.marginLeft = view.style.marginRight = horizontalMargin + "px";
        view.style.marginTop = view.style.marginBottom = verticalMargin + "px";
    };
    window.addEventListener('resize', resize);

    resize();
}