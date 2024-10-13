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
        if (this.currentStep >= this.currentCombination.length) {
            console.log('All steps completed. Checking final result...');
            this.checkFinalResult();
            return;
        }

        const currentPair = this.currentCombination[this.currentStep];

        if (direction === currentPair.direction) {
            console.log(`Correct direction for step ${this.currentStep + 1}`);
            currentPair.steps--;  // Decrement the steps as the player progresses

            // Log the expected next step and direction after decrementing
            if (currentPair.steps > 0) {
                console.log(`Expected step ${this.currentStep + 1}: ${currentPair.steps} ${currentPair.direction}`);
            } else {
                console.log(`Step ${this.currentStep + 1} completed`);
                this.currentStep++;
                const remaining = this.getRemainingSteps();
                if (remaining) {
                    console.log(`Expected step ${this.currentStep + 1}: ${remaining.steps} ${remaining.direction}`);
                }
            }
        } else {
            console.log('Incorrect direction. Resetting game...');
            this.resetGame();
        }
    }

    private checkFinalResult() {
        if (this.currentCombination.every(pair => pair.number === 0)) {
            console.log('Vault unlocked! Revealing treasure...');
            this.emit('vaultUnlocked');
        } else {
            console.log('Combination incomplete. Resetting game...');
            this.resetGame();
        }
    }

    private resetGame() {
        this.currentStep = 0;
        this.generateNewCombination();
        this.emit('gameReset');
    }

    private generateNewCombination() {
        combinationGenerator.generateNewCombination();
    }
}
