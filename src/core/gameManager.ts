import { Application, Container } from 'pixi.js';
import { GameState } from './gameState';
import { createDebugPanel, updateDebugPanel } from '../debug/debugPanel';
import { loadImgAssets } from '../utils/assetsLoader';
import { initStageVault } from '../stages/stageVault';
import { CombinationPair } from '../utils/combinationGenerator';

class GameManager {
    private app: Application;
    private gameState: GameState;
    private stageContainer: Container;
    private debugPanel: Container;

    constructor(app: Application) {
        this.app = app;
        this.stageContainer = new Container();
        this.startGame();
    }

    private async startGame() {
        this.app.stage.addChild(this.stageContainer);
        const imgAssets = await loadImgAssets();

        initStageVault(this.app, this.stageContainer, imgAssets);
        
        // Create and store the debug panel
        this.debugPanel = createDebugPanel(this.app, this.app.screen.width / 2 - 400, (this.app.screen.height / 2) * -1 - 300);
        this.stageContainer.addChild(this.debugPanel);

        this.gameState = new GameState();
        this.gameState.on('combinationChanged', this.onCombinationChanged.bind(this));
    }

    private onCombinationChanged(combination: CombinationPair[]) {
        updateDebugPanel(this.debugPanel, combination);
    }
}

export default GameManager;
