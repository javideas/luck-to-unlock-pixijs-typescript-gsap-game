import { EventEmitter } from 'eventemitter3';
import { combinationGenerator, CombinationPair } from '../utils/combinationGenerator';

export default class GameState extends EventEmitter {
    private currentCombination: CombinationPair[] = [];

    constructor() {
        super();
        this.initializeGame();
    }

    private initializeGame() {
        combinationGenerator.on('newCombination', (combination: CombinationPair[]) => {
            this.currentCombination = combination;
            console.log('New combination received:', this.currentCombination);
            this.emit('combinationChanged', this.currentCombination);
        });

        combinationGenerator.startGenerating();
    }

    getCurrentCombination(): CombinationPair[] {
        return this.currentCombination;
    }
}