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
        const spinDuration = 0.2; // Shorter duration for each spin to make it faster
        const totalSpins = 10; // Increase the number of spins for a more chaotic effect

        const timeline = gsap.timeline({
            onComplete: () => {
                console.log('Crazy spin complete');
                this.emit('spinCrazyComplete');
            }
        });

        for (let i = 0; i < totalSpins; i++) {
            const directionMultiplier = i % 2 === 0 ? 1 : -1; // Alternate direction
            timeline.to([this.handle, this.handleShadow], {
                rotation: "+=" + (2 * Math.PI * directionMultiplier), // Full rotation in alternating directions
                duration: spinDuration,
                ease: "power1.inOut" // Use a more dynamic easing
            });
        }
    }
}
