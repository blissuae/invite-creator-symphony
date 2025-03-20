import { jsPDF } from "jspdf";
import { InviteFormData } from "@/types/invite-form-types";
import { format, startOfDay } from "date-fns";
import { formatAnimationStyles } from "@/utils/format-utils";
import { addSectionHeader, addContentRow, addCheckboxRow } from "./pdf-section-utils";
import { addColorPalette, addPricingBox } from "./pdf-special-sections";
import { pdfColors, addPageIfNeeded, getTwoColumnXPositions } from "./pdf-core";

export const addClientSection = (
  doc: jsPDF, 
  formData: InviteFormData, 
  margin: number, 
  yPos: number, 
  lineHeight: number
): number => {
  yPos = addSectionHeader(doc, "CLIENT DETAILS", margin, yPos);
  
  // Create a 2-column layout for client details
  const { col1, col2 } = getTwoColumnXPositions(doc, margin);
  
  // Client details in two columns
  yPos = addContentRow(doc, "Full Name:", formData.fullName, col1, yPos, lineHeight);
  yPos = addContentRow(doc, "Email:", formData.email, col2, yPos - lineHeight, lineHeight);
  
  yPos = addContentRow(doc, "Instagram:", formData.instagramId || "Not Provided", col1, yPos, lineHeight);
  
  return yPos + 5; // Add minimal spacing for next section
};

export const addProjectSection = (
  doc: jsPDF, 
  formData: InviteFormData, 
  margin: number, 
  yPos: number, 
  lineHeight: number
): number => {
  yPos = addSectionHeader(doc, "PROJECT DETAILS", margin, yPos);
  
  // Two column layout
  const { col1, col2 } = getTwoColumnXPositions(doc, margin);
  
  const occasion = formData.occasion === "Other" ? formData.customOccasion : formData.occasion;
  yPos = addContentRow(doc, "Occasion:", occasion, col1, yPos, lineHeight);
  
  // Format the deadline with urgency indicator
  const formatDeadline = (date: Date | null) => {
    if (!date) return "Not specified";
    
    const today = startOfDay(new Date());
    const deadlineDate = startOfDay(date);
    const days = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const isUrgent = days >= 6 && days <= 14;
    const formattedDate = format(date, "MMM d, yyyy");
    
    return isUrgent ? `${formattedDate} (Urgent)` : formattedDate;
  };
  
  yPos = addContentRow(doc, "Deadline:", formatDeadline(formData.deadline), col2, yPos - lineHeight, lineHeight);
  
  // Add deliverables with checkboxes - left column
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(pdfColors.primaryColor);
  doc.text("Deliverables:", col1 + 5, yPos);
  
  // Character details - right column
  let characterDetails = "None";
  if (formData.hasCharacters) {
    characterDetails = formData.showFaces ? "Yes, with faces" : "Yes, no faces";
    if (formData.characterCount) {
      characterDetails += `, ${formData.characterCount} characters`;
    }
  }
  
  yPos += lineHeight + 3;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(pdfColors.primaryColor);
  doc.text("Characters:", col2 + 5, yPos - lineHeight - 3);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(pdfColors.textColor);
  doc.text(characterDetails, col2 + 60, yPos - lineHeight - 3);
  
  yPos = addCheckboxRow(doc, "Video Invitation", formData.deliveryFormats.videoInvite, col1, yPos, lineHeight);
  yPos = addCheckboxRow(doc, "Still Image", formData.deliveryFormats.stillInvite, col1, yPos, lineHeight);
  yPos = addCheckboxRow(doc, "Logo Design", formData.deliveryFormats.logo, col1, yPos, lineHeight);
  
  // Add animation styles - more compact
  const styles = formatAnimationStyles(formData.animationStyles);
  yPos += lineHeight;
  yPos = addContentRow(doc, "Animation Styles:", styles, margin, yPos, lineHeight);
  
  return yPos + 5; // Add minimal spacing for next section
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
  
  // Add content with proper spacing
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(pdfColors.primaryColor);
  doc.setFontSize(10);
  doc.text("Content:", margin + 5, yPos);
  
  yPos += 5;
  
  // Content text - more compact
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(pdfColors.textColor);
  doc.setFontSize(9); // Slightly smaller font
  
  const contentWidth = doc.internal.pageSize.width - (margin * 2) - 10;
  const contentLines = doc.splitTextToSize(contentText, contentWidth);
  doc.text(contentLines, margin + 10, yPos);
  
  yPos += (contentLines.length * (lineHeight - 1)) + 5; // Reduced spacing
  
  // Two column layout for additional details if available
  const { col1, col2 } = getTwoColumnXPositions(doc, margin);
  
  if (formData.hasVideoIdea) {
    yPos = addContentRow(doc, "Video Idea:", formData.videoIdea, col1, yPos, lineHeight);
  }
  
  // Add special requirements if available
  if (formData.specialRequirements) {
    if (formData.hasVideoIdea) {
      // If we have video idea, put special requirements in the second column
      yPos = addContentRow(doc, "Special Requests:", formData.specialRequirements, col2, yPos - lineHeight, lineHeight);
    } else {
      // Otherwise put it in the first column
      yPos = addContentRow(doc, "Special Requests:", formData.specialRequirements, col1, yPos, lineHeight);
    }
  }
  
  return yPos + 5; // Add minimal spacing for next section
};

export const addColorSection = (
  doc: jsPDF,
  formData: InviteFormData,
  margin: number,
  yPos: number
): number => {
  yPos = addSectionHeader(doc, "COLOR PALETTE", margin, yPos);
  yPos = addColorPalette(doc, formData.colorPalette, margin, yPos);
  
  return yPos + 5; // Add minimal spacing for next section
};
