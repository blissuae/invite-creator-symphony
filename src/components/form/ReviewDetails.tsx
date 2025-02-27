
import { format, startOfDay } from "date-fns";
import { jsPDF } from "jspdf";

interface ReviewDetailsProps {
  formData: {
    fullName: string;
    instagramId: string;
    occasion: string;
    customOccasion: string;
    hasCharacters: boolean;
    showFaces: boolean;
    characterCount: string;
    colorPalette: string;
    style: string;
    animationStyles: string[];
    deadline: Date | null;
    content: string;
    specialRequirements: string;
    deliveryFormats: {
      videoInvite: boolean;
      stillInvite: boolean;
      logo: boolean;
    };
    hasVideoIdea: boolean;
    videoIdea: string;
    guestCount: string;
  };
}

export const ReviewDetails = ({ formData }: ReviewDetailsProps) => {
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const formatDeadline = (date: Date | null) => {
    if (!date) return "Not selected";
    const formattedDate = format(date, "MMMM d, yyyy");
    return formattedDate;
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

  const calculatePriceRange = () => {
    let baseRange = "";
    
    if (formData.deliveryFormats.videoInvite) {
      if (!formData.hasCharacters) {
        baseRange = "1800-2100 AED";
      } else if (!formData.showFaces) {
        baseRange = "2100-2300 AED";
      } else {
        const characterCount = parseInt(formData.characterCount) || 0;
        const basePrice = 2300;
        const priceIncrement = 200;
        const minPrice = basePrice + (characterCount - 1) * priceIncrement;
        const maxPrice = minPrice + 200;
        baseRange = `${minPrice}-${maxPrice} AED`;
      }
    } else if (formData.deliveryFormats.stillInvite) {
      if (!formData.hasCharacters || !formData.showFaces) {
        baseRange = "1100 AED";
      } else {
        const characterCount = parseInt(formData.characterCount) || 0;
        let price;
        switch (characterCount) {
          case 1:
            price = 1300;
            break;
          case 2:
            price = 1500;
            break;
          case 3:
            price = 1600;
            break;
          default:
            price = 1700;
            break;
        }
        baseRange = `${price} AED`;
      }
    } else {
      return "Contact us for pricing";
    }

    // Apply date-based discounts or urgency fees
    if (formData.deadline) {
      const today = startOfDay(new Date());
      const days = Math.floor((formData.deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      // Check for urgent delivery (6-14 days)
      if (days >= 6 && days <= 14) {
        // Add 500 AED fee for urgent delivery
        if (baseRange.includes("-")) {
          const [min, max] = baseRange.split("-");
          const minPrice = parseInt(min);
          const maxPrice = parseInt(max.replace(" AED", ""));
          baseRange = `${minPrice + 500}-${maxPrice + 500} AED (Urgent Delivery)`;
        } else {
          const price = parseInt(baseRange.replace(" AED", ""));
          baseRange = `${price + 500} AED (Urgent Delivery)`;
        }
        return baseRange;
      }
      
      // Apply discounts for longer lead times
      let discount = 0;
      let discountText = "";
      
      if (days >= 50) {
        discount = 500;
        discountText = " (500 AED OFF!)";
      } else if (days >= 25) {
        discount = 300;
        discountText = " (300 AED OFF!)";
      }

      if (discount !== 0) {
        if (baseRange.includes("-")) {
          const [min, max] = baseRange.split("-");
          const minPrice = parseInt(min);
          const maxPrice = parseInt(max.replace(" AED", ""));
          baseRange = `${minPrice - discount}-${maxPrice - discount} AED${discountText}`;
        } else {
          const price = parseInt(baseRange.replace(" AED", ""));
          baseRange = `${price - discount} AED${discountText}`;
        }
      }
    }

    return baseRange;
  };

  const renderSection = (title: string, content: React.ReactNode) => (
    <div className="space-y-2">
      <h3 className="text-elegant-brown font-serif text-lg">{title}</h3>
      <div className="text-gray-700">{content}</div>
    </div>
  );

  const downloadPDF = () => {
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

    const sections = [
      { title: "Full Name:", content: toTitleCase(formData.fullName) },
      { title: "Instagram ID:", content: toTitleCase(formData.instagramId || "Not Provided") },
      { title: "Occasion:", content: toTitleCase(formData.occasion === "Other" ? formData.customOccasion : formData.occasion) },
      { title: "Delivery Formats:", content: `Video: ${formData.deliveryFormats.videoInvite ? "Yes" : "No"}, Still: ${formData.deliveryFormats.stillInvite ? "Yes" : "No"}, Logo: ${formData.deliveryFormats.logo ? "Yes" : "No"}` },
      { title: "Character Details:", content: toTitleCase(`Characters: ${formData.hasCharacters ? "Yes" : "No"}${formData.hasCharacters ? `, Faces: ${formData.showFaces ? "Yes" : "No"}` : ""}`) },
      { title: "Video Idea:", content: formData.hasVideoIdea ? formData.videoIdea : "No specific idea provided" },
      { title: "Content:", content: formData.content.split("\n\nVideo Idea:")[0].split("\n\nAdditional Requests:")[0] },
      { title: "Style:", content: toTitleCase(formData.style || "Not Selected") },
      { title: "Animation Styles:", content: toTitleCase(formData.animationStyles.join(", ") || "Not Selected") }
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
      { title: "Event Deadline:", content: formatDeadline(formData.deadline) }
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
    doc.text(calculatePriceRange(), contentStartX, yPos);

    const fileName = `Bliss-${formData.fullName.replace(/\s+/g, '')}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-serif text-center text-[#8b7256]">
          Review Your Details
        </h2>
        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-[#8b7256] text-white rounded-lg hover:bg-[#8b7256]/90 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a2 2 0 002 2h14a2 2 0 002-2v-3" />
          </svg>
          Download PDF
        </button>
      </div>

      <div className="bg-[#8b7256]/10 p-6 rounded-lg border-2 border-[#8b7256]/20 mb-6">
        <div className="text-center">
          <h3 className="text-elegant-brown font-serif text-lg mb-2">Estimated Price Range</h3>
          {(() => {
            const priceRange = calculatePriceRange();
            const hasDiscount = priceRange.includes("OFF!");
            const hasUrgentFee = priceRange.includes("Urgent Delivery");
            
            if (hasDiscount) {
              const [discountedPrice, discount] = priceRange.split(" (");
              const [originalPrice] = (() => {
                if (discountedPrice.includes("-")) {
                  const [min, max] = discountedPrice.split("-");
                  const discountAmount = discount.includes("500") ? 500 : 300;
                  return [`${parseInt(min) + discountAmount}-${parseInt(max.replace(" AED", "")) + discountAmount} AED`];
                } else {
                  const discountAmount = discount.includes("500") ? 500 : 300;
                  return [`${parseInt(discountedPrice.replace(" AED", "")) + discountAmount} AED`];
                }
              })();
              
              return (
                <div className="space-y-4">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-gray-500 line-through text-lg">
                      {originalPrice}
                    </span>
                    <div className="text-2xl sm:text-3xl font-medium text-elegant-primary">
                      {discountedPrice}
                    </div>
                  </div>
                  <div className="inline-block animate-bounce">
                    <span className="bg-green-100 text-green-800 text-lg font-semibold px-4 py-1 rounded-full">
                      {discount.replace(")", "")} 🎉
                    </span>
                  </div>
                </div>
              );
            } else if (hasUrgentFee) {
              // For urgent delivery, just show the final price without the before/after format
              const [basePrice] = priceRange.split(" (");
              
              return (
                <div className="space-y-4">
                  <div className="text-2xl sm:text-3xl font-medium text-elegant-primary">
                    {basePrice}
                  </div>
                  <div className="inline-block">
                    <span className="bg-purple-100 text-purple-800 text-lg font-semibold px-4 py-1 rounded-full">
                      Urgent Delivery ⚡
                    </span>
                  </div>
                </div>
              );
            }
            
            return (
              <div className="text-2xl sm:text-3xl font-medium text-elegant-primary">
                {priceRange}
              </div>
            );
          })()}
        </div>
      </div>

      <div className="grid gap-6 p-6 bg-[#8b7256]/5 rounded-lg border border-[#8b7256]/20">
        {renderSection("Full Name", formData.fullName)}
        
        {renderSection("Instagram ID", formData.instagramId || "Not provided")}
        
        {renderSection("Occasion", 
          formData.occasion === "Other" ? formData.customOccasion : formData.occasion
        )}

        {renderSection("Delivery Formats",
          <div className="space-y-1">
            <p>Video Invite (.mp4): {formData.deliveryFormats.videoInvite ? "Yes" : "No"}</p>
            <p>Still Invite (PDF): {formData.deliveryFormats.stillInvite ? "Yes" : "No"}</p>
            <p>Logo (PDF): {formData.deliveryFormats.logo ? "Yes" : "No"}</p>
          </div>
        )}
        
        {renderSection("Character Details", 
          <div className="space-y-2">
            <p>Include Characters: {formData.hasCharacters ? "Yes" : "No"}</p>
            {formData.hasCharacters && (
              <>
                <p>Show Faces: {formData.showFaces ? "Yes" : "No"}</p>
                {formData.showFaces && (
                  <p>Number of Characters: {formData.characterCount}</p>
                )}
              </>
            )}
          </div>
        )}
        
        {renderSection("Video Idea",
          <div className="space-y-2">
            <p>Has Video Idea: {formData.hasVideoIdea ? "Yes" : "No"}</p>
            {formData.hasVideoIdea && formData.videoIdea && (
              <div className="whitespace-pre-wrap bg-white p-4 rounded-md border border-elegant-secondary/20">
                {formData.videoIdea}
              </div>
            )}
          </div>
        )}
        
        {renderSection("Selected Style", 
          <div className="flex items-center gap-2">
            <span className="capitalize">{formData.style || "Not selected"}</span>
          </div>
        )}
        
        {renderSection("Animation Styles", 
          <div className="flex items-center gap-2">
            <span className="capitalize">{formData.animationStyles.join(", ") || "Not selected"}</span>
          </div>
        )}
        
        {renderSection("Selected Palette", 
          <div className="flex flex-col space-y-2">
            {(() => {
              const palette = formatColorPalette(formData.colorPalette);
              return (
                <>
                  <div className="text-elegant-brown font-medium">
                    {palette.name}
                  </div>
                  <div className="text-gray-600">
                    Colors: {palette.colors.join(", ")}
                  </div>
                </>
              );
            })()}
          </div>
        )}
        
        {renderSection("Event Deadline", 
          formatDeadline(formData.deadline)
        )}
        
        {renderSection("Invitation Content", 
          <div className="whitespace-pre-wrap bg-white p-4 rounded-md border border-elegant-secondary/20">
            {formData.content || "No content added"}
          </div>
        )}
        
        {formData.specialRequirements && renderSection("Additional Requests",
          <div className="whitespace-pre-wrap">
            {formData.specialRequirements}
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500 text-center font-serif mt-4">
        Please review all details carefully before submitting
      </div>
    </div>
  );
};
