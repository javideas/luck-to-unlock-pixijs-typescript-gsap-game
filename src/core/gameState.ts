import { EventEmitter } from 'eventemitter3';
import { combinationGenerator, CombinationPair } from '../utils/combinationGenerator';
import PlayerState from './playerState';
import { HandleAnims } from './animManagers/handleAnims';

export default class GameState extends EventEmitter {
    private currentCombination: CombinationPair[] = [];
    private playerState: PlayerState | null = null;
    private currentStep: number = 0;
    private handleAnims: HandleAnims;

    constructor() {
        super();
        this.initializeGame();
    }

    setHandleAnims(handleAnims: HandleAnims) {
        this.handleAnims = handleAnims;
        this.handleAnims.on('rotationComplete', this.checkRotation.bind(this));
    }

    setPlayerState(playerState: PlayerState) {
        this.playerState = playerState;
    }

    private initializeGame() {
        combinationGenerator.on('newCombination', (combination: CombinationPair[]) => {
            this.currentCombination = combination;
            this.currentStep = 0;
            this.emit('combinationChanged', this.currentCombination);
            console.log('New combination:', this.currentCombination);

            // Log the initial expected step and direction
            const remaining = this.getRemainingSteps();
            if (remaining) {
                console.log(`Expected step ${this.currentStep + 1}: ${remaining.steps} ${remaining.direction}`);
            } else {
                console.error('Error: No remaining steps available.');
            }
        });

        // Generate the initial combination
        this.generateNewCombination();
    }

    getCurrentCombination(): CombinationPair[] {
        return this.currentCombination;
    }

    private getRemainingSteps(): { steps: number, direction: string } | null {
        if (this.currentStep < this.currentCombination.length) {
            const currentPair = this.currentCombination[this.currentStep];
            return { steps: currentPair.steps, direction: currentPair.direction };
        }
        return null;
    }

    private checkRotation(direction: 'clockwise' | 'counterclockwise') {
        const currentPair = this.currentCombination[this.currentStep];

        if (direction === currentPair.direction) {
            console.log(`Correct direction for step ${this.currentStep + 1}`);
            currentPair.steps--;  // Decrement the steps as the player progresses

            // Log the expected next step and direction after decrementing
            if (currentPair.steps > 0) {
                console.log(`Expected step ${this.currentStep + 1}: ${currentPair.steps} ${currentPair.direction}`);
            } else {
                console.log(`Pair ${this.currentStep + 1} completed!.`);
                this.currentStep++;
                const remaining = this.getRemainingSteps();
                if (remaining) {
                    console.log(`Expected step ${this.currentStep + 1}: ${remaining.steps} ${remaining.direction}`);
                } else {
                    this.winGame();
                }
            }
        } else {
            console.log('Incorrect direction. Resetting game...');
            this.resetCombination();
        }
    }

    private winGame() {
        console.log('Congratulations! You have unlocked the vault!');
        // Emit a win event for the GameManager to listen to
        this.emit('gameWon');

        // Start a timer using requestAnimationFrame
        let startTime = performance.now();

        const checkTime = (currentTime: number) => {
            if (currentTime - startTime >= 5000) {
                console.log('5 seconds have passed!');
                this.resetGame();
            } else {
                requestAnimationFrame(checkTime);
            }
        };

        requestAnimationFrame(checkTime);
    }

    private resetGame() {
        this.emit('gameReset');
        this.resetCombination();
    }

    private resetCombination() {
        this.currentStep = 0;
        this.generateNewCombination();

    }

    private generateNewCombination() {
        combinationGenerator.generateNewCombination();
    }
}
