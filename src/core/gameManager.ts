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
    private app: Application;
    private gameState: GameState;
    private playerState: PlayerState;
    private inputManager: InputManager;
    private stageContainer: Container = new Container();
    private debugPanel: Container;
    private vault: Vault;
    private timerText: Text;
    private startTime: number;
    private timerRunning: boolean;

    private _width: number;
    private _height: number;

    constructor(width: number, height: number, background: number) {
        this._width = width;
        this._height = height;
        this.initialize(width, height, background);
    }

    public get width(): number {
        return this._width;
    }
    public get height(): number {
        return this._height;
    }

    private async initialize(width: number, height: number, background: number): Promise<void> {
        this.app = new Application<HTMLCanvasElement>({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        window.addEventListener("orientationchange", this.resize.bind(this));
        window.addEventListener("resize", this.resize.bind(this));

        this.app.stage.addChild(this.stageContainer);
        const imgAssets = await loadImgAssets();
        this.vault = await initStageVault(this.app, this.stageContainer, imgAssets);
        
        if (this.vault) {
            this.gameState = new GameState();
            
            this.initDebugPanel();

            updateDebugPanel(this.debugPanel, this.gameState.getCurrentCombination());

            this.gameState.on('combinationChanged', (combination: CombinationPair[]) => {
                updateDebugPanel(this.debugPanel, combination);
            });
            this.gameState.on('gameWon', this.onhandleGameWon.bind(this));
            this.gameState.on('gameReset', this.onhandleGameReset.bind(this));

            this.playerState = new PlayerState(this.app, this.gameState, this.vault.getHandleSprite());
            this.gameState.setPlayerState(this.playerState);

            const handleAnims = this.vault.getHandleAnims();
            this.gameState.setHandleAnims(handleAnims);

            this.inputManager = new InputManager(this.app, this.playerState, this.vault.getHandleSprite());
            this.inputManager.init();

            this.playerState.on('rotateHandle', this.onRotateHandle.bind(this));
        } else {
            console.error('Vault not initialized properly');
        }

        this.initTimerText();

        // Start the timer
        this.startTimer();

        this.resize();
    }

    private initDebugPanel() {
        const panelX = this.app.screen.width / 5 ;
        const panelY = this.app.screen.height / -2.5;
        this.debugPanel = createDebugPanel(this.app, panelX, panelY);
        this.stageContainer.addChild(this.debugPanel);
    }

    private initTimerText() {
        const style = new TextStyle({
            fill: "white",
            fontFamily: "Comic Sans MS",
            fontSize: 50,
            fontWeight: "bold"
        });

        this.timerText = new Text("Time: 0s", style);
        this.timerText.alpha = 0;
        this.timerText.position.set(-1240, -180);
        this.stageContainer.addChild(this.timerText);
    }

    private startTimer() {
        this.startTime = performance.now();
        this.timerRunning = true;
        this.timerText.alpha = 0; // Hide the timer text initially
        this.updateTimer();
    }

    private updateTimer() {
        if (!this.timerRunning) return;

        const currentTime = performance.now();
        const elapsedSeconds = ((currentTime - this.startTime) / 1000).toFixed(1);
        this.timerText.text = `${elapsedSeconds}s!`;

        requestAnimationFrame(this.updateTimer.bind(this));
    }

    private onhandleGameReset() {
        console.log('GameManager: Game has been reset!');
        this.vault.vaultAnims.closeDoor();
        this.timerText.alpha = 0; // Hide the timer text again
        this.startTimer(); // Restart the timer
    }

    private onRotateHandle(direction: 'clockwise' | 'counterclockwise') {
        this.vault.rotateHandle(direction);
    }

    private onhandleGameWon() {
        console.log('GameManager: Player has won the game!');
        this.vault.vaultAnims.openDoor();
        this.timerRunning = false; // Pause the timer
        this.timerText.alpha = 1; // Show the timer text
    }

    public resize(): void {
        console.log('Resizing');
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        const scale = Math.min(screenWidth / this.width, screenHeight / this.height);

        const enlargedWidth = Math.floor(this.width * scale);
        const enlargedHeight = Math.floor(this.height * scale);

        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        const view = this.app.view as HTMLCanvasElement;
        view.style.width = enlargedWidth + "px";
        view.style.height = enlargedHeight + "px";
        view.style.marginLeft = view.style.marginRight = horizontalMargin + "px";
        view.style.marginTop = view.style.marginBottom = verticalMargin + "px";
    }
}
