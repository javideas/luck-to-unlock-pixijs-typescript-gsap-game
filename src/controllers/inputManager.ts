import { Application } from 'pixi.js';
import PlayerState from '../core/playerState';

export default class InputManager {
    private playerState: PlayerState;
    private app: Application;

    constructor(app: Application, playerState: PlayerState) {
        this.app = app;
        this.playerState = playerState;
    }

    init() {
        // Use PixiJS's event system for both mouse and touch events
        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = this.app.screen;
        this.app.stage.on('pointerdown', this.handlePointerDown.bind(this));
    }

    private handlePointerDown(event: PIXI.FederatedPointerEvent) {
        const position = event.global;
        this.playerState.handleInput('pointerdown', { x: position.x, y: position.y });
    }
}
