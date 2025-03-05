
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generatePDF } from "@/utils/pdfGenerator";

export interface InviteFormData {
  fullName: string;
  instagramId: string;
  occasion: string;
  customOccasion: string;
  hasCharacters: boolean;
  showFaces: boolean;
  characterCount: string;
  colorPalette: string;
  animationStyles: string[];
  deadline: Date | null;
  content: string;
  videoIdea: string;
  hasVideoIdea: boolean;
  guestCount: string;
  specialRequirements: string;
  deliveryFormats: {
    videoInvite: boolean;
    stillInvite: boolean;
    logo: boolean;
  };
}

export const FORM_STEPS = [
  "Basic Details",
  "Delivery Formats",
  "Character Options",
  "Idea & Content",
  "Color Palette",
  "Animation Style",
  "Deadline",
  "Review"
] as const;

export const useInviteForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<InviteFormData>({
    fullName: "",
    instagramId: "",
    occasion: "",
    customOccasion: "",
    hasCharacters: false,
    showFaces: false,
    characterCount: "",
    colorPalette: "",
    animationStyles: [],
    deadline: null,
    content: "",
    videoIdea: "",
    hasVideoIdea: false,
    guestCount: "",
    specialRequirements: "",
    deliveryFormats: {
      videoInvite: true,
      stillInvite: true,
      logo: true,
    }
  });

  const updateFormData = (field: keyof InviteFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep === 0) {
      if (!formData.fullName.trim() || !formData.instagramId.trim() || !formData.occasion ||
          (formData.occasion === 'Other' && !formData.customOccasion.trim())) {
        toast({
          title: "Required Fields Missing",
          description: "Please fill in all required fields to continue.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 1) {
      if (!formData.deliveryFormats.videoInvite && 
          !formData.deliveryFormats.stillInvite && 
          !formData.deliveryFormats.logo) {
        toast({
          title: "Selection Required",
          description: "Please select at least one delivery format to continue.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 3) {  // Content page validation
      if (formData.hasVideoIdea && !formData.videoIdea?.trim()) {
        toast({
          title: "Content Required",
          description: "Please share your idea or select 'No'.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 4) {  // Color Palette validation
      if (!formData.colorPalette) {
        toast({
          title: "Selection Required",
          description: "Please select a color palette to continue.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 5 && formData.animationStyles.length === 0) {
      toast({
        title: "Selection Required",
        description: "Choose up to 3 animation styles to continue",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 6) {  // Deadline validation
      if (!formData.deadline) {
        toast({
          title: "Selection Required",
          description: "Please select a deadline to continue.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      setMaxStep(Math.max(maxStep, currentStep + 1));
    }
  };

  const isContentReadyNotSelected = (content: string) => {
    return !content.includes("Content will be shared later.") && content.trim() === "";
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const pdfDataUri = generatePDF(formData);
      
      // Create a more mobile-friendly email format
      const formatDeliveryFormats = () => {
        const formats = [];
        if (formData.deliveryFormats.videoInvite) formats.push("Video Invite (.mp4)");
        if (formData.deliveryFormats.stillInvite) formats.push("Still Invite (PDF)");
        if (formData.deliveryFormats.logo) formats.push("Logo (PDF)");
        return formats.join(", ");
      };

      const formatColorPalette = () => {
        if (!formData.colorPalette) return "Not selected";
        const [id, colorsStr, name] = formData.colorPalette.split("###");
        if (colorsStr && name) {
          const colors = colorsStr.split(",").slice(0, 3);
          return `${name} (${colors.join(", ")})`;
        }
        return "Selected Palette";
      };

      const formatDeadline = () => {
        if (!formData.deadline) return "Not selected";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const deadlineDate = new Date(formData.deadline);
        deadlineDate.setHours(0, 0, 0, 0);
        
        const days = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const formattedDate = formData.deadline.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        
        const isUrgent = days >= 6 && days <= 14;
        return isUrgent ? `${formattedDate} (Urgent Delivery)` : formattedDate;
      };

      // Format animation styles with their display names
      const formatAnimationStyles = () => {
        const styleMap = {
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
        
        if (!formData.animationStyles.length) return "Not selected";
        
        return formData.animationStyles.map(style => {
          const displayName = styleMap[style as keyof typeof styleMap] || style;
          return `${style} (${displayName})`;
        }).join(", ");
      };

      // Helper function to calculate price
      function calculateExactPrice(data: InviteFormData) {
        let basePrice = 0;
        
        if (data.deliveryFormats.videoInvite) {
          if (!data.hasCharacters) {
            basePrice = 2000;
          } else if (!data.showFaces) {
            basePrice = 2200;
          } else {
            const characterCount = parseInt(data.characterCount) || 0;
            basePrice = 2400 + (characterCount - 1) * 200;
          }
        } else if (data.deliveryFormats.stillInvite) {
          if (!data.hasCharacters || !data.showFaces) {
            basePrice = 1100;
          } else {
            const characterCount = parseInt(data.characterCount) || 0;
            switch (characterCount) {
              case 1: basePrice = 1300; break;
              case 2: basePrice = 1500; break;
              case 3: basePrice = 1600; break;
              default: basePrice = 1700; break;
            }
          }
        } else {
          return "Contact us for pricing";
        }

        if (data.deadline) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const deadlineDate = new Date(data.deadline);
          deadlineDate.setHours(0, 0, 0, 0);
          
          const days = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          
          if (days >= 6 && days <= 14) {
            return `${basePrice + 500} AED (Urgent Delivery)`;
          }
          
          if (days >= 50) {
            return `${basePrice - 500} AED (500 AED OFF!)`;
          } else if (days >= 25) {
            return `${basePrice - 300} AED (300 AED OFF!)`;
          }
        }

        return `${basePrice} AED`;
      }

      // Create a simple text version for email clients
      const plainTextMessage = `
Digital Invitation Request

DETAILS:
--------
Estimated Price: ${calculateExactPrice(formData)}

Full Name: ${formData.fullName}
Instagram ID: ${formData.instagramId || "Not provided"}
Occasion: ${formData.occasion === "Other" ? formData.customOccasion : formData.occasion}
Delivery Formats: ${formatDeliveryFormats()}

Character Details: 
- Include Characters: ${formData.hasCharacters ? "Yes" : "No"}
${formData.hasCharacters ? `- Show Faces: ${formData.showFaces ? "Yes" : "No"}` : ""}
${formData.hasCharacters && formData.showFaces ? `- Number of Characters: ${formData.characterCount}` : ""}

Video Idea: ${formData.hasVideoIdea ? formData.videoIdea : "No specific idea provided"}
Animation Styles: ${formatAnimationStyles()}
Color Palette: ${formatColorPalette()}
Project Deadline: ${formatDeadline()}
Invitation Content: ${formData.content || "No content added"}
${formData.specialRequirements ? `Additional Requests: ${formData.specialRequirements}` : ""}
${formData.guestCount ? `Guest Count: ${formData.guestCount}` : ""}

A PDF with these details is attached to this email.
`;

      // Very simplified HTML email that works better on mobile
      const emailMessage = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Digital Invitation Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h2 style="color: #8b7256; margin-bottom: 10px;">Digital Invitation Request</h2>
    <div style="background-color: #f5f0e6; padding: 15px; border-radius: 8px;">
      <h3 style="color: #8b7256; margin: 0; margin-bottom: 5px;">Estimated Price</h3>
      <div style="font-size: 20px; font-weight: bold; color: #8b7256;">${calculateExactPrice(formData)}</div>
    </div>
  </div>

  <div style="margin-bottom: 10px;">
    <strong>Full Name:</strong> ${formData.fullName}
  </div>

  <div style="margin-bottom: 10px;">
    <strong>Instagram ID:</strong> ${formData.instagramId || "Not provided"}
  </div>

  <div style="margin-bottom: 10px;">
    <strong>Occasion:</strong> ${formData.occasion === "Other" ? formData.customOccasion : formData.occasion}
  </div>

  <div style="margin-bottom: 10px;">
    <strong>Delivery Formats:</strong> ${formatDeliveryFormats()}
  </div>

  <div style="margin-bottom: 10px;">
    <strong>Character Details:</strong><br>
    Include Characters: ${formData.hasCharacters ? "Yes" : "No"}<br>
    ${formData.hasCharacters ? `Show Faces: ${formData.showFaces ? "Yes" : "No"}<br>` : ""}
    ${formData.hasCharacters && formData.showFaces ? `Number of Characters: ${formData.characterCount}` : ""}
  </div>

  <div style="margin-bottom: 10px;">
    <strong>Video Idea:</strong><br>
    ${formData.hasVideoIdea ? formData.videoIdea : "No specific idea provided"}
  </div>

  <div style="margin-bottom: 10px;">
    <strong>Animation Styles:</strong><br>
    ${formatAnimationStyles()}
  </div>

  <div style="margin-bottom: 10px;">
    <strong>Color Palette:</strong><br>
    ${formatColorPalette()}
  </div>

  <div style="margin-bottom: 10px;">
    <strong>Project Deadline:</strong><br>
    ${formatDeadline()}
  </div>

  <div style="margin-bottom: 10px;">
    <strong>Invitation Content:</strong><br>
    ${formData.content || "No content added"}
  </div>

  ${formData.specialRequirements ? `
  <div style="margin-bottom: 10px;">
    <strong>Additional Requests:</strong><br>
    ${formData.specialRequirements}
  </div>
  ` : ''}

  ${formData.guestCount ? `
  <div style="margin-bottom: 10px;">
    <strong>Guest Count:</strong><br>
    ${formData.guestCount}
  </div>
  ` : ''}

  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; text-align: center;">
    A PDF with these details is attached to this email.
  </div>
</body>
</html>
`;

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '69f9ea87-6fcf-4a71-af9d-b781e7673e13', 
          from_name: formData.fullName,
          subject: `New Invitation Request - ${formData.occasion}`,
          to: 'hello@bliss-go.com',
          message: plainTextMessage, // Plain text fallback
          html: emailMessage, // HTML content
          attachments: [
            {
              name: `Bliss-${formData.fullName.replace(/\s+/g, '')}.pdf`,
              data: pdfDataUri.split(',')[1] // Remove the Data URI prefix
            }
          ]
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Success!",
          description: "Your invitation request has been submitted.",
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit your request. Please try again.",
      });
    }
  };

  return {
    currentStep,
    maxStep,
    isSubmitted,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
    setCurrentStep,
  };
};
