
import { jsPDF } from "jspdf";

// Define colors for clean, professional feel
export const pdfColors = {
  primaryColor: '#333333', // Dark gray for headings
  secondaryColor: '#8b7256', // Elegant brown accent
  backgroundColor: '#FFFFFF', // Clean white background
  sectionBgColor: '#F9F7F4', // Light beige for section backgrounds
  borderColor: '#EEEEEE', // Light gray for borders
  textColor: '#444444',
  mutedTextColor: '#999999'
};

export const setupPDFPage = (doc: jsPDF) => {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Add clean white background
  doc.setFillColor(pdfColors.backgroundColor);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Add subtle header band
  doc.setFillColor('#F9F7F4');
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  // Add thin accent line
  doc.setDrawColor(pdfColors.secondaryColor);
  doc.setLineWidth(0.5);
  doc.line(20, 45, pageWidth - 20, 45);
};

export const getContentWidth = (doc: jsPDF, margin: number) => {
  const pageWidth = doc.internal.pageSize.width;
  return pageWidth - (margin * 2);
};

export const addPageIfNeeded = (
  doc: jsPDF, 
  yPos: number, 
  requiredSpace: number
): { yPos: number, addedPage: boolean } => {
  const pageHeight = doc.internal.pageSize.height;
  
  if (yPos + requiredSpace > pageHeight - 40) {
    doc.addPage();
    setupPDFPage(doc);
    return { yPos: 60, addedPage: true };
  }
  
  return { yPos, addedPage: false };
};

// New function to help with column layout
export const getTwoColumnXPositions = (doc: jsPDF, margin: number): { col1: number, col2: number } => {
  const pageWidth = doc.internal.pageSize.width;
  const col1 = margin;
  const col2 = margin + (pageWidth - (margin * 2)) / 2 + 5;
  
  return { col1, col2 };
};
