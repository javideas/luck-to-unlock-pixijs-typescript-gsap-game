import { Container, Graphics, Text } from 'pixi.js';

export function createDebugPanel(app: Application, posX: number, posY: number): Container {
    posX = posX || app.screen.width;
    posY = posY || app.screen.height * -1;
    const scaleFactor = 2;
    const textPadding = 15;
    const panelWidth = 300;
    const panelHeight = 300;
    const panel = new Container();

    const background = new Graphics();
    background.beginFill(0x333333, 0.8);
    background.drawRoundedRect(-(panelWidth / 2) * scaleFactor, -(panelHeight / 2), panelWidth * scaleFactor, panelHeight * scaleFactor);
    background.endFill();
    panel.addChild(background);

    const text = new Text('Debug Panel', {
        fontSize: 44 * scaleFactor,
        fill: 'white'
    });
    text.anchor.set(0, 1);
    text.position.set((-(panelWidth / 2) * scaleFactor) + textPadding * scaleFactor, 0);
    panel.addChild(text);
    panel.position.set(posX, posY);

    return panel;
}

