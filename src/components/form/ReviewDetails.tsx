import { format } from "date-fns";
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
    isUrgent: boolean;
  };
}

export const ReviewDetails = ({ formData }: ReviewDetailsProps) => {
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const formatDeadline = (date: Date | null, isUrgent: boolean) => {
    if (!date) return "Not selected";
    const formattedDate = format(date, "MMMM d, yyyy");
    return isUrgent ? `${formattedDate} (Urgent Delivery)` : formattedDate;
  };

  const calculatePriceRange = () => {
    let priceRange = "";
    
    if (formData.deliveryFormats.videoInvite) {
      if (!formData.hasCharacters) {
        priceRange = "1500-1800 AED";
      } else if (!formData.showFaces) {
        priceRange = "1800-2000 AED";
      } else {
        const characterCount = parseInt(formData.characterCount) || 0;
        const basePrice = 2000;
        const priceIncrement = 200;
        const minPrice = basePrice + (characterCount - 1) * priceIncrement;
        const maxPrice = minPrice + 200;
        priceRange = `${minPrice}-${maxPrice} AED`;
      }
    } else if (formData.deliveryFormats.stillInvite) {
      if (!formData.hasCharacters || !formData.showFaces) {
        priceRange = "800 AED";
      } else {
        const characterCount = parseInt(formData.characterCount) || 0;
        let price;
        switch (characterCount) {
          case 1:
            price = 1000;
            break;
          case 2:
            price = 1200;
            break;
          case 3:
            price = 1300;
            break;
          default:
            price = 1400;
            break;
        }
        priceRange = `${price} AED`;
      }
    } else {
      return "Contact us for pricing";
    }

    if (formData.isUrgent) {
      if (priceRange.includes("-")) {
        const [min, max] = priceRange.split("-");
        const minPrice = parseInt(min);
        const maxPrice = parseInt(max.replace(" AED", ""));
        priceRange = `${minPrice + 300}-${maxPrice + 300} AED`;
      } else {
        const price = parseInt(priceRange.replace(" AED", ""));
        priceRange = `${price + 300} AED`;
      }
    }

    return priceRange;
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

    const sections = [
      { title: "Full Name:", content: toTitleCase(formData.fullName) },
      { title: "Instagram ID:", content: toTitleCase(formData.instagramId || "Not Provided") },
      { title: "Occasion:", content: toTitleCase(formData.occasion === "Other" ? formData.customOccasion : formData.occasion) },
      { title: "Delivery Formats:", content: `Video: ${formData.deliveryFormats.videoInvite ? "Yes" : "No"}, Still: ${formData.deliveryFormats.stillInvite ? "Yes" : "No"}, Logo: ${formData.deliveryFormats.logo ? "Yes" : "No"}` },
      { title: "Character Details:", content: toTitleCase(`Characters: ${formData.hasCharacters ? "Yes" : "No"}${formData.hasCharacters ? `, Faces: ${formData.showFaces ? "Yes" : "No"}, Count: ${formData.characterCount}` : ""}`) },
      { title: "Style:", content: toTitleCase(formData.style || "Not Selected") },
      { title: "Animation Styles:", content: toTitleCase(formData.animationStyles.join(", ") || "Not Selected") },
      { title: "Color Palette:", content: toTitleCase(formData.colorPalette || "Not Selected") },
      { title: "Event Deadline:", content: formatDeadline(formData.deadline, formData.isUrgent || false) },
      { title: "Content:", content: toTitleCase(formData.content || "No Content Added") }
    ];

    sections.forEach((section) => {
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

    if (formData.isUrgent) {
      yPos += lineHeight;
      doc.setFontSize(9);
      doc.setTextColor('#666666');
      doc.text("* 300 AED have been added to the total as urgent delivery charges", leftMargin, yPos);
    }

    yPos += lineHeight * 3;
    doc.setFontSize(10);
    doc.setTextColor('#666666');
    doc.text("Thanks for filling the form. If you have any questions, please reach out to us at hello@bliss-go.com", leftMargin, yPos);

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
          <div className="text-2xl sm:text-3xl font-medium text-elegant-primary">
            {calculatePriceRange()}
          </div>
          {formData.isUrgent && (
            <div className="text-sm text-gray-600 mt-2 italic">
              300 AED have been added to the total as urgent delivery charges
            </div>
          )}
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
                <p>Number of Characters: {formData.characterCount}</p>
              </>
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
        
        {renderSection("Color Palette", 
          <div className="flex items-center gap-2">
            <span className="capitalize">{formData.colorPalette || "Not selected"}</span>
          </div>
        )}
        
        {renderSection("Event Deadline", 
          formatDeadline(formData.deadline, formData.isUrgent || false)
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
