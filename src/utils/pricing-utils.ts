
import { InviteFormData } from "@/types/invite-form-types";
import { calculateDateRanges, isDateBooked } from "@/components/form/deadline/dateUtils";

export function calculateExactPrice(data: InviteFormData): string {
  let basePrice = 0;
  
  if (data.deliveryFormats.videoInvite) {
    // Video pricing
    basePrice = 2000; // Basic Video (No Characters)
    
    if (data.hasCharacters && data.characters.length > 0) {
      // Add cost for each character based on face selection
      data.characters.forEach(char => {
        basePrice += char.showFace ? 200 : 100;
      });
    }
  } else if (data.deliveryFormats.stillInvite) {
    // Still pricing
    basePrice = 1100; // Basic Still (No Characters)
    
    if (data.hasCharacters && data.characters.length > 0) {
      // Add cost for each character based on face selection
      data.characters.forEach(char => {
        basePrice += char.showFace ? 100 : 50;
      });
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
    const dateRanges = calculateDateRanges(today);
    
    // Check if the selected date is supposedly booked (won't happen for 100+ days)
    if (isDateBooked(deadlineDate, dateRanges)) {
      return `${basePrice + 300} AED (Premium Date Fee)`;
    }
    
    if (days >= 10 && days <= 18) {
      return `${basePrice + 500} AED (Urgent Delivery)`;
    }
    
    if (days >= 70) {
      return `${basePrice - 500} AED (500 AED OFF!)`;
    } else if (days >= 40) {
      return `${basePrice - 300} AED (300 AED OFF!)`;
    }
  }

  return `${basePrice} AED`;
}
