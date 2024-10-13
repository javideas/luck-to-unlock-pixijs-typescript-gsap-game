import { Application } from 'pixi.js';
import GameState from './gameState';
import { EventEmitter } from 'eventemitter3';

export default class PlayerState extends EventEmitter {
    private gameState: GameState;
    private app: Application;
    private startX: number = 0;
    private startY: number = 0;
    private isDragging: boolean = false;

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

    private determineDirectionAndEmit(startX: number, startY: number, endX: number, endY: number) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) {
                this.emit('rotateHandle', 'left');
            } else {
                this.emit('rotateHandle', 'right');
            }
        } else {
            if (deltaY > 0) {
                this.emit('rotateHandle', 'left');
            } else {
                this.emit('rotateHandle', 'right');
            }
        }
    }
}
