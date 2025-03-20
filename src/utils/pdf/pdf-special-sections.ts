
import { jsPDF } from "jspdf";
import { InviteFormData } from "@/types/invite-form-types";
import { calculateExactPrice } from "@/utils/pricing-utils";
import { pdfColors, addPageIfNeeded } from "./pdf-core";

export const addColorPalette = (
  doc: jsPDF, 
  paletteId: string, 
  margin: number, 
  yPos: number
): number => {
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
  
  const palette = formatColorPalette(paletteId);
  
  // Display palette name
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(pdfColors.textColor);
  doc.setFontSize(10);
  doc.text(`Selected Palette: ${palette.name}`, margin + 5, yPos);
  
  // Add more space between text and color swatches
  yPos += 15;
  
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
  
  return yPos + swatchSize + 15;
};

export const addPricingBox = (
  doc: jsPDF, 
  formData: InviteFormData, 
  margin: number, 
  yPos: number
): number => {
  const pageWidth = doc.internal.pageSize.width;
  const contentWidth = pageWidth - (margin * 2);
  const pricingBoxHeight = 40;
  
  // Check if we need to add a new page for pricing box
  const { yPos: newYPos, addedPage } = addPageIfNeeded(doc, yPos, pricingBoxHeight + 10);
  yPos = newYPos;
  
  // Redesigned elegant pricing section - without rounded corners
  // Add divider line before pricing 
  doc.setDrawColor(pdfColors.primaryColor);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  
  yPos += 10;
  
  // Add pricing label
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(pdfColors.primaryColor);
  doc.setFontSize(12);
  doc.text("PRICE:", margin + 10, yPos);
  
  // Add price value - right aligned
  const price = calculateExactPrice(formData);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(pdfColors.secondaryColor);
  doc.setFontSize(16);
  const priceWidth = doc.getTextWidth(price);
  doc.text(price, pageWidth - margin - priceWidth, yPos);
  
  // Add second line below
  yPos += 10;
  doc.setDrawColor(pdfColors.primaryColor);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos + 10, pageWidth - margin, yPos + 10);
  
  return yPos + pricingBoxHeight - 10;
};
