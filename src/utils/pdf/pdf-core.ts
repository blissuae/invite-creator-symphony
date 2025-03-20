
import { jsPDF } from "jspdf";

// Define colors for luxury feel
export const pdfColors = {
  primaryColor: '#8b7256', // Elegant brown
  secondaryColor: '#9b87f5', // Soft purple accent
  backgroundColor: '#F5F0E6', // Soft beige for backgrounds
  headerColor: '#8b7256', // Darker purple for headers
  borderColor: '#E5DEFF', // Light purple for borders
  textColor: '#333333',
  mutedTextColor: '#999999'
};

export const setupPDFPage = (doc: jsPDF) => {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Add elegant background
  doc.setFillColor(pdfColors.backgroundColor);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Add decorative header band
  doc.setFillColor(pdfColors.primaryColor);
  doc.rect(0, 0, pageWidth, 30, 'F');
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
    return { yPos: 50, addedPage: true };
  }
  
  return { yPos, addedPage: false };
};
