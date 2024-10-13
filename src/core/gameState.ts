import { EventEmitter } from 'eventemitter3';
import { combinationGenerator, CombinationPair } from '../utils/combinationGenerator';
import PlayerState from './playerState';

export default class GameState extends EventEmitter {
    private currentCombination: CombinationPair[] = [];
    private playerState: PlayerState | null = null;

    constructor() {
        super();
        this.initializeGame();
    }

    setPlayerState(playerState: PlayerState) {
        this.playerState = playerState;
    }

    private initializeGame() {
        combinationGenerator.on('newCombination', (combination: CombinationPair[]) => {
            this.currentCombination = combination;
            // console.log('New combination received:', this.currentCombination);
            this.emit('combinationChanged', this.currentCombination);
        });

        combinationGenerator.startGenerating();
    }

    getCurrentCombination(): CombinationPair[] {
        return this.currentCombination;
    }
}
