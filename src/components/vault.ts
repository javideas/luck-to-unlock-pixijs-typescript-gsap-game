import { Container, Sprite, Application } from 'pixi.js';
import { fitToScreen } from '../utils/stageUtils';
import { HandleAnims } from '../core/animManagers/handleAnims';

export class Vault {
    private app: Application;
    private container: Container;
    private doorContainer: Container;
    private handleContainer: Container;
    public doorSprite: Sprite;
    public handleSprite: Sprite;
    public handleShadowSprite: Sprite;
    private handleAnims: HandleAnims;

    constructor(app: Application, container: Container, imgAssets: any) {
        this.app = app;
        this.container = container;
        this.initVault(imgAssets);
        this.handleAnims = new HandleAnims(this.handleSprite, this.handleShadowSprite);
    }

    private initVault(imgAssets: any) {
        this.initBg(imgAssets);
        this.loadDoorWithHandle(imgAssets);
    }

    private initBg(imgAssets: any) {
        const bankBg = imgAssets.bankBg;
        const bankBgSprite = Sprite.from(bankBg);
        bankBgSprite.anchor.set(0.5, 0.5);
        this.container.addChild(bankBgSprite);

        fitToScreen(this.app, this.container, bankBgSprite);
    }

    private loadDoorWithHandle(imgAssets: any) {
        this.doorContainer = new Container();

        const doorTexture = imgAssets.doorClosed;
        this.doorSprite = Sprite.from(doorTexture);
        this.doorSprite.anchor.set(0.5, 0.5);
        this.doorSprite.position.set(50, -15);
        this.doorContainer.addChild(this.doorSprite);

        this.handleContainer = new Container();

        const handleShadowTexture = imgAssets.handleShadow;
        this.handleShadowSprite = Sprite.from(handleShadowTexture);
        this.handleShadowSprite.anchor.set(0.5, 0.5);
        this.handleShadowSprite.position.set(12, 38);
        this.handleShadowSprite.scale.set(0.97);
        this.handleContainer.addChild(this.handleShadowSprite);

        const handleTexture = imgAssets.handle;
        this.handleSprite = Sprite.from(handleTexture);
        this.handleSprite.anchor.set(0.5, 0.5);
        this.handleSprite.position.set(0, 0);
        this.handleContainer.addChild(this.handleSprite);

        this.handleContainer.position.set(-40, -20);
        this.doorContainer.addChild(this.handleContainer);
        this.container.addChild(this.doorContainer);
    }

    public getHandleSprite(): Sprite {
        return this.handleSprite;
    }

    public getHandleShadowSprite(): Sprite {
        return this.handleShadowSprite;
    }

    public rotateHandle(direction: 'clockwise' | 'counterclockwise') {
        this.handleAnims.rotateHandle(direction);
    }

    public getHandleAnims(): HandleAnims {
        return this.handleAnims;
    }
}
