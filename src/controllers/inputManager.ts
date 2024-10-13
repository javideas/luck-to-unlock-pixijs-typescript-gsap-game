import { Application, Sprite } from 'pixi.js';
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
        // Use PixiJS's event system for both mouse and touch events
        this.handleSprite.eventMode = 'static';
        this.handleSprite.on('pointerdown', this.handlePointerDown.bind(this));
        this.handleSprite.on('pointerup', this.handlePointerUp.bind(this));
        this.handleSprite.on('pointerupoutside', this.handlePointerUp.bind(this));
    }

    private handlePointerDown(event: PIXI.FederatedPointerEvent) {
        const position = event.global;
        this.playerState.handleInput('pointerdown', { x: position.x, y: position.y });
    }

    private handlePointerUp(event: PIXI.FederatedPointerEvent) {
        const position = event.global;
        this.playerState.handleInput('pointerup', { x: position.x, y: position.y });
    }
}
