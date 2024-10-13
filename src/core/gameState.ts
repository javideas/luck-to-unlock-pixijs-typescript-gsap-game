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
        this.setupEventListeners();
    }

    private initializeGame() {
        combinationGenerator.on('newCombination', (combination: CombinationPair[]) => {
            this.currentCombination = combination;
            console.log('New combination received:', this.currentCombination);
            this.emit('combinationChanged', this.currentCombination);
        });

        combinationGenerator.startGenerating();
    }

    private setupEventListeners() {
        if (this.playerState) {
            this.playerState.on('rotateHandle', this.rotateHandle.bind(this));
        }
    }

    private rotateHandle(direction: 'clockwise' | 'counterclockwise') {
        console.log(`GameState: Player rotates handle ${direction}`);

    }

    getCurrentCombination(): CombinationPair[] {
        return this.currentCombination;
    }
}
