
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
import { InviteFormData, INITIAL_FORM_STEPS, ALL_FORM_STEPS } from "@/types/invite-form-types";

export type { InviteFormData };
export { INITIAL_FORM_STEPS, ALL_FORM_STEPS };

export const useInviteForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [skipCustomization, setSkipCustomization] = useState(false);
  const [showCustomizationPages, setShowCustomizationPages] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<InviteFormData>({
    fullName: "",
    instagramId: "",
    email: "",
    occasion: "",
    customOccasion: "",
    hasCharacters: false,
    characters: [],
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

  // Get the appropriate steps based on whether customization pages are shown
  const getFormSteps = () => {
    return showCustomizationPages ? ALL_FORM_STEPS : INITIAL_FORM_STEPS;
  };

  const updateFormData = (field: keyof InviteFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateCurrentStep = (): boolean => {
    // Get the actual step content based on current navigation
    const currentPageContent = showCustomizationPages 
      ? ALL_FORM_STEPS[currentStep] 
      : INITIAL_FORM_STEPS[currentStep];
      
    switch (currentPageContent) {
      case "Basic Details":
        return validateBasicDetails(formData);
      case "Delivery Formats":
        return validateDeliveryFormats(formData);
      case "Deadline":
        return validateDeadline(formData);
      case "Idea & Content":
        return validateVideoIdea(formData);
      case "Color Palette":
        return validateColorPalette(formData);
      case "Animation Style":
        return validateAnimationStyles(formData);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }

    const steps = getFormSteps();

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setMaxStep(Math.max(maxStep, currentStep + 1));
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      // If we're at review page and skipped customization, go back to deadline
      if (currentStep === (showCustomizationPages ? 7 : 4) && skipCustomization) {
        setCurrentStep(3);
        return;
      }

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

  // Function to enable customization pages
  const enableCustomizationPages = () => {
    setShowCustomizationPages(true);
    // If we were on step 4 (deadline), move to step 4 in the expanded view (which is Idea & Content)
    if (currentStep === 3) {
      setCurrentStep(4);
      setMaxStep(Math.max(maxStep, 4));
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
    skipCustomization,
    setSkipCustomization,
    showCustomizationPages,
    setShowCustomizationPages,
    enableCustomizationPages,
    getFormSteps
  };
};
