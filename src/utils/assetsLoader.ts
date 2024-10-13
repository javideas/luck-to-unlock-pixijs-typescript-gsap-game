import { Assets, Texture, SCALE_MODES } from 'pixi.js';
const imgFolderPath = './assets/images/';

const assetsPaths = {
  bankBg: imgFolderPath + 'bg.png',
  doorClosed: imgFolderPath + 'door.png',
  handle: imgFolderPath + 'handle.png',
  handleShadow: imgFolderPath + 'handleShadow.png',
};

type TextureKey = keyof typeof assetsPaths;

// Function to load static sprite assets
export async function loadImgAssets() {
    for (const key in assetsPaths) {
        Assets.add({
            alias: key,
            src: assetsPaths[key as TextureKey],
            data: { scaleMode: SCALE_MODES.LINEAR }
        });
    }
    const allTextureKeys = Object.keys(assetsPaths) as TextureKey[];
    const textures: Record<TextureKey, Texture> = await Assets.load(allTextureKeys);
    
    return textures;
}
