import { Application, Sprite, Graphics, Container } from 'pixi.js';
import PlayerState from '../core/playerState';

export default class InputManager {
    private playerState: PlayerState;
    private app: Application;
    private handleSprite: Sprite;

    constructor(app: Application, playerState: PlayerState, handleSprite: Sprite) {
        this.app = app;
        this.playerState = playerState;
        this.handleSprite = handleSprite;
    }

    init() {
        this.handleSprite.eventMode = 'static';
        this.handleSprite.on('pointerdown', this.handlePointerDown.bind(this));
        this.handleSprite.on('pointerup', this.handlePointerUp.bind(this));
        this.handleSprite.on('pointerupoutside', this.handlePointerUp.bind(this));
        console.log('InputManager initialized');
    }

    private handlePointerDown(event: PIXI.FederatedPointerEvent) {
        const position = event.global;
        const quadrant = this.determineQuadrant(position.x, position.y);
        console.log('Pointer down:', {
            x: position.x,
            y: position.y,
            quadrant: quadrant,
            handleCenter: {
                x: this.handleSprite.x + this.handleSprite.width / 2,
                y: this.handleSprite.y + this.handleSprite.height / 2
            }
        });
        this.playerState.handleInput('pointerdown', { x: position.x, y: position.y, quadrant: quadrant });
    }

    private handlePointerUp(event: PIXI.FederatedPointerEvent) {
        const position = event.global;
        const quadrant = this.determineQuadrant(position.x, position.y);
        console.log('Pointer up:', {
            x: position.x,
            y: position.y,
            quadrant: quadrant,
            handleCenter: {
                x: this.handleSprite.x + this.handleSprite.width / 2,
                y: this.handleSprite.y + this.handleSprite.height / 2
            }
        });
        this.playerState.handleInput('pointerup', { x: position.x, y: position.y, quadrant: quadrant });
    }

    private determineQuadrant(x: number, y: number): string {
        const globalPosition = this.handleSprite.getGlobalPosition();
        const handleCenterX = globalPosition.x;
        const handleCenterY = globalPosition.y;

        if (x < handleCenterX && y < handleCenterY) {
            return 'topLeft';
        } else if (x >= handleCenterX && y < handleCenterY) {
            return 'topRight';
        } else if (x < handleCenterX && y >= handleCenterY) {
            return 'bottomLeft';
        } else {
            return 'bottomRight';
        }
    }

    public createDebugQuadrants(container: Container) {
        const graphics = new Graphics();
        const globalPosition = this.handleSprite.getGlobalPosition();
        const handleCenterX = globalPosition.x;
        const handleCenterY = globalPosition.y;
        const quadrantSize = 500; // Adjust this value to change the size of the debug quadrants

        // Top-left quadrant (Red)
        graphics.beginFill(0xFF0000, 0.3);
        graphics.drawRect(handleCenterX - quadrantSize, handleCenterY - quadrantSize, quadrantSize, quadrantSize);
        graphics.endFill();

        // Top-right quadrant (Green)
        graphics.beginFill(0x00FF00, 0.3);
        graphics.drawRect(handleCenterX, handleCenterY - quadrantSize, quadrantSize, quadrantSize);
        graphics.endFill();

        // Bottom-left quadrant (Blue)
        graphics.beginFill(0x0000FF, 0.3);
        graphics.drawRect(handleCenterX - quadrantSize, handleCenterY, quadrantSize, quadrantSize);
        graphics.endFill();

        // Bottom-right quadrant (Yellow)
        graphics.beginFill(0xFFFF00, 0.3);
        graphics.drawRect(handleCenterX, handleCenterY, quadrantSize, quadrantSize);
        graphics.endFill();

        container.addChild(graphics);

        console.log('Debug quadrants created:', {
            handleCenter: { x: handleCenterX, y: handleCenterY },
            quadrantSize: quadrantSize
        });
    }
}
