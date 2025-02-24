
import { useState } from "react";
import { ColorPalette } from "./form/ColorPalette";
import { StyleSelector } from "./form/StyleSelector";
import { DeadlinePicker } from "./form/DeadlinePicker";
import { ContentEditor } from "./form/ContentEditor";
import { AdditionalDetails } from "./form/AdditionalDetails";
import { FormProgress } from "./form/FormProgress";
import { BasicDetails } from "./form/BasicDetails";
import { ReviewDetails } from "./form/ReviewDetails";
import { SuccessScreen } from "./form/SuccessScreen";
import { useToast } from "@/hooks/use-toast";

const STEPS = [
  "Basic Details",
  "Color Palette",
  "Style",
  "Deadline",
  "Content",
  "Additional Details",
  "Review",
];

export const InviteForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    occasion: "",
    customOccasion: "",
    colorPalette: "",
    style: "",
    deadline: null as Date | null,
    content: "",
    guestCount: "",
    specialRequirements: "",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
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
          access_key: 'YOUR-ACCESS-KEY', // You'll need to sign up at web3forms.com to get an access key
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

  const renderStep = () => {
    if (isSubmitted) {
      return <SuccessScreen formData={formData} />;
    }

    switch (currentStep) {
      case 0:
        return (
          <BasicDetails
            formData={formData}
            onChange={updateFormData}
          />
        );
      case 1:
        return (
          <ColorPalette
            selected={formData.colorPalette}
            onSelect={(value) => updateFormData("colorPalette", value)}
          />
        );
      case 2:
        return (
          <StyleSelector
            selected={formData.style}
            onSelect={(value) => updateFormData("style", value)}
          />
        );
      case 3:
        return (
          <DeadlinePicker
            selected={formData.deadline}
            onSelect={(value) => updateFormData("deadline", value)}
          />
        );
      case 4:
        return (
          <ContentEditor
            content={formData.content}
            onChange={(value) => updateFormData("content", value)}
          />
        );
      case 5:
        return (
          <AdditionalDetails
            formData={formData}
            onChange={updateFormData}
          />
        );
      case 6:
        return (
          <ReviewDetails
            formData={formData}
          />
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-elegant-secondary/20 overflow-hidden animate-fadeIn">
        {renderStep()}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-elegant-secondary/20 overflow-hidden animate-fadeIn">
      <FormProgress steps={STEPS} currentStep={currentStep} />
      <div className="p-8">
        <div className="min-h-[400px]">{renderStep()}</div>
        <div className="mt-8 flex justify-between">
          <button
            onClick={prevStep}
            className={`px-6 py-2 rounded-lg text-elegant-brown hover:bg-elegant-beige transition-colors font-serif ${
              currentStep === 0 ? "invisible" : ""
            }`}
          >
            Back
          </button>
          <button
            onClick={currentStep === STEPS.length - 1 ? handleSubmit : nextStep}
            className="px-6 py-2 bg-elegant-primary text-white rounded-lg hover:bg-elegant-primary/90 transition-colors font-serif"
          >
            {currentStep === STEPS.length - 1 ? "Submit" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};
