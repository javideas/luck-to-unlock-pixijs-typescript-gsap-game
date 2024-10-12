import { Container, Graphics, Application } from 'pixi.js';
import { createText, positionText } from '../utils/textUtils';

export function createDebugPanel(app: Application, posX: number, posY: number): Container {
    const scaleFactor = 2;
    const textPadding = 35;
    const panel = new Container();

    const titleText = createText('Debug Panel', {
        fontSize: 44 * scaleFactor,
        fill: 'white'
    }, 0, 0);

    const infoText = createText('Additional Info', {
        fontSize: 32 * scaleFactor,
        fill: 'lightgray'
    }, 0, 50);

    positionText(titleText, panel, 0, 0);
    positionText(infoText, panel, 0, 0);

    const panelWidth = Math.max(titleText.width, infoText.width) + textPadding * 2;
    const panelHeight = titleText.height + infoText.height + textPadding * 2;

    const background = new Graphics();
    background.beginFill(0x333333, 0.8);
    background.drawRoundedRect(0, 0, panelWidth, panelHeight);
    background.endFill();
    panel.addChildAt(background, 0);

    titleText.position.set(textPadding, textPadding);
    infoText.position.set(textPadding, titleText.height + textPadding);

    panel.position.set(posX, posY);

    return panel;
}
