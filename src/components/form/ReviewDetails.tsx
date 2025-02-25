
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
    animationStyle: string[];
    deadline: Date | null;
    content: string;
    specialRequirements: string;
    deliveryFormats: {
      videoInvite: boolean;
      stillInvite: boolean;
      logo: boolean;
    };
  };
}

export const ReviewDetails = ({ formData }: ReviewDetailsProps) => {
  const calculatePriceRange = () => {
    // If video invite is selected, use original pricing
    if (formData.deliveryFormats.videoInvite) {
      if (!formData.hasCharacters) {
        return "1500-1800 AED";
      }
      if (!formData.showFaces) {
        return "1800-2000 AED";
      }
      // Calculate based on character count for video with faces
      const characterCount = parseInt(formData.characterCount) || 0;
      const basePrice = 2000;
      const priceIncrement = 200;
      const minPrice = basePrice + (characterCount - 1) * priceIncrement;
      const maxPrice = minPrice + 200;
      return `${minPrice}-${maxPrice} AED`;
    }

    // If video is not selected but still invite is selected
    if (formData.deliveryFormats.stillInvite) {
      if (!formData.hasCharacters || !formData.showFaces) {
        return "800 AED";
      }
      // Calculate price based on character count for still invite with faces
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
        default: // 4 or 5 characters
          price = 1400;
          break;
      }
      return `${price} AED`;
    }

    // If neither video nor still invite is selected
    return "Contact us for pricing";
  };

  const renderSection = (title: string, content: React.ReactNode) => (
    <div className="space-y-2">
      <h3 className="text-elegant-brown font-serif text-lg">{title}</h3>
      <div className="text-gray-700">{content}</div>
    </div>
  );

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add Bliss logo
    const logoWidth = 40;
    const logoHeight = 15;
    doc.addImage("/lovable-uploads/f566f022-debc-49f9-85e0-e54a4d70cfbd.png", "PNG", 20, 20, logoWidth, logoHeight);

    // Set initial position after logo
    let yPos = 50;
    const lineHeight = 8; // Reduced line height
    const leftMargin = 20;
    const middleX = 105; // Middle of A4 page
    const contentStartX = 60;
    const secondColumnX = middleX + 10;
    const secondColumnContentX = secondColumnX + 40;
    const pageWidth = 210;
    const contentWidth = 80; // Reduced width for two columns

    // Set colors to match form
    const primaryColor = '#7E69AB';
    const secondaryColor = '#8B7355';

    // Set title
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor);
    doc.setFontSize(16); // Reduced title size
    doc.text("Digital Invitation Details", leftMargin, yPos);
    yPos += lineHeight * 2;

    // Reset font size for content
    doc.setFontSize(10); // Reduced content size

    // Add content sections with two-column layout
    const addSection = (title: string, content: string, isLeftColumn: boolean = true) => {
      const startX = isLeftColumn ? leftMargin : secondColumnX;
      const contentX = isLeftColumn ? contentStartX : secondColumnContentX;
      
      // Draw section background
      doc.setFillColor(245, 240, 230);
      doc.rect(startX, yPos - 4, contentWidth, lineHeight + 6, 'F');
      
      // Add title
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(secondaryColor);
      doc.text(title, startX, yPos);
      
      // Add content
      doc.setFont('helvetica', 'normal');
      doc.setTextColor('#000000');
      const lines = doc.splitTextToSize(content, contentWidth - 20);
      doc.text(lines, contentX, yPos);
      
      if (!isLeftColumn) {
        yPos += lineHeight * (lines.length + 1);
      }
      return lines.length;
    };

    // Split sections into two columns
    const leftColumnSections = [
      { title: "Full Name:", content: formData.fullName },
      { title: "Instagram ID:", content: formData.instagramId || "Not provided" },
      { title: "Occasion:", content: formData.occasion === "Other" ? formData.customOccasion : formData.occasion },
      { title: "Style:", content: formData.style || "Not selected" },
      { title: "Color Palette:", content: formData.colorPalette || "Not selected" },
      { title: "Animation Style:", content: formData.animationStyle?.join(", ") || "Not selected" }
    ];

    const rightColumnSections = [
      { title: "Delivery Formats:", content: `Video: ${formData.deliveryFormats.videoInvite ? "Yes" : "No"}\nStill: ${formData.deliveryFormats.stillInvite ? "Yes" : "No"}\nLogo: ${formData.deliveryFormats.logo ? "Yes" : "No"}` },
      { title: "Character Details:", content: `Characters: ${formData.hasCharacters ? "Yes" : "No"}${formData.hasCharacters ? `\nFaces: ${formData.showFaces ? "Yes" : "No"}\nCount: ${formData.characterCount}` : ""}` },
      { title: "Event Deadline:", content: formData.deadline ? format(formData.deadline, "MMMM d, yyyy") : "Not selected" },
      { title: "Content:", content: formData.content || "No content added" }
    ];

    // Draw vertical separator
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.1);
    doc.line(middleX, yPos - 10, middleX, yPos + 100);

    // Add sections in two columns
    let maxY = yPos;
    leftColumnSections.forEach((section) => {
      const lines = addSection(section.title, section.content, true);
      yPos += lineHeight * (lines + 1);
    });

    // Reset yPos for right column
    let rightYPos = 50 + lineHeight * 2;
    rightColumnSections.forEach((section) => {
      const lines = addSection(section.title, section.content, false);
      rightYPos += lineHeight * (lines + 1);
    });

    // Update maxY to the higher of the two columns
    maxY = Math.max(yPos, rightYPos);

    // Add additional requests if present
    if (formData.specialRequirements) {
      maxY += lineHeight;
      doc.setDrawColor(primaryColor);
      doc.setLineWidth(0.1);
      doc.line(leftMargin, maxY, pageWidth - leftMargin, maxY);
      maxY += lineHeight;
      addSection("Additional Requests:", formData.specialRequirements, true);
    }

    // Add price at the bottom with padding
    maxY += lineHeight * 2;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor);
    doc.setFontSize(12);
    doc.text("Estimated Price:", leftMargin, maxY);
    doc.text(calculatePriceRange(), contentStartX, maxY);

    // Add bottom padding
    maxY += lineHeight * 2;

    doc.save("digital-invitation-details.pdf");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-serif text-center text-elegant-brown">
          Review Your Details
        </h2>
        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-elegant-primary text-white rounded-lg hover:bg-elegant-primary/90 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a2 2 0 002 2h14a2 2 0 002-2v-3" />
          </svg>
          Download PDF
        </button>
      </div>

      <div className="bg-elegant-beige/40 p-6 rounded-lg border-2 border-elegant-primary/20 mb-6">
        <div className="text-center">
          <h3 className="text-elegant-brown font-serif text-lg mb-2">Estimated Price Range</h3>
          <div className="text-2xl sm:text-3xl font-medium text-elegant-primary">
            {calculatePriceRange()}
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 bg-elegant-beige/20 rounded-lg border border-elegant-secondary/20">
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
        
        {renderSection("Animation Style", 
          <div className="flex items-center gap-2">
            <span className="capitalize">{formData.animationStyle?.join(", ") || "Not selected"}</span>
          </div>
        )}
        
        {renderSection("Color Palette", 
          <div className="flex items-center gap-2">
            <span className="capitalize">{formData.colorPalette || "Not selected"}</span>
          </div>
        )}
        
        {renderSection("Event Deadline", 
          formData.deadline 
            ? format(formData.deadline, "MMMM d, yyyy")
            : "Not selected"
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
