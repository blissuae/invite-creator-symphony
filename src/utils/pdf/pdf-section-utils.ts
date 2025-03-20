
import { jsPDF } from "jspdf";
import { pdfColors, addPageIfNeeded } from "./pdf-core";

export const addSectionHeader = (
  doc: jsPDF, 
  title: string, 
  margin: number, 
  yPos: number
): number => {
  // Check if we need to add a new page
  const { yPos: newYPos, addedPage } = addPageIfNeeded(doc, yPos, 15);
  yPos = newYPos;
  
  // Add decorative element
  doc.setDrawColor(pdfColors.primaryColor);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos - 5, margin + 5, yPos - 5);
  
  // Add header text
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(pdfColors.headerColor);
  doc.setFontSize(12);
  doc.text(title, margin + 10, yPos);
  
  // Add decorative line after text
  const textWidth = doc.getTextWidth(title);
  const contentWidth = doc.internal.pageSize.width - (margin * 2);
  doc.line(margin + 15 + textWidth, yPos - 5, margin + contentWidth - 10, yPos - 5);
  
  return yPos + 8;
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
  const { yPos: newYPos, addedPage } = addPageIfNeeded(doc, yPos, lineHeight + 10);
  yPos = newYPos;
  
  // Draw subtle row background on alternating rows
  const contentWidth = doc.internal.pageSize.width - (margin * 2);
  if ((yPos / 10) % 2 === 0) {
    doc.setFillColor(248, 247, 252); // Very light purple
    doc.rect(margin, yPos - 5, contentWidth, lineHeight + 5, 'F');
  }
  
  // Add label
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(pdfColors.primaryColor);
  doc.setFontSize(10);
  doc.text(label, margin + 5, yPos);
  
  // Add value - with word wrapping for longer content
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(pdfColors.textColor);
  
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
  const { yPos: newYPos, addedPage } = addPageIfNeeded(doc, yPos, lineHeight + 5);
  yPos = newYPos;
  
  // Draw checkbox
  doc.setDrawColor('#333333');
  doc.setLineWidth(0.3);
  doc.rect(margin + 5, yPos - 4, 5, 5, 'S');
  
  // Fill checkbox if checked
  if (isChecked) {
    doc.setFillColor(pdfColors.primaryColor);
    doc.rect(margin + 5, yPos - 4, 5, 5, 'F');
    
    // Add checkmark
    doc.setDrawColor('#FFFFFF');
    doc.setLineWidth(0.5);
    doc.line(margin + 6, yPos - 1.5, margin + 7, yPos - 0.5);
    doc.line(margin + 7, yPos - 0.5, margin + 9, yPos - 3);
  }
  
  // Add label
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(pdfColors.textColor);
  doc.setFontSize(10);
  doc.text(label, margin + 15, yPos);
  
  return yPos + lineHeight;
};
