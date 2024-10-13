import { Application, Container } from 'pixi.js';
import GameState from './gameState';
import PlayerState from './playerState';
import InputManager from '../controllers/inputManager';
import { loadImgAssets } from '../utils/assetsLoader';
import { initStageVault } from '../stages/stageVault';
import { createDebugPanel, updateDebugPanel } from '../debug/debugPanel';

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
        this.gameState = new GameState();
        this.playerState = new PlayerState(this.gameState);
        this.inputManager = new InputManager(this.app, this.playerState);
        this.startGame();
    }

    private async startGame() {
        this.app.stage.addChild(this.stageContainer);
        const imgAssets = await loadImgAssets();

        initStageVault(this.app, this.stageContainer, imgAssets);
        
        // Create and store the debug panel
        this.debugPanel = createDebugPanel(this.app, this.app.screen.width / 2 + 400, (this.app.screen.height * -0.5) - 800);
        this.stageContainer.addChild(this.debugPanel);

        this.gameState.on('combinationChanged', this.onCombinationChanged.bind(this));

        // InputManager now handles input events
        this.inputManager.init();
    }

    private onCombinationChanged(combination: CombinationPair[]) {
        updateDebugPanel(this.debugPanel, combination);
    }
}

export default GameManager;
