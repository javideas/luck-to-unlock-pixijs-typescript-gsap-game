import { Application, Container, Sprite, Texture } from "pixi.js";
import { loadImgAssets } from "../core/assetsLoader";

export async function initStageVault(app: Application) {
    const imgAssets = await loadImgAssets();

    const stageContainer = new Container();

    app.stage.addChild(stageContainer);

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
    // Create a container for the door and handle
    const doorContainer = new Container();

    // Load and position the door
    const doorTexture = imgAssets.doorClosed;
    const doorSprite = Sprite.from(doorTexture);
    doorSprite.anchor.set(0.5, 0.5);
    doorSprite.position.set(50, -15);
    doorContainer.addChild(doorSprite);

    // Create a container for the handle and its shadow
    const handleContainer = new Container();

    
    // Load and position the handle shadow
    const handleShadowTexture = imgAssets.handleShadow;
    const handleShadowSprite = Sprite.from(handleShadowTexture);
    handleShadowSprite.anchor.set(0.5, 0.5);
    handleShadowSprite.position.set(12, 38); // Adjust position relative to the handle container
    handleShadowSprite.scale.set(0.97);
    handleContainer.addChild(handleShadowSprite);

    // Load and position the handle
    const handleTexture = imgAssets.handle;
    const handleSprite = Sprite.from(handleTexture);
    handleSprite.anchor.set(0.5, 0.5);
    handleSprite.position.set(0, 0); // Adjust position relative to the handle container
    handleContainer.addChild(handleSprite);

    handleContainer.position.set(-40, -20);

    // Add the handle container to the door container
    doorContainer.addChild(handleContainer);

    // Add the door container to the main container
    container.addChild(doorContainer);
}

function fitToScreen(app: Application, container: Container, texture: Sprite)
{
    app.ticker.add(() => {
        const scaleFactor = app.screen.width / texture.width;
        container.scale.set(scaleFactor);
        container.x = app.screen.width * 0.5;
        container.y = app.screen.height * 0.5;
    });
}
