import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface InviteFormData {
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
  guestCount: string;
  specialRequirements: string;
  deliveryFormats: {
    videoInvite: boolean;
    stillInvite: boolean;
    logo: boolean;
  };
  isUrgent?: boolean;
}

export const FORM_STEPS = [
  "Basic Details",
  "Delivery Formats",
  "Character Options",
  "Color Palette",
  "Animation Style",
  "Design Style",
  "Deadline",
  "Content",
  "Review",
] as const;

export const useInviteForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
    style: "",
    animationStyles: [],
    deadline: null,
    content: "",
    guestCount: "",
    specialRequirements: "",
    deliveryFormats: {
      videoInvite: true,
      stillInvite: true,
      logo: true,
    },
    isUrgent: false,
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
      if (!formData.instagramId.startsWith('@')) {
        toast({
          title: "Invalid Instagram ID",
          description: "Instagram ID must start with @",
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

    if (currentStep === 4 && formData.animationStyles.length === 0) {
      toast({
        title: "Please select at least one style",
        description: "Choose up to 3 animation styles to continue",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 7 && isContentReadyNotSelected(formData.content)) {
      toast({
        title: "Selection Required",
        description: "Please indicate whether you have the writing ready.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
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
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR-ACCESS-KEY',
          from_name: formData.fullName,
          subject: `New Invitation Request - ${formData.occasion}`,
          to: 'hello@bliss-go.com',
          message: `
Full Name: ${formData.fullName}
Occasion: ${formData.occasion === 'Other' ? formData.customOccasion : formData.occasion}
Style: ${formData.style}
Color Palette: ${formData.colorPalette}
Deadline: ${formData.deadline ? new Date(formData.deadline).toLocaleDateString() : 'Not specified'}
Content: ${formData.content}
Guest Count: ${formData.guestCount}
Special Requirements: ${formData.specialRequirements}
          `.trim(),
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
    isSubmitted,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
  };
};
