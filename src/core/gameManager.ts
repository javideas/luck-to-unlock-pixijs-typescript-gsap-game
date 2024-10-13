import { Application, Container } from 'pixi.js';
import GameState from './gameState';
import PlayerState from './playerState';
import InputManager from '../controllers/inputManager';
import { loadImgAssets } from '../utils/assetsLoader';
import { initStageVault } from '../stages/stageVault';
import { createDebugPanel, updateDebugPanel } from '../debug/debugPanel';
import { CombinationPair } from '../utils/combinationGenerator';

class GameManager {
    private app: Application;
    private gameState: GameState;
    private playerState: PlayerState;
    private inputManager: InputManager;
    private stageContainer: Container;
    private debugPanel: Container;

    constructor(app: Application) {
        this.app = app;
        this.stageContainer = new Container();
        this.gameState = new GameState(this.app);
        this.playerState = new PlayerState(this.app, this.gameState);
        this.inputManager = new InputManager(this.app, this.playerState);
        this.startGame();
    }

    private async startGame() {
        this.app.stage.addChild(this.stageContainer);
        const imgAssets = await loadImgAssets();

        initStageVault(this.app, this.stageContainer, imgAssets);
        
        this.initDebugPanel();

        this.gameState.on('combinationChanged', this.onCombinationChanged.bind(this));
        this.playerState.on('rotateHandle', this.rotateHandle.bind(this));

        this.inputManager.init();
    }

    private initDebugPanel() {
        const panelX = this.app.screen.width / 2 + 400;
        const panelY = this.app.screen.height * -1.7;
        this.debugPanel = createDebugPanel(this.app, panelX, panelY);
        this.stageContainer.addChild(this.debugPanel);
    }

    private onCombinationChanged(combination: CombinationPair[]) {
        updateDebugPanel(this.debugPanel, combination);
    }

    private rotateHandle(direction: 'left' | 'right') {
        console.log(`GameManager: Rotating handle ${direction}`);
    }
}

export default GameManager;
