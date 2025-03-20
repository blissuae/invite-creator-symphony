
import { jsPDF } from "jspdf";
import { pdfColors } from "./pdf-core";

export const addFooter = (doc: jsPDF, pageNum: number, totalPages: number, margin: number) => {
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const footerY = pageHeight - 20;
  
  // Add divider line
  doc.setDrawColor('#E5E5E5');
  doc.setLineWidth(0.5);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  // Add company info
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(pdfColors.mutedTextColor);
  doc.setFontSize(8);
  doc.text("Generated by Bliss Digital Invitations | www.bliss-go.com", margin, footerY);
  
  // Add page number
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin - 25, footerY);
  
  // Add social media icons using the uploaded image
  const socialY = footerY + 2; // Adjusted Y position for better alignment
  const socialX = margin;
  const socialIconsWidth = 30; // Width of the social icons image
  const socialIconsHeight = 10; // Height of the social icons image
  
  // Add the uploaded social media icons image
  doc.addImage(
    "/lovable-uploads/ab1da135-362a-4ad6-a2f6-fe3f68926c57.png", 
    "PNG", 
    socialX, 
    socialY - socialIconsHeight, 
    socialIconsWidth, 
    socialIconsHeight
  );
  
  // Social media handle - positioned next to the icons
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(pdfColors.mutedTextColor);
  doc.setFontSize(8);
  doc.text("weave.bliss", socialX + socialIconsWidth + 2, socialY - 2);
};
