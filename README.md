# "Luck to Unlock" Mini Game

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

## Game Flow
1. **Start**: The game begins with the vault door closed. A random secret combination is generated and logged in the browser console.
2. **Combination**: The combination consists of 3 pairs, each with a number (1-9) and a direction ("clockwise" or "counterclockwise"). For example: "2 clockwise, 7 counterclockwise, 5 clockwise". Each number represents a 60° rotation, with 6 being a full rotation.
3. **Interaction**: Players can interact with the vault handle by clicking or dragging. Each interaction rotates the handle by 60° with animation.
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
- **HTML**: For structuring the web page.
- **CSS**: For styling the game interface.
- **JavaScript**: For game logic and interactions.
- **TypeScript**: For type safety and better code management.
- **PixiJS**: For rendering graphics and animations.
- **GSAP**: For creating smooth animations.
- **Vite**: For building and serving the project.

## Project Structure
```
{
    "public": {
        "fonts": "The font assets",
        "images": "The image assets",
        "sounds": "The sound assets"
    },
    "src": {
        "animations": {
            "vaultAnims.ts": "Animations related to the door",
            "handleAnims.ts": "Animations related to the handle",
            "treasureAnims.ts": "Glitter and shine animations"
        },
        "config": {
            "config.ts": "Holds game constants and configuration values"
        },
        "core": {
            "assetLoader.ts": "Handles loading of assets (images, sounds, etc.)",
            "gameManager.ts": "Manage game",
            "gameState.ts": "Track and Update game progression",
            "main.ts": "Entry point for game initialization",
            "playerState.ts": "Track and Update player progression",
            "soundManager.ts": "Manages sound effects"
        },
        "gameObjects": {
            "handle.ts": "Manages vault handle sprite and rotations",
            "timer.ts": "Manages time counter display",
            "treasure.ts": "Manages treasure sprite and animations",
            "vault.ts": "Manages vault door sprite and state"
        },
        "controllers": {
            "inputManager.ts": "Manages user input (click, drag, etc.)"
        },
        "styles": {
            "styles.css": "Global CSS file for the project"
        },
        "types": {
            "animationTypes.ts": "TypeScript interfaces and types for animations",
            "eventTypes.ts": "TypeScript interfaces and types for events",
            "gameTypes.ts": "TypeScript interfaces and types for game objects"
        },
        "utils": {
            "combinationGenerator.ts": "Generates the random secret combination for the vault",
            "combinationValidator.ts": "Validates player input against the secret combination"
        },
        "debug": {
            "debugPanel.ts": "Displays debug information such as game state and player inputs"
        },
        "vite-env.d.ts": "TypeScript declarations for environment variables"
    },
    ".gitignore": "Git ignore file",
    "index.html": "Main HTML file",
    "package-lock.json": "Dependency lock file",
    "package.json": "Project configuration and dependencies",
    "LICENSE": "License file",
    "README.md": "This file",
    "tsconfig.json": "TypeScript configuration",
    "vite.config.ts": "Vite configuration"
}
```

## Contribution Guidelines
- Follow the Conventional Commits specification for commit messages.
- Ensure branches are named using kebab-case.
