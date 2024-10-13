import { Application } from 'pixi.js';
import GameState from './gameState';
import { EventEmitter } from 'eventemitter3';
import progressConfig from '../config/progressConfig.json';

export default class PlayerState extends EventEmitter {
    private gameState: GameState;
    private app: Application;
    private startX: number = 0;
    private startY: number = 0;
    private isDragging: boolean = false;

    // Use config values for initial state
    private playerDirection: number = parseInt(progressConfig.infoTexts.p_dir.value);
    private playerStep: number = parseInt(progressConfig.infoTexts.p_step.value);
    private playerPair: number = parseInt(progressConfig.infoTexts.p_pair.value);

    constructor(app: Application, gameState: GameState) {
        super();
        this.gameState = gameState;
        this.app = app;
    }

    public handleInput(type: string, position: { x: number, y: number }) {
        if (type === 'pointerdown') {
            this.isDragging = true;
            this.startX = position.x;
            this.startY = position.y;
        } else if (type === 'pointerup' && this.isDragging) {
            this.isDragging = false;
            const endX = position.x;
            const endY = position.y;
            this.determineDirectionAndEmit(this.startX, this.startY, endX, endY);
        }
    }

    public getPlayerDirection(): number {
        return this.playerDirection;
    }

    public getPlayerStep(): number {
        return this.playerStep;
    }

    public getPlayerPair(): number {
        return this.playerPair;
    }

    public updatePlayerProgress(direction: 'clockwise' | 'counterclockwise') {
        this.playerDirection = direction === 'clockwise' ? 1 : -1;
        this.playerStep++;

        this.emit('playerProgressUpdated', {
            direction: this.playerDirection,
            step: this.playerStep,
            pair: this.playerPair
        });
    }

    private determineDirectionAndEmit(startX: number, startY: number, endX: number, endY: number) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        let direction: 'clockwise' | 'counterclockwise';

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            direction = deltaX < 0 ? 'counterclockwise' : 'clockwise';
        } else {
            direction = deltaY > 0 ? 'counterclockwise' : 'clockwise';
        }

        this.updatePlayerProgress(direction);
        this.emit('rotateHandle', direction);
    }
}
