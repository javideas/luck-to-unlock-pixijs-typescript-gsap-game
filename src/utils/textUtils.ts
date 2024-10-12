import { Text, TextStyle, Container } from "pixi.js";

// Function to create a text element with specified style and content
export function createText(content: string, styleOptions: Partial<TextStyle>, posX: number, posY: number): Text {
    const style = new TextStyle(styleOptions);
    const text = new Text(content, style);
    text.position.set(posX, posY);
    return text;
}

// Function to position a text element within a container
export function positionText(text: Text, container: Container, anchorX: number = 0.5, anchorY: number = 0.5) {
    text.anchor.set(anchorX, anchorY);
    container.addChild(text);
}

