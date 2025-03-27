
import { InviteFormData } from "@/types/invite-form-types";

export function calculateExactPrice(data: InviteFormData): string {
  let basePrice = 0;
  
  if (data.deliveryFormats.videoInvite) {
    if (!data.hasCharacters || data.characters.length === 0) {
      basePrice = 2000; // Basic Video (No Characters)
    } else {
      const characterCount = data.characters.length;
      const facesCount = data.characters.filter(char => char.showFace).length;
      
      if (facesCount > 0) {
        // Video with Characters & Faces
        switch (characterCount) {
          case 1: basePrice = 2400; break;
          case 2: basePrice = 2600; break;
          case 3: basePrice = 2800; break;
          case 4: basePrice = 3000; break;
          case 5: basePrice = 3200; break;
          default: basePrice = 3200 + ((characterCount - 5) * 200); break;
        }
      } else {
        // Video with Characters but no Faces
        switch (characterCount) {
          case 1: basePrice = 2200; break;
          case 2: basePrice = 2300; break;
          case 3: basePrice = 2400; break;
          case 4: basePrice = 2500; break;
          case 5: basePrice = 2600; break;
          default: basePrice = 2600 + ((characterCount - 5) * 100); break;
        }
      }
    }
  } else if (data.deliveryFormats.stillInvite) {
    if (!data.hasCharacters || data.characters.length === 0) {
      basePrice = 1100; // Basic Still (No Characters)
    } else {
      const characterCount = data.characters.length;
      const facesCount = data.characters.filter(char => char.showFace).length;
      
      if (facesCount > 0) {
        // Still with Characters & Faces
        switch (characterCount) {
          case 1: basePrice = 1400; break;
          case 2: basePrice = 1600; break;
          case 3: basePrice = 1700; break;
          case 4: basePrice = 1800; break;
          case 5: basePrice = 1900; break;
          default: basePrice = 1900 + ((characterCount - 5) * 100); break;
        }
      } else {
        // Still with Characters but no Faces
        switch (characterCount) {
          case 1: basePrice = 1200; break;
          case 2: basePrice = 1300; break;
          case 3: basePrice = 1400; break;
          case 4: basePrice = 1500; break;
          case 5: basePrice = 1600; break;
          default: basePrice = 1600 + ((characterCount - 5) * 100); break;
        }
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
    
    if (days >= 10 && days <= 18) {
      return `${basePrice + 500} AED (Urgent Delivery)`;
    }
    
    if (days >= 50) {
      return `${basePrice - 500} AED (500 AED OFF!)`;
    } else if (days >= 30) {
      return `${basePrice - 300} AED (300 AED OFF!)`;
    }
  }

  return `${basePrice} AED`;
}
