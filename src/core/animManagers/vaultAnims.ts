import { Container, Sprite, Texture, PIXI } from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import * as PIXI from 'pixi.js';

// Register the PixiPlugin
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export class VaultAnims {
    private doorSprite: Sprite;
    private doorOpenTexture: Texture;
    private handleSprite: Sprite;
    private handleShadowSprite: Sprite;

    constructor(app: Application, doorSprite: Sprite, doorOpenSprite: Sprite, handleSprite: Sprite, handleShadowSprite: Sprite, blinkSprite: Sprite) {
        this.doorSprite = doorSprite;
        this.doorOpenSprite = doorOpenSprite;
        this.handleSprite = handleSprite;
        this.handleShadowSprite = handleShadowSprite;
        this.blinkSprite = blinkSprite;
        this.container = new Container();

        this.app = app;
        this.init();
    }

    init() {
        this.container.addChild(this.doorOpenSprite);
        this.doorOpenSprite.x = this.app.screen.width / 2 + 1470;
        this.doorOpenSprite.y = this.app.screen.height / 2 - 8;
        this.doorOpenSprite.anchor.set(0.5);

        this.container.addChild(this.blinkSprite);
        this.blinkSprite.x = this.app.screen.width / 2 - 380;
        this.blinkSprite.y = this.app.screen.height / 2- 125;
        this.blinkSprite.anchor.set(0.5);
        this.app.stage.addChild(this.container);

        this.doorOpenSprite.alpha = 0;
        this.blinkSprite.alpha = 0;
    }

    openDoor() {
        this.blinkSprite.scale = 0;
        this.blinkSprite.rotation = 0;
        gsap.timeline()
            .to([this.handleSprite, this.handleShadowSprite, this.doorSprite], {
                pixi: { alpha: 0 },
                duration: 0.5
            })
            .to(this.doorOpenSprite, {
                pixi: { alpha: 1 },
                duration: 0.5
            })
            .to(this.blinkSprite, {
                pixi: { alpha: 1, rotation: 390, scale: 1.2 },
                duration: 0.5,
                ease: 'power2.out'
            })
            .to(this.blinkSprite, {
                pixi: { scale: 1.7 },
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            }, '+=0');
    }

    debugOpenDoor() {
        // Directly set the door to open for debugging
        this.openDoor();
        console.log('Debug: Door opened for position testing.');
    }

    closeDoor() {
        // Logic to close the door, if needed
        gsap.to([this.doorOpenSprite, this.blinkSprite], {
            alpha: 0,
            duration: 0.5,
            onComplete: () => {
                gsap.to([this.doorSprite, this.handleSprite, this.handleShadowSprite], { alpha: 1, duration: 0.5 });
            }
        });
    }
}
