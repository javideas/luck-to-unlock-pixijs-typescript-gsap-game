import { generateCombination, CombinationPair } from '../utils/combinationGenerator';

export class GameState {
    private currentCombination: CombinationPair[] = [];

    constructor() {
        this.initializeGame();
    }

    private async initializeGame() {
        try {
            this.currentCombination = await generateCombination();
            console.log("Current Combination in GameState:", this.currentCombination);
        } catch (error) {
            console.error("Error generating combination:", error);
        }
    }
}

export default GameState;
