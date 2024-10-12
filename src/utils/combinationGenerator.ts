import { EventEmitter } from 'eventemitter3';

export interface CombinationPair {
    direction: string;
    steps: number;
}

class CombinationGenerator extends EventEmitter {
    generateCombination() {
        const directions = ["clockwise", "counterclockwise"];
        const combination: CombinationPair[] = [];

        for (let i = 0; i < 3; i++) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const steps = Math.floor(Math.random() * 9) + 1; // Random number between 1 and 9
            combination.push({ direction, steps });
        }

        this.emit('newCombination', combination);
    }

    startGenerating() {
        setInterval(() => this.generateCombination(), 3000);
    }
}

export const combinationGenerator = new CombinationGenerator();
