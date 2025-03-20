
import { jsPDF } from "jspdf";
import { pdfColors, addPageIfNeeded } from "./pdf-core";

export const addSectionHeader = (
  doc: jsPDF, 
  title: string, 
  margin: number, 
  yPos: number
): number => {
  // Check if we need to add a new page
  const { yPos: newYPos, addedPage } = addPageIfNeeded(doc, yPos, 22);
  yPos = newYPos;
  
  // Add section header with modern design
  doc.setFillColor(pdfColors.sectionBgColor);
  const contentWidth = doc.internal.pageSize.width - (margin * 2);
  doc.rect(margin, yPos - 5, contentWidth, 18, 'F'); // Reduce height
  
  // Add accent line
  doc.setDrawColor(pdfColors.secondaryColor);
  doc.setLineWidth(1);
  doc.line(margin, yPos - 5, margin, yPos + 13);
  
  // Add header text
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(pdfColors.primaryColor);
  doc.setFontSize(11); // Slightly smaller font
  doc.text(title, margin + 10, yPos + 5);
  
  return yPos + 20; // Reduced spacing
};

export const addContentRow = (
  doc: jsPDF, 
  label: string, 
  value: string, 
  margin: number, 
  yPos: number, 
  lineHeight: number
): number => {
  // Check if we need to add a new page
  const { yPos: newYPos, addedPage } = addPageIfNeeded(doc, yPos, lineHeight + 5);
  yPos = newYPos;
  
  // Add label
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(pdfColors.primaryColor);
  doc.setFontSize(10);
  doc.text(label, margin + 5, yPos);
  
  // Add value - with word wrapping for longer content
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(pdfColors.textColor);
  
  const contentWidth = doc.internal.pageSize.width - (margin * 2);
  const maxValueWidth = contentWidth - 70; // Leave room for the label
  const valueXPos = margin + 60;
  
  const lines = doc.splitTextToSize(value, maxValueWidth);
  doc.text(lines, valueXPos, yPos);
  
  // Calculate how much to move down based on number of lines
  const additionalHeight = Math.max((lines.length - 1) * lineHeight, 0);
  
  yPos += lineHeight + additionalHeight + 2; // Reduced spacing
  
  // Add subtle horizontal separator
  doc.setDrawColor('#EEEEEE');
  doc.setLineWidth(0.2);
  doc.line(margin, yPos - 1, margin + contentWidth, yPos - 1);
  
  return yPos;
};

export const addCheckboxRow = (
  doc: jsPDF, 
  label: string, 
  isChecked: boolean, 
  margin: number, 
  yPos: number, 
  lineHeight: number
): number => {
  // Check if we need to add a new page
  const { yPos: newYPos, addedPage } = addPageIfNeeded(doc, yPos, lineHeight + 2);
  yPos = newYPos;
  
  // Draw checkbox (square with rounded corners)
  doc.setDrawColor('#CCCCCC');
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 5, yPos - 4, 5, 5, 1, 1, 'S');
  
  // Fill checkbox if checked
  if (isChecked) {
    doc.setFillColor(pdfColors.secondaryColor);
    doc.roundedRect(margin + 5, yPos - 4, 5, 5, 1, 1, 'F');
    
    // Add checkmark
    doc.setDrawColor('#FFFFFF');
    doc.setLineWidth(0.5);
    doc.line(margin + 6, yPos - 1.5, margin + 7, yPos - 0.5);
    doc.line(margin + 7, yPos - 0.5, margin + 9, yPos - 3);
  }
  
  // Add label
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(pdfColors.textColor);
  doc.setFontSize(9);
  doc.text(label, margin + 15, yPos);
  
  return yPos + lineHeight - 1; // Reduced spacing
};
