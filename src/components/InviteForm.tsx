
import { FormProgress } from "./form/FormProgress";
import { BasicDetails } from "./form/BasicDetails";
import { CharacterOptions } from "./form/CharacterOptions";
import { ColorPalette } from "./form/ColorPalette";
import { DeadlinePicker } from "./form/DeadlinePicker";
import { ContentEditor } from "./form/ContentEditor";
import { ReviewDetails } from "./form/ReviewDetails";
import { SuccessScreen } from "./form/SuccessScreen";
import { AnimationStyleSelector } from "./form/AnimationStyleSelector";
import { FormNavigation } from "./form/FormNavigation";
import { DeliveryFormats } from "./form/DeliveryFormats";
import { CustomizationChoice } from "./form/CustomizationChoice";
import { useInviteForm } from "@/hooks/use-invite-form";
import { useEffect, useState } from "react";
import { IntroPopup } from "./IntroPopup";

export const InviteForm = () => {
  const {
    currentStep,
    maxStep,
    isSubmitted,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
    setCurrentStep,
    setMaxStep,
    skipCustomization,
    setSkipCustomization,
    showCustomizationPages,
    enableCustomizationPages,
    getFormSteps
  } = useInviteForm();

  const [showIntro, setShowIntro] = useState(true);
  const [showCustomizationChoice, setShowCustomizationChoice] = useState(false);
  
  // Get the current form steps based on customization choice
  const formSteps = getFormSteps();

  const handleStepClick = (step: number) => {
    if (step <= maxStep) {
      setCurrentStep(step);
    }
  };

  useEffect(() => {
    const progressValue = isSubmitted 
      ? 100 
      : Math.min(95, Math.ceil((maxStep / (formSteps.length - 1)) * 100));
    
    const progressEvent = new CustomEvent('formProgressUpdate', { 
      detail: { 
        progress: progressValue,
        currentStep: currentStep
      } 
    });
    window.dispatchEvent(progressEvent);
  }, [currentStep, maxStep, isSubmitted, formSteps.length]);

  // Show customization choice after deadline page
  useEffect(() => {
    if (currentStep === 3 && formData.deadline !== null && !showCustomizationPages) {
      setShowCustomizationChoice(true);
    } else {
      setShowCustomizationChoice(false);
    }
  }, [currentStep, formData.deadline, showCustomizationPages]);

  const handleCustomizationChoice = (skip: boolean) => {
    setSkipCustomization(skip);
    setShowCustomizationChoice(false);
    
    if (skip) {
      // Skip to review page (which is now page 4 in the initial view)
      setCurrentStep(4);
      setMaxStep(Math.max(maxStep, 4));
    } else {
      // Show the customization pages and move to the first one
      enableCustomizationPages();
    }
  };

  const renderStep = () => {
    if (isSubmitted) {
      return <SuccessScreen formData={formData} />;
    }

    // If showing the customization choice overlay
    if (showCustomizationChoice && currentStep === 3) {
      return <CustomizationChoice onChoiceMade={handleCustomizationChoice} />;
    }

    // Determine the content to show based on current step and whether customization pages are shown
    const currentStepContent = formSteps[currentStep];
    
    switch (currentStepContent) {
      case "Basic Details":
        return <BasicDetails formData={formData} onChange={updateFormData} />;
      case "Delivery Formats":
        return <DeliveryFormats formData={formData} onChange={updateFormData} />;
      case "Character Options":
        return <CharacterOptions formData={formData} onChange={updateFormData} />;
      case "Deadline":
        return <DeadlinePicker selected={formData.deadline} onSelect={(value) => updateFormData("deadline", value)} />;
      case "Idea & Content":
        return <ContentEditor formData={{ content: formData.content, hasVideoIdea: formData.hasVideoIdea, videoIdea: formData.videoIdea }} onChange={updateFormData} />;
      case "Color Palette":
        return <ColorPalette selected={formData.colorPalette} onSelect={(value) => updateFormData("colorPalette", value)} />;
      case "Animation Style":
        return <AnimationStyleSelector selected={formData.animationStyles} onSelect={(value) => updateFormData("animationStyles", value)} />;
      case "Review":
        return <ReviewDetails formData={formData} />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-elegant-secondary/20 overflow-hidden animate-fadeIn">
        {renderStep()}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-elegant-secondary/20 overflow-hidden animate-fadeIn flex flex-col">
      {showIntro && (
        <IntroPopup 
          forceShow={true} 
          onClose={() => setShowIntro(false)}
        />
      )}
      <FormProgress 
        steps={formSteps} 
        currentStep={currentStep}
        maxStep={maxStep}
        onStepClick={handleStepClick}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="p-4 sm:p-8 overflow-y-auto">
          <div className="sm:min-h-[400px]">{renderStep()}</div>
        </div>
        <div className="sticky bottom-0 p-4 sm:p-8 border-t border-elegant-secondary/20 bg-white">
          {!showCustomizationChoice && (
            <FormNavigation
              currentStep={currentStep}
              totalSteps={formSteps.length}
              onNext={nextStep}
              onPrev={prevStep}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

