import { Application, Container, Text, TextStyle } from "pixi.js";
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
    private static timerText: Text;
    private static startTime: number;
    private static timerRunning: boolean;

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

        window.addEventListener("orientationchange", Manager.resize);
        window.addEventListener("resize", Manager.resize);

        Manager.app.stage.addChild(Manager.stageContainer);
        const imgAssets = await loadImgAssets();
        Manager.vault = await initStageVault(Manager.app, Manager.stageContainer, imgAssets);
        
        if (Manager.vault) {
            Manager.gameState = new GameState();
            
            Manager.initDebugPanel();

            updateDebugPanel(Manager.debugPanel, Manager.gameState.getCurrentCombination());

            Manager.gameState.on('combinationChanged', (combination: CombinationPair[]) => {
                updateDebugPanel(Manager.debugPanel, combination);
            });
            Manager.gameState.on('gameWon', Manager.onhandleGameWon.bind(this));
            Manager.gameState.on('gameReset', Manager.onhandleGameReset.bind(this));

            Manager.playerState = new PlayerState(Manager.app, Manager.gameState, Manager.vault.getHandleSprite());
            Manager.gameState.setPlayerState(Manager.playerState);

            const handleAnims = Manager.vault.getHandleAnims();
            Manager.gameState.setHandleAnims(handleAnims);

            Manager.inputManager = new InputManager(Manager.app, Manager.playerState, Manager.vault.getHandleSprite());
            Manager.inputManager.init();

            Manager.playerState.on('rotateHandle', Manager.onRotateHandle.bind(this));
            // Manager.gameState.on('gameWon', Manager.onhandleGameWon.bind(this));
        } else {
            console.error('Vault not initialized properly');
        }

        Manager.initTimerText();

        // Start the timer
        Manager.startTimer();

        Manager.resize();
    }

    private static initDebugPanel() {
        const panelX = Manager.app.screen.width / 5 ;
        const panelY = Manager.app.screen.height / -2.5;
        Manager.debugPanel = createDebugPanel(Manager.app, panelX, panelY);
        Manager.stageContainer.addChild(Manager.debugPanel);
        // Manager.stageContainer.setChildIndex(Manager.debugPanel, Manager.stageContainer.children.length - 1);
    }

    private static initTimerText() {
        const style = new TextStyle({
            fill: "white",
            fontFamily: "Comic Sans MS",
            fontSize: 50,
            fontWeight: "bold"
        });

        Manager.timerText = new Text("Time: 0s", style);
        Manager.timerText.alpha = 0;
        Manager.timerText.position.set(-1240, -180);
        Manager.stageContainer.addChild(Manager.timerText);
    }

    private static startTimer() {
        Manager.startTime = performance.now();
        Manager.timerRunning = true;
        Manager.timerText.alpha = 0; // Hide the timer text initially
        Manager.updateTimer();
    }

    private static updateTimer() {
        if (!Manager.timerRunning) return;

        const currentTime = performance.now();
        const elapsedSeconds = ((currentTime - Manager.startTime) / 1000).toFixed(1);
        Manager.timerText.text = `${elapsedSeconds}s!`;

        requestAnimationFrame(Manager.updateTimer);
    }

    private static onhandleGameReset() {
        console.log('GameManager: Game has been reset!');
        Manager.vault.vaultAnims.closeDoor();
        Manager.timerText.alpha = 0; // Hide the timer text again
        Manager.startTimer(); // Restart the timer
    }

    private static onRotateHandle(direction: 'clockwise' | 'counterclockwise') {
        Manager.vault.rotateHandle(direction);
    }

    private static onhandleGameWon() {
        console.log('GameManager: Player has won the game!');
        Manager.vault.vaultAnims.openDoor();
        Manager.timerRunning = false; // Pause the timer
        Manager.timerText.alpha = 1; // Show the timer text
    }

    public static resize(): void {
        console.log('Resizing');
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
}
