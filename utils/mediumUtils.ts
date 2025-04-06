import { Medium, PrimaryMedium, SecondaryMedium } from "@/types/Medium";

export const getTagsFromMedium = (medium: Medium): string[] => {
  return [medium.primary, medium.secondary];
};

export const createMedium = (
  primary: PrimaryMedium | null,
  secondary: SecondaryMedium | null
): Medium | null => {
  if (primary && secondary) {
    return {
      primary: primary,
      secondary: secondary,
    };
  }
  return null;
};