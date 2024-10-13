import { Application, Container } from "pixi.js";
import GameState from './gameState';
import PlayerState from './playerState';
import InputManager from '../controllers/inputManager';
import { loadImgAssets } from '../utils/assetsLoader';
import { fitToScreen } from '../utils/stageUtils';
import { initStageVault } from '../stages/stageVault';
import { createDebugPanel, updateDebugPanel } from '../debug/debugPanel';
import { CombinationPair } from '../utils/combinationGenerator';
import { Vault } from '../components/vault';

export class Manager {
    private constructor() { }

    private static app: Application;
    private static gameState: GameState;
    private static playerState: PlayerState;
    private static inputManager: InputManager;
    private static stageContainer: Container = new Container();
    private static debugPanel: Container;
    private static vault: Vault;

    private static _width: number;
    private static _height: number;

    public static get width(): number {
        return Manager._width;
    }
    public static get height(): number {
        return Manager._height;
    }

    public static async initialize(width: number, height: number, background: number): Promise<void> {
        Manager._width = width;
        Manager._height = height;

        Manager.app = new Application<HTMLCanvasElement>({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        window.addEventListener("resize", Manager.resize);
        Manager.resize();

        Manager.app.stage.addChild(Manager.stageContainer);
        const imgAssets = await loadImgAssets();
        Manager.vault = await initStageVault(Manager.app, Manager.stageContainer, imgAssets);

        if (Manager.vault) {
            Manager.gameState = new GameState();
            Manager.playerState = new PlayerState(Manager.app, Manager.gameState, Manager.vault.getHandleSprite());
            Manager.gameState.setPlayerState(Manager.playerState);

            const handleAnims = Manager.vault.getHandleAnims();
            Manager.gameState.setHandleAnims(handleAnims);

            Manager.inputManager = new InputManager(Manager.app, Manager.playerState, Manager.vault.getHandleSprite());
            Manager.inputManager.init();

            Manager.playerState.on('rotateHandle', Manager.onRotateHandle.bind(this));
        } else {
            console.error('Vault not initialized properly');
        }

        Manager.initDebugPanel();
        Manager.gameState.on('combinationChanged', Manager.onCombinationChanged.bind(this));
    }

    private static initDebugPanel() {
        const panelX = Manager.app.screen.width / 2 + 400;
        const panelY = Manager.app.screen.height * -1.2;
        Manager.debugPanel = createDebugPanel(Manager.app, panelX, panelY);
        Manager.stageContainer.addChild(Manager.debugPanel);
    }

    private static onCombinationChanged(combination: CombinationPair[]) {
        updateDebugPanel(Manager.debugPanel, combination);
    }

    private static onRotateHandle(direction: 'clockwise' | 'counterclockwise') {
        Manager.vault.rotateHandle(direction);
    }

    public static resize(): void {
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        const scale = Math.min(screenWidth / Manager.width, screenHeight / Manager.height);

        const enlargedWidth = Math.floor(Manager.width * scale);
        const enlargedHeight = Math.floor(Manager.height * scale);

        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        const view = Manager.app.view as HTMLCanvasElement;
        view.style.width = enlargedWidth + "px";
        view.style.height = enlargedHeight + "px";
        view.style.marginLeft = view.style.marginRight = horizontalMargin + "px";
        view.style.marginTop = view.style.marginBottom = verticalMargin + "px";
    }

    /* More code of your Manager.ts like `changeScene` and `update` */
}
