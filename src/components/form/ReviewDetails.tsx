
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
    let yPos = 20;
    const lineHeight = 10;

    // Set title
    doc.setFontSize(20);
    doc.text("Digital Invitation Details", 20, yPos);
    yPos += lineHeight * 2;

    // Reset font size for content
    doc.setFontSize(12);

    // Add content sections
    const addSection = (title: string, content: string) => {
      doc.setFont(undefined, 'bold');
      doc.text(title, 20, yPos);
      doc.setFont(undefined, 'normal');
      yPos += lineHeight;
      const lines = doc.splitTextToSize(content, 170);
      doc.text(lines, 20, yPos);
      yPos += lineHeight * lines.length;
      yPos += lineHeight / 2;
    };

    addSection("Full Name:", formData.fullName);
    addSection("Instagram ID:", formData.instagramId || "Not provided");
    addSection("Occasion:", formData.occasion === "Other" ? formData.customOccasion : formData.occasion);
    addSection("Delivery Formats:", `Video Invite: ${formData.deliveryFormats.videoInvite ? "Yes" : "No"}
Still Invite: ${formData.deliveryFormats.stillInvite ? "Yes" : "No"}
Logo: ${formData.deliveryFormats.logo ? "Yes" : "No"}`);
    addSection("Character Details:", `Include Characters: ${formData.hasCharacters ? "Yes" : "No"}
${formData.hasCharacters ? `Show Faces: ${formData.showFaces ? "Yes" : "No"}
Number of Characters: ${formData.characterCount}` : ""}`);
    addSection("Style:", formData.style || "Not selected");
    addSection("Color Palette:", formData.colorPalette || "Not selected");
    addSection("Event Deadline:", formData.deadline ? format(formData.deadline, "MMMM d, yyyy") : "Not selected");
    addSection("Content:", formData.content || "No content added");
    if (formData.specialRequirements) {
      addSection("Additional Requests:", formData.specialRequirements);
    }
    addSection("Estimated Price:", calculatePriceRange());

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
