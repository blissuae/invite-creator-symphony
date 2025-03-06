
import { jsPDF } from "jspdf";
import { InviteFormData } from "@/types/invite-form-types";
import { format, startOfDay } from "date-fns";
import { calculateExactPrice } from "@/utils/pricing-utils";
import { formatAnimationStyles } from "@/utils/format-utils";

export const generatePDF = (formData: InviteFormData): string => {
  const doc = new jsPDF();
  
  const logoWidth = 40;
  const logoHeight = 10;
  doc.addImage("/lovable-uploads/f566f022-debc-49f9-85e0-e54a4d70cfbd.png", "PNG", 20, 20, logoWidth, logoHeight);

  let yPos = 50;
  const lineHeight = 8;
  const leftMargin = 20;
  const contentStartX = 70;
  const pageWidth = 210;
  const contentWidth = pageWidth - leftMargin - 40;

  const primaryColor = '#8b7256';
  const secondaryColor = '#8b7256';

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor);
  doc.setFontSize(16);
  doc.text("Digital Invitation Details", leftMargin, yPos);
  yPos += lineHeight * 2;

  doc.setFontSize(10);

  const addSection = (title: string, content: string) => {
    doc.setFillColor(245, 240, 230);
    doc.rect(leftMargin, yPos - 4, contentWidth, lineHeight + 6, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(secondaryColor);
    doc.text(title, leftMargin, yPos);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#000000');
    const lines = doc.splitTextToSize(content, contentWidth - 60);
    doc.text(lines, contentStartX, yPos);
    yPos += lineHeight * (lines.length + 1);
  };

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const formatDeadline = (date: Date | null) => {
    if (!date) return "Not selected";
    
    const today = startOfDay(new Date());
    const deadlineDate = startOfDay(date);
    const days = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const isUrgent = days >= 6 && days <= 14;
    const formattedDate = format(date, "MMMM d, yyyy");
    
    return isUrgent ? `${formattedDate} (Urgent Delivery)` : formattedDate;
  };

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

  const addColorPalette = () => {
    const palette = formatColorPalette(formData.colorPalette);
    const circleSize = 4;
    const circleSpacing = 6;
    let colorText = `${palette.name} (`;
    
    palette.colors.forEach((color, index) => {
      doc.setFillColor(color);
      doc.circle(contentStartX + (index * (circleSize + circleSpacing)), yPos - 2, circleSize / 2, 'F');
      colorText += `${color}${index < palette.colors.length - 1 ? ', ' : ''}`;
    });
    
    colorText += ')';
    doc.text(colorText, contentStartX + (palette.colors.length * (circleSize + circleSpacing)) + 5, yPos);
    yPos += lineHeight * 2;
  };

  const formatAnimationStylesForPDF = (styles: string[]) => {
    return formatAnimationStyles(styles);
  };

  const getPrice = () => {
    return calculateExactPrice(formData);
  };

  const sections = [
    { title: "Full Name:", content: toTitleCase(formData.fullName) },
    { title: "Email:", content: formData.email },
    { title: "Instagram ID:", content: toTitleCase(formData.instagramId || "Not Provided") },
    { title: "Occasion:", content: toTitleCase(formData.occasion === "Other" ? formData.customOccasion : formData.occasion) },
    { title: "Delivery Formats:", content: `Video: ${formData.deliveryFormats.videoInvite ? "Yes" : "No"}, Still: ${formData.deliveryFormats.stillInvite ? "Yes" : "No"}, Logo: ${formData.deliveryFormats.logo ? "Yes" : "No"}` },
    { title: "Character Details:", content: toTitleCase(`Characters: ${formData.hasCharacters ? "Yes" : "No"}${formData.hasCharacters ? `, Faces: ${formData.showFaces ? "Yes" : "No"}` : ""}`) },
    { title: "Video Idea:", content: formData.hasVideoIdea ? formData.videoIdea : "No specific idea provided" },
    { title: "Content:", content: formData.content.split("\n\nVideo Idea:")[0].split("\n\nAdditional Requests:")[0] },
    { title: "Animation Styles:", content: formatAnimationStylesForPDF(formData.animationStyles) }
  ];

  sections.forEach((section) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    addSection(section.title, section.content);
  });

  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(secondaryColor);
  doc.text("Color Palette:", leftMargin, yPos);
  addColorPalette();

  const remainingSections = [
    { title: "Project Deadline:", content: formatDeadline(formData.deadline) }
  ];

  remainingSections.forEach((section) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    addSection(section.title, section.content);
  });

  if (formData.specialRequirements) {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    addSection("Additional Requests:", formData.specialRequirements);
  }

  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  yPos += lineHeight;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor);
  doc.setFontSize(12);
  doc.text("Estimated Price:", leftMargin, yPos);
  doc.text(getPrice(), contentStartX, yPos);

  // Return PDF as base64 string
  return doc.output('datauristring');
};

