import { Application, Container, Graphics, Text, Sprite } from "pixi.js";
import { loadImgAssets } from "../core/assetsLoader";
import { initDebugPanel, fitToScreen } from "../utils/stageUtils";

export async function initStageVault(app: Application, stageContainer: Container, imgAssets: any) {
    initBg(app, stageContainer, imgAssets);
    loadDoorWithHandle(stageContainer, imgAssets);
}

function initBg(app: Application, container: Container, imgAssets: any) {
    const bankBg = imgAssets.bankBg;
    const bankBgSprite = Sprite.from(bankBg);
    bankBgSprite.anchor.set(0.5, 0.5);
    container.addChild(bankBgSprite);

    fitToScreen(app, container, bankBgSprite);
}

function loadDoorWithHandle(container: Container, imgAssets: any) {
    const doorContainer = new Container();

    const doorTexture = imgAssets.doorClosed;
    const doorSprite = Sprite.from(doorTexture);
    doorSprite.anchor.set(0.5, 0.5);
    doorSprite.position.set(50, -15);
    doorContainer.addChild(doorSprite);

    const handleContainer = new Container();

    const handleShadowTexture = imgAssets.handleShadow;
    const handleShadowSprite = Sprite.from(handleShadowTexture);
    handleShadowSprite.anchor.set(0.5, 0.5);
    handleShadowSprite.position.set(12, 38);
    handleShadowSprite.scale.set(0.97);
    handleContainer.addChild(handleShadowSprite);

    const handleTexture = imgAssets.handle;
    const handleSprite = Sprite.from(handleTexture);
    handleSprite.anchor.set(0.5, 0.5);
    handleSprite.position.set(0, 0);
    handleContainer.addChild(handleSprite);

    handleContainer.position.set(-40, -20);
    doorContainer.addChild(handleContainer);
    container.addChild(doorContainer);
}
