import { gsap } from 'gsap';
import { Sprite } from 'pixi.js';

export class HandleAnims {
    private handle: Sprite;
    private handleShadow: Sprite;

    constructor(handle: Sprite, handleShadow: Sprite) {
        this.handle = handle;
        this.handleShadow = handleShadow;
    }

    rotateHandle(direction: 'clockwise' | 'counterclockwise') {
        const rotationIncrement = 110 * (Math.PI / 180);
        const anticipation = 0.05;
        const overshoot = 0.3;

        const directionMultiplier = direction === 'clockwise' ? 1 : -1;

        console.log(`Rotating handle ${direction}`);
        const timeline = gsap.timeline();
        timeline.to([this.handle, this.handleShadow], {
            rotation: "+=" + (-anticipation * directionMultiplier),
            duration: 0.1,
            ease: "power1.out"
        });
        timeline.to([this.handle, this.handleShadow], {
            rotation: "+=" + (rotationIncrement * directionMultiplier),
            duration: 0.25,
            ease: "power1.inOut"
        });
        timeline.to([this.handle, this.handleShadow], {
            rotation: "-=" + (overshoot * directionMultiplier),
            duration: 0.1,
            ease: "power1.out",
            onComplete: () => {
                console.log('Handle rotation complete', { handleRotation: this.handle.rotation });
            }
        });
    }
}
