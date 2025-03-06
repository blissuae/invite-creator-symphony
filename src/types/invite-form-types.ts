
export interface InviteFormData {
  fullName: string;
  instagramId: string;
  email: string;
  occasion: string;
  customOccasion: string;
  hasCharacters: boolean;
  showFaces: boolean;
  characterCount: string;
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

export const FORM_STEPS = [
  "Basic Details",
  "Delivery Formats",
  "Character Options",
  "Idea & Content",
  "Color Palette",
  "Animation Style",
  "Deadline",
  "Review"
] as const;
