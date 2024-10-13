import { EventEmitter } from 'eventemitter3';

export interface CombinationPair {
    direction: string;
    steps: number;
}

export class CombinationGenerator extends EventEmitter {
    maxSteps: number = 1; // Default maximum steps value

    generateCombination() {
        const directions = ["clockwise", "counterclockwise"];
        const combination: CombinationPair[] = [];

        for (let i = 0; i < 3; i++) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const steps = Math.floor(Math.random() * this.maxSteps) + 1;
            combination.push({ direction, steps });
        }
        this.emit('newCombination', combination);
    }

    // Renamed from startGenerating to generateNewCombination
    generateNewCombination() {
        this.generateCombination();
        
    }
}

export const combinationGenerator = new CombinationGenerator();
