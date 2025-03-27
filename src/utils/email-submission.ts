
import { InviteFormData } from "@/types/invite-form-types";
import { generatePDF } from "@/utils/pdfGenerator";
import { formatDeliveryFormats, formatColorPalette, formatDeadline, formatAnimationStyles } from "@/utils/format-utils";
import { calculateExactPrice } from "@/utils/pricing-utils";

export async function submitInviteForm(formData: InviteFormData): Promise<boolean> {
  try {
    const pdfDataUri = generatePDF(formData);
    const plainTextMessage = generateEmailMessage(formData);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: '69f9ea87-6fcf-4a71-af9d-b781e7673e13', 
        from_name: formData.fullName,
        subject: `New Invitation Request - ${formData.occasion}`,
        to: 'hello@bliss-go.com',
        message: plainTextMessage,
        attachments: [
          {
            name: `Bliss-${formData.fullName.replace(/\s+/g, '')}.pdf`,
            data: pdfDataUri.split(',')[1] // Remove the Data URI prefix
          }
        ]
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Form submission error:", error);
    return false;
  }
}

function generateEmailMessage(formData: InviteFormData): string {
  // Generate detailed character descriptions
  let characterDetails = "No characters selected";
  
  if (formData.hasCharacters && formData.characters.length > 0) {
    characterDetails = formData.characters.map((char, index) => 
      `- Character ${index + 1}: ${char.showFace ? "With face" : "No face"}`
    ).join('\n');
  }

  // Get pricing information with discount details
  const priceString = calculateExactPrice(formData);
  let discountInfo = "";
  
  // Parse deadline discount/fee information
  if (formData.deadline) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const deadlineDate = new Date(formData.deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    
    const days = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days >= 10 && days <= 18) {
      discountInfo = "Urgent Delivery Fee: +500 AED (for delivery within 10-18 days)";
    } else if (days >= 50) {
      discountInfo = "Early Booking Discount: -500 AED (for booking 50+ days in advance)";
    } else if (days >= 30) {
      discountInfo = "Standard Booking Discount: -300 AED (for booking 30-49 days in advance)";
    } else if (days >= 19) {
      discountInfo = "Regular pricing (no discount or urgent fee)";
    }
  }

  return `
Digital Invitation Request

DETAILS:
--------
Price: ${priceString}
${discountInfo ? `Discount/Fee: ${discountInfo}` : ""}

Full Name: ${formData.fullName}
Email: ${formData.email}
Instagram ID: ${formData.instagramId || "Not provided"}
Occasion: ${formData.occasion === "Other" ? formData.customOccasion : formData.occasion}
Delivery Formats: ${formatDeliveryFormats(formData)}

Character Details: 
- Include Characters: ${formData.hasCharacters ? "Yes" : "No"}
${formData.hasCharacters ? `- Number of Characters: ${formData.characters.length}
${characterDetails}` : ""}

Video Idea: ${formData.hasVideoIdea ? formData.videoIdea : "No specific idea provided"}
Animation Styles: ${formatAnimationStyles(formData.animationStyles)}
Color Palette: ${formatColorPalette(formData.colorPalette)}
Project Deadline: ${formatDeadline(formData.deadline)}
Invitation Content: ${formData.content || "No content added"}
${formData.specialRequirements ? `Additional Requests: ${formData.specialRequirements}` : ""}
${formData.guestCount ? `Guest Count: ${formData.guestCount}` : ""}

A PDF with these details is attached to this email.
`;
}
