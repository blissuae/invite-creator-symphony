
import { format } from "date-fns";

interface ReviewDetailsProps {
  formData: {
    fullName: string;
    occasion: string;
    customOccasion: string;
    colorPalette: string;
    style: string;
    deadline: Date | null;
    content: string;
    guestCount: string;
    specialRequirements: string;
  };
}

export const ReviewDetails = ({ formData }: ReviewDetailsProps) => {
  const renderSection = (title: string, content: React.ReactNode) => (
    <div className="space-y-2">
      <h3 className="text-elegant-brown font-serif text-lg">{title}</h3>
      <div className="text-gray-700">{content}</div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-2xl font-serif text-center mb-8 text-elegant-brown">
        Review Your Details
      </h2>

      <div className="grid gap-6 p-6 bg-elegant-beige/20 rounded-lg border border-elegant-secondary/20">
        {renderSection("Full Name", formData.fullName)}
        
        {renderSection("Occasion", 
          formData.occasion === "Other" ? formData.customOccasion : formData.occasion
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
        
        {renderSection("Expected Guest Count", 
          formData.guestCount || "Not specified"
        )}
        
        {formData.specialRequirements && renderSection("Special Requirements",
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
