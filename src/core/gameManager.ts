import { Application, Container, Sprite } from 'pixi.js';
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
    private handleSprite: Sprite;

    constructor(app: Application) {
        this.app = app;
        this.stageContainer = new Container();
        this.gameState = new GameState();
        this.startGame();
    }

    private async startGame() {
        this.app.stage.addChild(this.stageContainer);
        const imgAssets = await loadImgAssets();

        const { handleSprite } = await initStageVault(this.app, this.stageContainer, imgAssets);
        this.handleSprite = handleSprite;

        if (this.handleSprite) {
            this.playerState = new PlayerState(this.app, this.gameState, this.handleSprite);
            this.gameState.setPlayerState(this.playerState);
            this.inputManager = new InputManager(this.app, this.playerState, this.handleSprite);
            this.inputManager.init();

            this.playerState.on('rotateHandle', this.onRotateHandle.bind(this));
        } else {
            console.error('Handle sprite not initialized properly');
        }

        this.initDebugPanel();

        this.gameState.on('combinationChanged', this.onCombinationChanged.bind(this));
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

    private onRotateHandle(direction: 'clockwise' | 'counterclockwise') {
        console.log(`GameManager: Player rotates handle ${direction}`);
        // Here you can add logic to trigger animations or other game events
    }
}
export default GameManager;
