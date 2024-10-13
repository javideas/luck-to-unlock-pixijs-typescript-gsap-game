import { Application, Container } from 'pixi.js';
import GameState from './gameState';
import PlayerState from './playerState';
import InputManager from '../controllers/inputManager';
import { loadImgAssets } from '../utils/assetsLoader';
import { fitToScreen } from '../utils/stageUtils';
import { initStageVault } from '../stages/stageVault';
import { createDebugPanel, updateDebugPanel } from '../debug/debugPanel';
import { CombinationPair } from '../utils/combinationGenerator';
import { Vault } from '../components/vault';

class GameManager {
    private app: Application;
    private gameState: GameState;
    private playerState: PlayerState;
    private inputManager: InputManager;
    private stageContainer: Container;
    private debugPanel: Container;
    private vault: Vault;

    constructor(app: Application) {
        this.app = app;
        this.stageContainer = new Container();
        this.gameState = new GameState();
        this.startGame();
    }

    private async startGame() {
        this.app.stage.addChild(this.stageContainer);
        const imgAssets = await loadImgAssets();

        this.vault = await initStageVault(this.app, this.stageContainer, imgAssets);

        if (this.vault) {
            this.playerState = new PlayerState(this.app, this.gameState, this.vault.getHandleSprite());
            this.gameState.setPlayerState(this.playerState);
            
            // Get HandleAnims from Vault and pass it to GameState
            const handleAnims = this.vault.getHandleAnims();
            this.gameState.setHandleAnims(handleAnims);

            this.inputManager = new InputManager(this.app, this.playerState, this.vault.getHandleSprite());
            this.inputManager.init();

            this.playerState.on('rotateHandle', this.onRotateHandle.bind(this));
        } else {
            console.error('Vault not initialized properly');
        }

        this.initDebugPanel();

        this.gameState.on('combinationChanged', this.onCombinationChanged.bind(this));
        fitToScreen(this.app);
    }

    private initDebugPanel() {
        const panelX = this.app.screen.width / 2 + 400;
        const panelY = this.app.screen.height * -1.2;
        this.debugPanel = createDebugPanel(this.app, panelX, panelY);
        this.stageContainer.addChild(this.debugPanel);
    }

    private onCombinationChanged(combination: CombinationPair[]) {
        updateDebugPanel(this.debugPanel, combination);
    }

    private onRotateHandle(direction: 'clockwise' | 'counterclockwise') {
        this.vault.rotateHandle(direction);
    }
}

export default GameManager;
