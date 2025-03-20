
import { jsPDF } from "jspdf";
import { InviteFormData } from "@/types/invite-form-types";
import { format, startOfDay } from "date-fns";
import { calculateExactPrice } from "@/utils/pricing-utils";
import { formatAnimationStyles } from "@/utils/format-utils";

export const generatePDF = (formData: InviteFormData): string => {
  // Create new PDF with purple accent color theme
  const doc = new jsPDF();
  
  // Define colors for luxury feel
  const primaryColor = '#8b7256'; // Elegant brown
  const secondaryColor = '#9b87f5'; // Soft purple accent
  const backgroundColor = '#F5F0E6'; // Soft beige for backgrounds
  const headerColor = '#8b7256'; // Darker purple for headers
  const borderColor = '#E5DEFF'; // Light purple for borders
  
  // Set page margins and usable area
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const contentWidth = pageWidth - (margin * 2);
  
  // Add elegant background
  doc.setFillColor(backgroundColor);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Add decorative header band
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, pageWidth, 30, 'F');
  
  // Add logo
  const logoWidth = 40;
  const logoHeight = 10;
  doc.addImage("/lovable-uploads/f566f022-debc-49f9-85e0-e54a4d70cfbd.png", "PNG", margin, 10, logoWidth, logoHeight);
  
  // Add title
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#ffffff');
  doc.setFontSize(16);
  doc.text("INVITATION DETAILS", pageWidth - margin - 80, 20);
  
  // Initialize position for content
  let yPos = 50;
  const lineHeight = 8;
  const sectionSpacing = 15;
  
  // Function to add section headers with elegant styling
  const addSectionHeader = (title: string) => {
    // Add decorative element
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos - 5, margin + 5, yPos - 5);
    
    // Add header text
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(headerColor);
    doc.setFontSize(12);
    doc.text(title, margin + 10, yPos);
    
    // Add decorative line after text
    const textWidth = doc.getTextWidth(title);
    doc.line(margin + 15 + textWidth, yPos - 5, margin + contentWidth - 10, yPos - 5);
    
    yPos += 8;
  };
  
  // Function to add content rows in an elegant table style
  const addContentRow = (label: string, value: string) => {
    // Draw subtle row background on alternating rows
    if ((yPos / 10) % 2 === 0) {
      doc.setFillColor(248, 247, 252); // Very light purple
      doc.rect(margin, yPos - 5, contentWidth, lineHeight + 5, 'F');
    }
    
    // Add label
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor);
    doc.setFontSize(10);
    doc.text(label, margin + 5, yPos);
    
    // Add value - with word wrapping for longer content
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#333333');
    
    const maxValueWidth = contentWidth - 70; // Leave room for the label
    const valueXPos = margin + 60;
    
    const lines = doc.splitTextToSize(value, maxValueWidth);
    doc.text(lines, valueXPos, yPos);
    
    // Calculate how much to move down based on number of lines
    const additionalHeight = Math.max((lines.length - 1) * lineHeight, 0);
    
    yPos += lineHeight + additionalHeight + 3;
    
    // Add subtle horizontal separator
    doc.setDrawColor('#E5E5E5');
    doc.setLineWidth(0.2);
    doc.line(margin, yPos - 1, margin + contentWidth, yPos - 1);
  };
  
  // Add Client Details section
  addSectionHeader("CLIENT DETAILS");
  addContentRow("Full Name:", formData.fullName);
  addContentRow("Email:", formData.email);
  addContentRow("Instagram:", formData.instagramId || "Not Provided");
  
  yPos += sectionSpacing;
  
  // Add Project Details section
  addSectionHeader("PROJECT DETAILS");
  addContentRow("Occasion:", formData.occasion === "Other" ? formData.customOccasion : formData.occasion);
  
  // Add delivery formats in a more structured way
  let deliveryFormatsText = "";
  if (formData.deliveryFormats.videoInvite) deliveryFormatsText += "✓ Video Invitation  ";
  if (formData.deliveryFormats.stillInvite) deliveryFormatsText += "✓ Still Image  ";
  if (formData.deliveryFormats.logo) deliveryFormatsText += "✓ Logo Design";
  addContentRow("Deliverables:", deliveryFormatsText);
  
  // Add character details (including the character count as requested)
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
  addContentRow("Characters:", characterDetails);
  
  // Add animation styles in a cleaner format
  const styles = formatAnimationStyles(formData.animationStyles);
  addContentRow("Animation Styles:", styles);
  
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
  
  addContentRow("Deadline:", formatDeadline(formData.deadline));
  
  // Check if we need to add a new page for content
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = 40;
    
    // Add decorative header to new page
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, pageWidth, 20, 'F');
  }
  
  yPos += sectionSpacing;
  
  // Add Content section
  addSectionHeader("CONTENT DETAILS");
  
  // Format content to remove any video idea text that's duplicated
  let contentText = formData.content;
  contentText = contentText.split("\n\nVideo Idea:")[0].split("\n\nAdditional Requests:")[0];
  addContentRow("Content:", contentText);
  
  if (formData.hasVideoIdea) {
    addContentRow("Video Idea:", formData.videoIdea);
  }
  
  // Add special requirements if available
  if (formData.specialRequirements) {
    addContentRow("Special Requests:", formData.specialRequirements);
  }
  
  // Check if we need another page for color palette
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = 40;
    
    // Add decorative header to new page
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, pageWidth, 20, 'F');
  }
  
  yPos += sectionSpacing;
  
  // Add Color Palette section with visual color swatches
  addSectionHeader("COLOR PALETTE");
  
  const formatColorPalette = (paletteId: string) => {
    if (!paletteId) return { name: "No Palette Selected", colors: [] };
    
    // Parse the format: id###colors###name
    const [id, colorsStr, name] = paletteId.split("###");
    
    if (colorsStr && name) {
      const colors = colorsStr.split(",").slice(0, 3);
      while (colors.length < 3) {
        colors.push("#FAFAFA");
      }
      return {
        name: name,
        colors: colors
      };
    }
    
    return {
      name: "Selected Palette",
      colors: ['#E5E5E5', '#D4D4D4', '#FAFAFA']
    };
  };
  
  const palette = formatColorPalette(formData.colorPalette);
  
  // Display palette name
  doc.setFont('helvetica', 'normal');
  doc.setTextColor('#333333');
  doc.setFontSize(10);
  doc.text(`Selected Palette: ${palette.name}`, margin + 5, yPos);
  
  yPos += 10;
  
  // Draw color swatches
  const swatchSize = 15;
  const swatchSpacing = 10;
  const swatchY = yPos - swatchSize;
  
  palette.colors.forEach((color, index) => {
    // Draw color swatch
    doc.setFillColor(color);
    doc.roundedRect(
      margin + 5 + (index * (swatchSize + swatchSpacing)), 
      swatchY, 
      swatchSize, 
      swatchSize, 
      1, 
      1, 
      'F'
    );
    
    // Add color code below
    doc.setFont('courier', 'normal');
    doc.setFontSize(8);
    doc.setTextColor('#666666');
    doc.text(
      color, 
      margin + 5 + (index * (swatchSize + swatchSpacing)), 
      swatchY + swatchSize + 5
    );
  });
  
  yPos += swatchSize + 15;
  
  // Add pricing information with elegant styling
  yPos += sectionSpacing;
  
  // Create fancy pricing box
  const pricingBoxY = yPos;
  const pricingBoxHeight = 40;
  
  // Draw pricing box
  doc.setFillColor('#F8F7FC');
  doc.roundedRect(margin, pricingBoxY, contentWidth, pricingBoxHeight, 3, 3, 'F');
  
  // Add border
  doc.setDrawColor(primaryColor);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, pricingBoxY, contentWidth, pricingBoxHeight, 3, 3, 'S');
  
  // Add pricing label
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor);
  doc.setFontSize(12);
  doc.text("ESTIMATED PRICE:", margin + 10, pricingBoxY + 15);
  
  // Add price value
  const price = calculateExactPrice(formData);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(secondaryColor);
  doc.setFontSize(16);
  doc.text(price, margin + 10, pricingBoxY + 30);
  
  // Add footer
  const footerY = pageHeight - 20;
  doc.setFont('helvetica', 'italic');
  doc.setTextColor('#999999');
  doc.setFontSize(8);
  doc.text("Generated by Bliss Digital Invitations | bliss.com", margin, footerY);
  
  doc.setDrawColor('#E5E5E5');
  doc.setLineWidth(0.5);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  // Add page number
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Page 1 of ${doc.getNumberOfPages()}`, pageWidth - margin - 20, footerY);
  
  // Add page numbers to all pages
  for (let i = 2; i <= doc.getNumberOfPages(); i++) {
    doc.setPage(i);
    
    // Add decorative header to all pages
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, pageWidth, 20, 'F');
    
    // Add footer to all pages
    doc.setDrawColor('#E5E5E5');
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
    
    // Add page number
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${doc.getNumberOfPages()}`, pageWidth - margin - 20, footerY);
    
    // Add footer text
    doc.setFont('helvetica', 'italic');
    doc.setTextColor('#999999');
    doc.setFontSize(8);
    doc.text("Generated by Bliss Digital Invitations | bliss.com", margin, footerY);
  }

  // Return PDF as base64 string
  return doc.output('datauristring');
};
