
import { InviteFormData } from "@/types/invite-form-types";

export function calculateExactPrice(data: InviteFormData): string {
  let basePrice = 0;
  
  if (data.deliveryFormats.videoInvite) {
    if (!data.hasCharacters) {
      basePrice = 2000;
    } else if (!data.showFaces) {
      basePrice = 2200;
    } else {
      const characterCount = parseInt(data.characterCount) || 0;
      basePrice = 2400 + (characterCount - 1) * 200;
    }
  } else if (data.deliveryFormats.stillInvite) {
    if (!data.hasCharacters || !data.showFaces) {
      basePrice = 1100;
    } else {
      const characterCount = parseInt(data.characterCount) || 0;
      switch (characterCount) {
        case 1: basePrice = 1300; break;
        case 2: basePrice = 1500; break;
        case 3: basePrice = 1600; break;
        default: basePrice = 1700; break;
      }
    }
  } else {
    return "Contact us for pricing";
  }

  if (data.deadline) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const deadlineDate = new Date(data.deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    
    const days = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days >= 6 && days <= 14) {
      return `${basePrice + 500} AED (Urgent Delivery)`;
    }
    
    if (days >= 50) {
      return `${basePrice - 500} AED (500 AED OFF!)`;
    } else if (days >= 25) {
      return `${basePrice - 300} AED (300 AED OFF!)`;
    }
  }

  return `${basePrice} AED`;
}
