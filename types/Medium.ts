export type PrimaryMedium = "drawing" | "painting" | "digital art";

export type DrawingSecondary = "sketching" | "illustration" | "fine art" | "other";
export type PaintingSecondary = "acrylic" | "oil" | "watercolour" | "mixed media" | "other";
export type DigitalArtSecondary = "digital painting" | "vector" | "3D" | "other";

export type SecondaryMedium = DrawingSecondary | PaintingSecondary | DigitalArtSecondary;

export interface Medium {
  primary: PrimaryMedium;
  secondary: SecondaryMedium
}