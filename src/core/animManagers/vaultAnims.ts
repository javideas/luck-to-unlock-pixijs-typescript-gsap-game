import { Sprite, Texture } from 'pixi.js';
import { gsap } from 'gsap';

export class VaultAnims {
    private doorSprite: Sprite;
    private doorOpenTexture: Texture;

    constructor(doorSprite: Sprite, doorOpenTexture: Texture) {
        this.doorSprite = doorSprite;
        this.doorOpenTexture = doorOpenTexture;
    }

    openDoor() {
        // Animate the door opening
        gsap.to(this.doorSprite, {
            alpha: 0,
            duration: 0.5,
            onComplete: () => {
                this.doorSprite.texture = this.doorOpenTexture;
                gsap.to(this.doorSprite, { alpha: 1, duration: 0.5 });
            }
        });
    }

    closeDoor() {
        // Logic to close the door, if needed
        // For example, revert to the original texture
        gsap.to(this.doorSprite, {
            alpha: 0,
            duration: 0.5,
            onComplete: () => {
                // Assuming you have a reference to the original texture
                // this.doorSprite.texture = originalTexture;
                gsap.to(this.doorSprite, { alpha: 1, duration: 0.5 });
            }
        });
    }
}

