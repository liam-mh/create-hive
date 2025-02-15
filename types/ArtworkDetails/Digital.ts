import { ArtworkDetailsBase } from "./ArtworkDetailsBase";

interface Digital extends ArtworkDetailsBase {
    software: string;
    hardware: string;
    resolution: string;
}

export interface DigitalPainting extends Digital {
    brushType: string;
    style: string;
}

export interface Vector extends Digital {
    style: string;
    anchorPoints: string;
    strokeType: string;
    fillMethod: string;
}

export interface ThreeDimensional extends Digital {
    technique: string;
    texturingMethod: string;
    renderEngine: string;
    polyCount: string;
}

export interface OtherDigital extends Digital {
}