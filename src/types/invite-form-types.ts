
export interface Character {
  id: string;
  showFace: boolean;
}

export interface InviteFormData {
  fullName: string;
  instagramId: string;
  email: string;
  occasion: string;
  customOccasion: string;
  hasCharacters: boolean;
  characters: Character[];
  showFaces: boolean; // Keeping for backward compatibility
  characterCount: string; // Keeping for backward compatibility
  colorPalette: string;
  animationStyles: string[];
  deadline: Date | null;
  content: string;
  videoIdea: string;
  hasVideoIdea: boolean;
  guestCount: string;
  specialRequirements: string;
  deliveryFormats: {
    videoInvite: boolean;
    stillInvite: boolean;
    logo: boolean;
  };
}

// Initial visible steps (5 pages)
export const INITIAL_FORM_STEPS = [
  "Basic Details",
  "Delivery Formats",
  "Character Options",
  "Deadline",
  "Review"
] as const;

// All possible steps (8 pages)
export const ALL_FORM_STEPS = [
  "Basic Details",
  "Delivery Formats",
  "Character Options",
  "Deadline",
  "Idea & Content",
  "Color Palette",
  "Animation Style",
  "Review"
] as const;

