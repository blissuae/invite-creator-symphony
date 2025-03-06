
import { format, startOfDay } from "date-fns";

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const formatDeadline = (date: Date | null) => {
  if (!date) return "Not selected";
  
  const today = startOfDay(new Date());
  const deadlineDate = startOfDay(date);
  const days = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const isUrgent = days >= 6 && days <= 14;
  const formattedDate = format(date, "MMMM d, yyyy");
  
  return isUrgent ? `${formattedDate} (Urgent Delivery)` : formattedDate;
};

export const formatColorPalette = (paletteId: string) => {
  if (!paletteId) return { name: "No Palette Selected", colors: [] };

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

export const styleNameMap: Record<string, string> = {
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

export const formatAnimationStyles = (styles: string[]) => {
  if (!styles.length) return "Not selected";
  
  return styles.map(styleId => {
    const displayName = styleNameMap[styleId] || styleId;
    return `${styleId} (${displayName})`;
  }).join(", ");
};
