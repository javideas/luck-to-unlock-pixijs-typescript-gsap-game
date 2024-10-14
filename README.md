![Background Image](public/images/bg.png)
# "Luck to Unlock" Mini Game

## [Live Demo](https://javideas.github.io/luck-to-unlock-pixijs-typescript-gsap-game/)

## Table of Contents
- [Overview](#overview)
- [Game Flow](#game-flow)
- [Requirements](#requirements)
- [Bonus Features](#bonus-features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contribution Guidelines](#contribution-guidelines)

## Overview
This project is a mini game where the player must unlock a vault to reveal a treasure. The game involves interacting with a vault handle to enter a secret combination.

# How to install
```
git clone https://github.com/javideas/luck-to-unlock-pixijs-typescript-gsap-game.git
cd luck-to-unlock-pixijs-typescript-gsap-game
npm install
npm run dev
```

## Game Flow
1. **Start**: The game begins with the vault door closed. A random secret combination is generated and logged in the browser console.
2. **Combination**: The combination consists of 3 pairs, each with a number (1-9) and a direction ("clockwise" or "counterclockwise"). For example: "2 clockwise, 7 counterclockwise, 5 clockwise".
3. **Interaction**: Players can interact with the vault handle by clicking or dragging. Each interaction rotates the handle by a visual appealing number of steps with animation.
4. **Unlocking**: Enter the correct combination to open the vault door, revealing the treasure with a glitter animation.
5. **Error Handling**: If an incorrect combination is entered, the game resets with a new combination, and the vault handle spins rapidly as a visual cue.

## Requirements
- Using the provided assets.
- Implement using PixiJS (version 7 or later) and TypeScript.
- Ensure the game is responsive across different screen resolutions.
- Maintain a minimum of 5 commits in your repository.

## Bonus Features
- Use promises instead of `setTimeout` and `setInterval`.
- Add a shadow to the handle that spins with it.
- Include a timer on the keypad to track the time taken to unlock the safe, resetting with each new game.
- Automatically close the vault door 5 seconds after it opens, with the handle spinning as if resetting, and start a new game.

## Technologies Used
- **HTML**: For structuring the page.
- **CSS**: For styling the page.
- **JavaScript**: For game logic and interactions.
- **TypeScript**: For type safety and better code management.
- **PixiJS**: For rendering graphics and animations.
- **GSAP**: For creating smooth animations.
- **Vite**: For building and serving the project.

## Project Structure
```
{
    ✔"public": {
        ✔"images": "The image assets",
    },
    ✔"src": {
        ✔"components": {
            ✔"handle.ts": "Manages vault handle sprite and rotations",
            ✔"vault.ts": "Manages vault door sprite and state"
        },
        ✔"config": {
            ✔"progressConfig.json": "Configuration for progress tracking",
        },
        ✔"controllers": {
            ✔"inputManager.ts": "Manages user input (click, drag, etc.)"
        },
        ✔"core": {
            ✔"animManagers": {
                ✔"handleAnims.ts": "Animations related to the handle",
                ✔"vaultAnims.ts": "Animations related to the door"
            },
            ✔"assetLoader.ts": "Handles loading of assets (images, sounds, etc.)",
            ✔"gameManager.ts": "Manage game",
            ✔"gameState.ts": "Track and Update game progression",
            ✔"playerState.ts": "Track and Update player progression",
        },
        ✔"debug": {
            ✔"debugPanel.ts": "Displays debug information such as game state and player inputs"
        },
        ✔"stages": {
            ✔"stageVault.ts": "Handles the vault stage setup and interactions"
        },
        ✔"styles": {
            ✔"styles.css": "Global CSS file for the project"
        },
        ✔"utils": {
            ✔"combinationGenerator.ts": "Generates the random secret combination for the vault",
            ✔"stageUtils.ts": "Utility functions for stage setup"
        },
        ✔"app.ts": "Entry point for game initialization",
    },
    ".gitignore": "Git ignore file",
    "index.html": "Main HTML file",
    "LICENSE": "License file",
    "package-lock.json": "Dependency lock file",
    "package.json": "Project configuration and dependencies",
    "README.md": "This file",
    "tsconfig.json": "TypeScript configuration",
    "vite.config.ts": "Vite configuration"
}
```