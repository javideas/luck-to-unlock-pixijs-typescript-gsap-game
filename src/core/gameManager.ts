import { Application, Container } from 'pixi.js';
import { GameState } from './gameState';
import { initDebugPanel } from '../utils/stageUtils';
import { loadImgAssets } from '../utils/assetsLoader';
import { initStageVault, loadDoorWithHandle } from '../stages/stageVault';

class GameManager {
    private app: Application;
    private gameState: GameState;
    private stageContainer: Container;

    constructor(app: Application) {
        this.app = app;
        this.stageContainer = new Container();
        this.startGame(app);
    }

    private async startGame(app: Application) {
        this.app.stage.addChild(this.stageContainer);
        const imgAssets = await loadImgAssets();

        initStageVault(this.app, this.stageContainer, imgAssets);

        initDebugPanel(this.app, this.stageContainer);
    }
}

export default GameManager;
