import GameState from './gameState';

export default class PlayerState {
    private gameState: GameState;

    constructor(gameState: GameState) {
        this.gameState = gameState;
        console.log('PlayerState initialized.');
        // Additional initialization logic can go here
    }

    public handleInput(type: string, position: { x: number, y: number }) {
        // Process input and interact with gameState as needed
        console.log(`Input received: ${type} at (${position.x}, ${position.y})`);
        // Example: this.gameState.checkCombination(position);
        // Handle input logic here
    }
}
