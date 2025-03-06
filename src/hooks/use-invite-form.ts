
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { submitInviteForm } from "@/utils/email-submission";
import { 
  validateBasicDetails, 
  validateDeliveryFormats, 
  validateVideoIdea, 
  validateColorPalette, 
  validateAnimationStyles, 
  validateDeadline
} from "@/utils/form-validation";
import { InviteFormData, FORM_STEPS } from "@/types/invite-form-types";

export type { InviteFormData };
export { FORM_STEPS };

export const useInviteForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<InviteFormData>({
    fullName: "",
    instagramId: "",
    email: "",
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

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 0: // Basic Details
        return validateBasicDetails(formData);
      case 1: // Delivery Formats
        return validateDeliveryFormats(formData);
      case 3: // Content page validation
        return validateVideoIdea(formData);
      case 4: // Color Palette validation
        return validateColorPalette(formData);
      case 5: // Animation styles
        return validateAnimationStyles(formData);
      case 6: // Deadline validation
        return validateDeadline(formData);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      setMaxStep(Math.max(maxStep, currentStep + 1));
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const success = await submitInviteForm(formData);
      
      if (success) {
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
