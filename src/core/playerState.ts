import { Application, Sprite } from 'pixi.js';
import GameState from './gameState';
import { EventEmitter } from 'eventemitter3';
import progressConfig from '../config/progressConfig.json';

export default class PlayerState extends EventEmitter {
    private gameState: GameState;
    private app: Application;
    private handleSprite: Sprite;
    private startX: number = 0;
    private startY: number = 0;
    private isDragging: boolean = false;

    // Use config values for initial state
    private playerDirection: number = parseInt(progressConfig.infoTexts.p_dir.value);
    private playerStep: number = parseInt(progressConfig.infoTexts.p_step.value);
    private playerPair: number = parseInt(progressConfig.infoTexts.p_pair.value);

    constructor(app: Application, gameState: GameState, handleSprite: Sprite) {
        super();
        this.gameState = gameState;
        this.app = app;
        this.handleSprite = handleSprite;
    }

    public handleInput(type: string, data: { x: number, y: number, quadrant: string }) {
        if (type === 'pointerdown') {
            this.isDragging = true;
            this.startX = data.x;
            this.startY = data.y;
            
            // console.log('Touch started in quadrant:', data.quadrant, {
            //     touchPosition: { x: this.startX, y: this.startY },
            //     quadrant: data.quadrant
            // });

        } else if (type === 'pointerup' && this.isDragging) {
            this.isDragging = false;
            const endX = data.x;
            const endY = data.y;
            this.determineDirectionAndEmit(this.startX, this.startY, endX, endY, data.quadrant);
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

    private determineDirectionAndEmit(startX: number, startY: number, endX: number, endY: number, startQuadrant: string) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        // console.log('Movement delta:', { deltaX, deltaY, startQuadrant });

        let direction: 'clockwise' | 'counterclockwise';

        switch (startQuadrant) {
            case 'topLeft':
                direction = this.determineDirectionTopLeft(deltaX, deltaY);
                break;
            case 'topRight':
                direction = this.determineDirectionTopRight(deltaX, deltaY);
                break;
            case 'bottomLeft':
                direction = this.determineDirectionBottomLeft(deltaX, deltaY);
                break;
            case 'bottomRight':
                direction = this.determineDirectionBottomRight(deltaX, deltaY);
                break;
            default:
                console.error('Invalid quadrant');
                return;
        }

        // console.log('Direction determined:', {
        //     quadrant: startQuadrant,
        //     direction: direction,
        //     start: { x: startX, y: startY },
        //     end: { x: endX, y: endY },
        //     delta: { x: deltaX, y: deltaY }
        // });

        this.updatePlayerProgress(direction);
        this.emit('rotateHandle', direction);
    }

    private determineDirectionTopLeft(deltaX: number, deltaY: number): 'clockwise' | 'counterclockwise' {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            return deltaX < 0 ? 'counterclockwise' : 'clockwise';
        } else {
            return deltaY > 0 ? 'counterclockwise' : 'clockwise';
        }
    }

    private determineDirectionTopRight(deltaX: number, deltaY: number): 'clockwise' | 'counterclockwise' {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            return deltaX > 0 ? 'clockwise' : 'counterclockwise';
        } else {
            return deltaY > 0 ? 'clockwise' : 'counterclockwise';
        }
    }

    private determineDirectionBottomLeft(deltaX: number, deltaY: number): 'clockwise' | 'counterclockwise' {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            return deltaX < 0 ? 'clockwise' : 'counterclockwise';
        } else {
            return deltaY < 0 ? 'clockwise' : 'counterclockwise';
        }
    }

    private determineDirectionBottomRight(deltaX: number, deltaY: number): 'clockwise' | 'counterclockwise' {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            return deltaX > 0 ? 'counterclockwise' : 'clockwise';
        } else {
            return deltaY < 0 ? 'counterclockwise' : 'clockwise';
        }
    }
}
