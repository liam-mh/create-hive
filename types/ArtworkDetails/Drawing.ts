import { ArtworkDetailsBase } from "./ArtworkDetailsBase";

interface Drawing extends ArtworkDetailsBase {
    tools: string;
    canvas: string;
}

export interface Sketching extends Drawing {
    technique: string;
}

export interface Illustration extends Drawing {
    style: string;
}

export interface FineArt extends Drawing {
    style: string;
}

export interface OtherDrawing extends Drawing {
}