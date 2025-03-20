
import { jsPDF } from "jspdf";
import { InviteFormData } from "@/types/invite-form-types";
import { format, startOfDay } from "date-fns";
import { formatAnimationStyles } from "@/utils/format-utils";
import { addSectionHeader, addContentRow, addCheckboxRow } from "./pdf-section-utils";
import { addColorPalette, addPricingBox } from "./pdf-special-sections";

export const addClientSection = (
  doc: jsPDF, 
  formData: InviteFormData, 
  margin: number, 
  yPos: number, 
  lineHeight: number
): number => {
  yPos = addSectionHeader(doc, "CLIENT DETAILS", margin, yPos);
  yPos = addContentRow(doc, "Full Name:", formData.fullName, margin, yPos, lineHeight);
  yPos = addContentRow(doc, "Email:", formData.email, margin, yPos, lineHeight);
  yPos = addContentRow(doc, "Instagram:", formData.instagramId || "Not Provided", margin, yPos, lineHeight);
  
  return yPos + 15; // Add spacing for next section
};

export const addProjectSection = (
  doc: jsPDF, 
  formData: InviteFormData, 
  margin: number, 
  yPos: number, 
  lineHeight: number
): number => {
  yPos = addSectionHeader(doc, "PROJECT DETAILS", margin, yPos);
  yPos = addContentRow(
    doc, 
    "Occasion:", 
    formData.occasion === "Other" ? formData.customOccasion : formData.occasion, 
    margin, 
    yPos, 
    lineHeight
  );
  
  // Add deliverables with checkboxes
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#8b7256');
  doc.text("Deliverables:", margin + 5, yPos);
  yPos += lineHeight + 3;
  
  yPos = addCheckboxRow(doc, "Video Invitation", formData.deliveryFormats.videoInvite, margin, yPos, lineHeight);
  yPos = addCheckboxRow(doc, "Still Image", formData.deliveryFormats.stillInvite, margin, yPos, lineHeight);
  yPos = addCheckboxRow(doc, "Logo Design", formData.deliveryFormats.logo, margin, yPos, lineHeight);
  
  yPos += 5;
  
  // Add character details (including the character count)
  let characterDetails = "None Requested";
  if (formData.hasCharacters) {
    characterDetails = "Characters: Yes";
    if (formData.showFaces) {
      characterDetails += ", Faces: Yes";
      if (formData.characterCount) {
        characterDetails += `, Number of Characters: ${formData.characterCount}`;
      }
    } else {
      characterDetails += ", Faces: No";
    }
  }
  yPos = addContentRow(doc, "Characters:", characterDetails, margin, yPos, lineHeight);
  
  // Add animation styles in a cleaner format
  const styles = formatAnimationStyles(formData.animationStyles);
  yPos = addContentRow(doc, "Animation Styles:", styles, margin, yPos, lineHeight);
  
  // Format the deadline with urgency indicator
  const formatDeadline = (date: Date | null) => {
    if (!date) return "Not specified";
    
    const today = startOfDay(new Date());
    const deadlineDate = startOfDay(date);
    const days = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const isUrgent = days >= 6 && days <= 14;
    const formattedDate = format(date, "MMMM d, yyyy");
    
    return isUrgent ? `${formattedDate} (Urgent Delivery)` : formattedDate;
  };
  
  yPos = addContentRow(doc, "Deadline:", formatDeadline(formData.deadline), margin, yPos, lineHeight);
  
  return yPos + 15; // Add spacing for next section
};

export const addContentSection = (
  doc: jsPDF, 
  formData: InviteFormData, 
  margin: number, 
  yPos: number, 
  lineHeight: number
): number => {
  yPos = addSectionHeader(doc, "CONTENT DETAILS", margin, yPos);
  
  // Format content to remove any video idea text that's duplicated
  let contentText = formData.content;
  contentText = contentText.split("\n\nVideo Idea:")[0].split("\n\nAdditional Requests:")[0];
  yPos = addContentRow(doc, "Content:", contentText, margin, yPos, lineHeight);
  
  if (formData.hasVideoIdea) {
    yPos = addContentRow(doc, "Video Idea:", formData.videoIdea, margin, yPos, lineHeight);
  }
  
  // Add special requirements if available
  if (formData.specialRequirements) {
    yPos = addContentRow(doc, "Special Requests:", formData.specialRequirements, margin, yPos, lineHeight);
  }
  
  return yPos + 15; // Add spacing for next section
};

export const addColorSection = (
  doc: jsPDF,
  formData: InviteFormData,
  margin: number,
  yPos: number
): number => {
  yPos = addSectionHeader(doc, "COLOR PALETTE", margin, yPos);
  yPos = addColorPalette(doc, formData.colorPalette, margin, yPos);
  
  return yPos + 15; // Add spacing for next section
};
