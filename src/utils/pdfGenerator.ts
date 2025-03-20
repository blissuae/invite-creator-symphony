
import { jsPDF } from "jspdf";
import { InviteFormData } from "@/types/invite-form-types";
import { setupPDFPage } from "./pdf/pdf-core";
import { addFooter } from "./pdf/pdf-footer";
import { addClientSection, addProjectSection, addContentSection, addColorSection } from "./pdf/pdf-content-sections";
import { addPricingBox } from "./pdf/pdf-special-sections";

export const generatePDF = (formData: InviteFormData): string => {
  // Create new PDF 
  const doc = new jsPDF();
  
  // Set page constants
  const margin = 20;
  const lineHeight = 8;
  
  // Setup the first page
  setupPDFPage(doc);
  
  // Add logo
  const logoWidth = 40;
  const logoHeight = 10;
  doc.addImage("/lovable-uploads/f566f022-debc-49f9-85e0-e54a4d70cfbd.png", "PNG", margin, 10, logoWidth, logoHeight);
  
  // Add title
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#ffffff');
  doc.setFontSize(16);
  doc.text("INVITATION DETAILS", doc.internal.pageSize.width - margin - 80, 20);
  
  // Initialize position for content
  let yPos = 50;
  
  // Add all content sections
  yPos = addClientSection(doc, formData, margin, yPos, lineHeight);
  yPos = addProjectSection(doc, formData, margin, yPos, lineHeight);
  yPos = addContentSection(doc, formData, margin, yPos, lineHeight);
  yPos = addColorSection(doc, formData, margin, yPos);
  
  // Add pricing information with elegant styling
  yPos = addPricingBox(doc, formData, margin, yPos);
  
  // Add footers to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages, margin);
  }

  // Return PDF as base64 string
  return doc.output('datauristring');
};
