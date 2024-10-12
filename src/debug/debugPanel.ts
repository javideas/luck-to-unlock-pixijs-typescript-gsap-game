import { Container, Graphics, Application, Text } from 'pixi.js';
import { createText, positionText } from '../utils/textUtils';
import progressConfig from '../core/progressConfig.json'; // Assuming the JSON is imported

function createPanelBackground(width: number, height: number): Graphics {
    const background = new Graphics();
    background.beginFill(0x333333, 0.8);
    background.drawRoundedRect(0, 0, width, height);
    background.endFill();
    return background;
}

function createTitleText(title: string, scaleFactor: number): Text {
    return createText(title, {
        fontSize: 44 * scaleFactor,
        fill: 'white'
    }, 0, 0);
}

function createInfoTexts(infoTexts: Record<string, { label: string, value: any }>, scaleFactor: number): Text[] {
    const texts: Text[] = [];

    for (const key in infoTexts) {
        const info = infoTexts[key];
        if (typeof info.value === 'object') {
            // Add a title for the current combination section
            texts.push(createText(`${info.label}:`, {
                fontSize: 32 * scaleFactor,
                fill: 'lightgray',
                fontWeight: 'bold'
            }, 0, 0));

            for (const pairKey in info.value) {
                const pair = info.value[pairKey];
                texts.push(createText(`${pair.label}: Direction: ${pair.direction}, Steps: ${pair.steps}`, {
                    fontSize: 32 * scaleFactor,
                    fill: 'lightgray'
                }, 0, 0));
            }
        } else {
            texts.push(createText(`${info.label}: ${info.value}`, {
                fontSize: 32 * scaleFactor,
                fill: 'lightgray'
            }, 0, 0));
        }
    }

    return texts;
}

function calculatePanelDimensions(titleText: Text, infoTexts: Text[], textPadding: number): { width: number, height: number } {
    const maxWidth = Math.max(titleText.width, ...infoTexts.map(text => text.width)) + textPadding * 2;
    const totalHeight = titleText.height + infoTexts.reduce((sum, text) => sum + text.height, 0) + textPadding * (infoTexts.length + 1);
    return { width: maxWidth, height: totalHeight };
}

function createColoredButton(width: number, height: number, color: number, scaleFactor: number): Graphics {
    const button = new Graphics();
    button.beginFill(color);
    button.drawRoundedRect(0, 0, width * scaleFactor, height * scaleFactor, 10);
    button.endFill();
    button.eventMode = 'static'; // Use 'static' or 'dynamic' based on your needs
    button.buttonMode = true; // Show a hand cursor on hover
    return button;
}

export function createDebugPanel(app: Application, posX: number, posY: number): Container {
    const scaleFactor = 2;
    const textPadding = 35;
    const titlePadding = 20;
    const buttonPadding = 120; // Padding between text and button
    const buttonWidth = 100;
    const buttonHeight = 50;
    const panel = new Container();

    const titleText = createTitleText("Debug Panel", scaleFactor);
    const infoTexts = createInfoTexts(progressConfig.infoTexts, scaleFactor);

    positionText(titleText, panel, 0, 0);
    infoTexts.forEach((text, index) => {
        positionText(text, panel, 0, 0);
    });

    const { width: panelWidth, height: panelHeight } = calculatePanelDimensions(titleText, infoTexts, textPadding);

    const background = createPanelBackground(panelWidth, panelHeight);
    panel.addChildAt(background, 0);

    titleText.position.set(textPadding, textPadding);
    infoTexts.forEach((text, index) => {
        text.position.set(
            textPadding,
            titleText.height + textPadding + titlePadding + textPadding * index + infoTexts.slice(0, index).reduce((sum, t) => sum + t.height, 0)
        );
    });

    // Create and position the button
    const button = createColoredButton(buttonWidth, buttonHeight, 0xFF0000, scaleFactor);
    button.position.set(panelWidth - buttonWidth - buttonPadding, textPadding); // Align to the right side
    panel.addChild(button);

    // Add event listener to toggle infoTexts visibility
    button.on('pointerdown', () => {
        console.log('Button pressed!');
        const isVisible = infoTexts[0].visible;
        infoTexts.forEach(text => text.visible = !isVisible);

        // Adjust panel size
        const newHeight = isVisible ? titleText.height + textPadding * 2 : panelHeight;
        background.height = newHeight;
    });

    // Start open and toggle off after a short delay
    setTimeout(() => {
        infoTexts.forEach(text => text.visible = false);
        background.height = titleText.height + textPadding * 2;
    }, 100); // Adjust delay as needed

    panel.position.set(posX, posY);

    return panel;
}
