import { GameState } from './gameState';
import { Application } from 'pixi.js';
import { initStageVault } from '../stages/stageVault';

class GameManager {
    private gameState: GameState;
    private app: Application;

    constructor(app: Application) {
        this.app = app;
        this.gameState = new GameState();
        this.startGame();
    }

    private startGame() {
        initStageVault(this.app);
    }
}

export default GameManager;
