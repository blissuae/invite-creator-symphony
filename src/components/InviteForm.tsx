
import { FormProgress } from "./form/FormProgress";
import { BasicDetails } from "./form/BasicDetails";
import { CharacterOptions } from "./form/CharacterOptions";
import { ColorPalette } from "./form/ColorPalette";
import { StyleSelector } from "./form/StyleSelector";
import { DeadlinePicker } from "./form/DeadlinePicker";
import { ContentEditor } from "./form/ContentEditor";
import { ReviewDetails } from "./form/ReviewDetails";
import { SuccessScreen } from "./form/SuccessScreen";
import { AnimationStyleSelector } from "./form/AnimationStyleSelector";
import { FormNavigation } from "./form/FormNavigation";
import { DeliveryFormats } from "./form/DeliveryFormats";
import { FORM_STEPS, useInviteForm } from "@/hooks/use-invite-form";
import { useEffect, useRef } from "react";

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
  } = useInviteForm();

  // Store the highest progress value
  const highestProgressRef = useRef(0);
  const prevCompletedStepRef = useRef(-1);

  const handleStepClick = (step: number) => {
    if (step <= maxStep) {
      setCurrentStep(step);
    }
  };

  // Update the progress percentage in the parent component
  useEffect(() => {
    // Calculate progress based on the maximum step achieved (not the current step)
    // This ensures progress can only move forward, not backward
    const baseProgress = Math.min(95, Math.ceil((maxStep / (FORM_STEPS.length - 1)) * 100));
    
    // If we've completed a new step, update the previous completed step reference
    if (currentStep > prevCompletedStepRef.current) {
      prevCompletedStepRef.current = currentStep - 1; // Store the step we just completed
    }
    
    // For progress calculation, use the max value ever reached (never decrease)
    const progressValue = isSubmitted ? 100 : Math.max(baseProgress, highestProgressRef.current);
    highestProgressRef.current = progressValue;
    
    const progressEvent = new CustomEvent('formProgressUpdate', { 
      detail: { 
        progress: progressValue,
        currentStep: isSubmitted ? 9 : currentStep,
        prevCompletedStep: Math.max(0, prevCompletedStepRef.current) // Send which step was just completed
      } 
    });
    window.dispatchEvent(progressEvent);
  }, [currentStep, maxStep, isSubmitted]);

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
          <DeliveryFormats
            formData={formData}
            onChange={updateFormData}
          />
        );
      case 2:
        return (
          <CharacterOptions
            formData={formData}
            onChange={updateFormData}
          />
        );
      case 3:
        return (
          <ContentEditor
            formData={{
              content: formData.content,
              hasVideoIdea: formData.hasVideoIdea,
              videoIdea: formData.videoIdea
            }}
            onChange={updateFormData}
          />
        );
      case 4:
        return (
          <ColorPalette
            selected={formData.colorPalette}
            onSelect={(value) => updateFormData("colorPalette", value)}
          />
        );
      case 5:
        return (
          <AnimationStyleSelector
            selected={formData.animationStyles}
            onSelect={(value) => updateFormData("animationStyles", value)}
          />
        );
      case 6:
        return (
          <StyleSelector
            selected={formData.style}
            onSelect={(value) => updateFormData("style", value)}
          />
        );
      case 7:
        return (
          <DeadlinePicker
            selected={formData.deadline}
            onSelect={(value) => updateFormData("deadline", value)}
          />
        );
      case 8:
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
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-elegant-secondary/20 overflow-hidden animate-fadeIn">
        {renderStep()}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-elegant-secondary/20 overflow-hidden animate-fadeIn flex flex-col max-h-[calc(100vh-12rem)]">
      <FormProgress 
        steps={FORM_STEPS} 
        currentStep={currentStep}
        maxStep={maxStep}
        onStepClick={handleStepClick}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto">
          <div className="sm:min-h-[400px]">{renderStep()}</div>
        </div>
        <div className="sticky bottom-0 p-4 sm:p-8 border-t border-elegant-secondary/20 bg-white">
          <FormNavigation
            currentStep={currentStep}
            totalSteps={FORM_STEPS.length}
            onNext={nextStep}
            onPrev={prevStep}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
