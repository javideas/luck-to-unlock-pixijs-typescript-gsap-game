import { gsap } from 'gsap';
import { Sprite } from 'pixi.js';
import { EventEmitter } from 'events';

export class HandleAnims extends EventEmitter {
    private handle: Sprite;
    private handleShadow: Sprite;

    constructor(handle: Sprite, handleShadow: Sprite) {
        super();
        this.handle = handle;
        this.handleShadow = handleShadow;
    }

    rotateHandle(direction: 'clockwise' | 'counterclockwise', spinCrazy: boolean = false, rotIncrement?: number) {
        const defaultRotationIncrement = 110 * (Math.PI / 180);
        const rotationIncrement = rotIncrement || defaultRotationIncrement;
        const anticipation = 0.05;
        const overshoot = 0.3;

        const directionMultiplier = direction === 'clockwise' ? 1 : -1;

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
                console.log('Handle rotation complete', { handleRotation: direction });
                if (spinCrazy) {
                    this.emit('spinCrazyComplete', direction);
                } else {
                    this.emit('rotationComplete', direction);
                }
            }
        });
    }

    spinsCrazy() {
        const spinDuration = 1000;
        const startTime = performance.now();

        const spinLoop = () => {
            const currentTime = performance.now();
            if (currentTime - startTime < spinDuration) {
                const randomDirection = Math.random() > 0.5 ? 'clockwise' : 'counterclockwise';
                const randomRotationIncrement = (Math.random() * 180 + 60) * (Math.PI / 180);
                this.rotateHandle(randomDirection, true, randomRotationIncrement);
                requestAnimationFrame(spinLoop);
            } else {
                console.log('Crazy spin complete');
                this.emit('spinCrazyComplete');
            }
        };

        spinLoop();
    }
}
