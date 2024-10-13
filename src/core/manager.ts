import { Application, Container, Sprite, Texture } from "pixi.js";
import { loadImgAssets } from '../utils/assetsLoader';

export class Manager {
    private constructor() { 
        this.stageContainer = new Container();
    }

    private static app: Application;
    private static currentScene: IScene;

    private static _width: number;
    private static _height: number;


    public static get width(): number {
        return Manager._width;
    }
    public static get height(): number {
        return Manager._height;
    }


    public static initialize(width: number, height: number, background: number): void {

        Manager._width = width;
        Manager._height = height;

        Manager.app = new Application<HTMLCanvasElement>({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        Manager.app.ticker.add(Manager.update)

        // listen for the browser telling us that the screen size changed
        window.addEventListener("resize", Manager.resize);

        // call it manually once so we are sure we are the correct size after starting
        Manager.resize();

        const bankBgSprite = Sprite.from('./assets/images/bg.png');

        bankBgSprite.anchor.set(0, 0);
        Manager.app.stage.addChild(bankBgSprite);

    }

    public static resize(): void {
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);

        const enlargedWidth = Math.floor(Manager.width * scale);
        const enlargedHeight = Math.floor(Manager.height * scale);

        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        const view = Manager.app.view as HTMLCanvasElement;
        view.style.width = enlargedWidth + "px";
        view.style.height = enlargedHeight + "px";
        view.style.marginLeft = view.style.marginRight = horizontalMargin + "px";
        view.style.marginTop = view.style.marginBottom = verticalMargin + "px";
    }

    /* More code of your Manager.ts like `changeScene` and `update`*/
}
