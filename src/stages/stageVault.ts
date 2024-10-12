import { Application, Container, Sprite } from "pixi.js";
import { loadImgAssets } from "../core/assetsLoader";

export async function gameStage(app: Application) {
    const imgAssets = await loadImgAssets();

    const stageContainer = new Container();

    app.stage.addChild(stageContainer);

    initBg(app, stageContainer, imgAssets);
}

function initBg(app: Application, container: Container, imgAssets: any) {
    const bankBg = imgAssets.bankBg;
    const bankBgSprite = Sprite.from(bankBg);
    bankBgSprite.anchor.set(0.5, 0.5);
    bankBgSprite.alpha = 0.5;
    container.addChild(bankBgSprite);

    fitToScreen(app, container, bankBgSprite);
}

function fitToScreen(app: Application, container: Container, texture: Texture)
{
    app.ticker.add(() => {
        const scaleFactor = app.screen.width / texture.width;
        container.scale.set(scaleFactor);
        container.x = app.screen.width * 0.5;
        container.y = app.screen.height * 0.5;
    });
}
