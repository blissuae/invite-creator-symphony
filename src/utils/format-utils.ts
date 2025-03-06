
import { InviteFormData } from "@/types/invite-form-types";

export function formatDeliveryFormats(formData: InviteFormData): string {
  const formats = [];
  if (formData.deliveryFormats.videoInvite) formats.push("Video Invite (.mp4)");
  if (formData.deliveryFormats.stillInvite) formats.push("Still Invite (PDF)");
  if (formData.deliveryFormats.logo) formats.push("Logo (PDF)");
  return formats.join(", ");
}

export function formatColorPalette(colorPalette: string): string {
  if (!colorPalette) return "Not selected";
  const [id, colorsStr, name] = colorPalette.split("###");
  if (colorsStr && name) {
    const colors = colorsStr.split(",").slice(0, 3);
    return `${name} (${colors.join(", ")})`;
  }
  return "Selected Palette";
}

export function formatDeadline(deadline: Date | null): string {
  if (!deadline) return "Not selected";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  
  const days = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const formattedDate = deadline.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  const isUrgent = days >= 6 && days <= 14;
  return isUrgent ? `${formattedDate} (Urgent Delivery)` : formattedDate;
}

export function formatAnimationStyles(styles: string[]): string {
  const styleMap: Record<string, string> = {
    "style1": "Cute",
    "style2": "Earthy",
    "style3": "Elegant",
    "style4": "Fantasy",
    "style5": "Hand-Drawn",
    "style6": "Heritage",
    "style7": "Luxury",
    "style8": "Magical",
    "style9": "Minimal",
    "style10": "Nostalgic",
    "style11": "Regal",
    "style12": "Royal",
    "style13": "Serene",
    "style14": "Traditional",
    "style15": "Whimsical"
  };
  
  if (!styles.length) return "Not selected";
  
  return styles.map(style => {
    return `${style} (${styleMap[style as keyof typeof styleMap] || style})`;
  }).join(", ");
}
