export interface CombinationPair {
    direction: string;
    steps: number;
}

export function generateCombination(): Promise<CombinationPair[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const directions = ["clockwise", "counterclockwise"];
            const combination: CombinationPair[] = [];

            for (let i = 0; i < 3; i++) {
                const direction = directions[Math.floor(Math.random() * directions.length)];
                const steps = Math.floor(Math.random() * 9) + 1; // Random number between 1 and 9
                combination.push({ direction, steps });
            }

            resolve(combination);
        }, 1000); // Simulate a delay of 1 second
    });
}

