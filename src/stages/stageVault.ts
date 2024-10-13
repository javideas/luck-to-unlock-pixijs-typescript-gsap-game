import { Application, Container } from "pixi.js";
import { Vault } from "../components/vault";

export async function initStageVault(app: Application, stageContainer: Container, imgAssets: any): Promise<Vault> {
    return new Vault(app, stageContainer, imgAssets);
}
