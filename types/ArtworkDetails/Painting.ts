import { ArtworkDetailsBase } from "./ArtworkDetailsBase";

interface Painting extends ArtworkDetailsBase {
    tools: string;
    canvas: string;
}

export interface Acrylic extends Painting {
    texture: string;
    technique: string;      
    finish: string;     
    dominantColors: string; 
}

export interface Oil extends Painting {
    texture: string;       
    technique: string;
    dominantColors: string;
}

export interface Watercolour extends Painting {
    paperType: string;
    technique: string;
    dominantColors: string;
}

export interface MixedMedia extends Painting {
    elementsUsed: string;
    layeringMethod: string;
    dominantColors: string;
}

export interface OtherPainting extends Painting {
}